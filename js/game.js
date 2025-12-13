// ========================================
// DATA SCIENCE DUNGEON - MAIN GAME
// ========================================

class Game {
    constructor() {
        // Get canvas and context
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Initialize core systems
        this.gameState = new GameState();
        this.questionManager = new QuestionManager();
        this.ui = new UIManager(this.gameState, this.questionManager);

        // Game objects
        this.player = null;
        this.currentRoom = null;

        // Game loop
        this.lastTime = 0;
        this.running = false;

        // Current chest being interacted with
        this.activeChest = null;
        this.activeQuestion = null;
        this.spacePressed = false;

        // Brightness overlay
        this.createBrightnessOverlay();

        // Setup UI callbacks
        this.setupUICallbacks();

        // Initialize asynchronously
        this.init();
    }

    createBrightnessOverlay() {
        this.brightnessOverlay = document.createElement('div');
        this.brightnessOverlay.id = 'brightness-overlay';
        this.brightnessOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 5;
        `;
        document.getElementById('game-container').appendChild(this.brightnessOverlay);
    }

    logMap(msg) {
        // console.log(msg); // Reduced logging
    }

    setupUICallbacks() {
        this.ui.onNewGame = () => this.startNewGame();
        this.ui.onContinueGame = () => this.continueGame();
        this.ui.onAnswerSubmit = (answer) => this.submitAnswer(answer);
        this.ui.onQuestionComplete = (wasCorrect) => this.completeQuestion(wasCorrect);
        this.ui.onResume = () => this.resumeGame();
        this.ui.onSave = () => this.saveGame();
        this.ui.onQuit = () => this.quitToMenu();
        this.ui.onRoomComplete = () => this.proceedToNextRoom();
        this.ui.onLogin = (email, password) => this.handleLogin(email, password);
        this.ui.onRegister = (username, email, password) => this.handleRegister(username, email, password);
        this.ui.onLogout = () => this.handleLogout();
    }

    async init() {
        console.log('[Game] init() starting...');

        // 1. SUBSCRIBE UI TO STATE CHANGES IMMEDIATELY
        // This ensures we catch updates even if initialization takes time
        console.log('[Game] Subscribing UI to GameState...');
        this.gameState.subscribe(() => {
            console.log('[Game] State changed, triggering UI update');
            this.ui.updateHUD();
        });

        // Initial HUD update locally
        this.ui.updateHUD();

        // 2. Initialize subsystems (might pause for network)
        try {
            await this.gameState.initialize();
        } catch (e) {
            console.error('[Game] GameState initialization error:', e);
        }

        try {
            await this.questionManager.initialize();
        } catch (e) {
            console.error('[Game] QuestionManager initialization error:', e);
        }

        // 3. Update UI based on auth state
        this.ui.updateAuthUI(this.gameState.user);

        console.log('[Game] Initialization complete.');

        // Show main menu
        this.ui.showScreen('mainMenu');

        console.log('Data Science Dungeon initialized!');
        console.log('Questions loaded:', this.questionManager.questions.length);
        console.log('Online mode:', this.gameState.isOnline);
        console.log('User:', this.gameState.user ? this.gameState.user.username : 'Guest');
    }

    // ==================== AUTH HANDLERS ====================

    async handleLogin(email, password) {
        const result = await this.gameState.login(email, password);
        if (result.success) {
            this.ui.updateAuthUI(this.gameState.user);
            this.ui.hideAuthModal();
            await this.questionManager.initialize(); // Reload answered questions
        } else {
            this.ui.showAuthError(result.error);
        }
    }

    async handleRegister(username, email, password) {
        const result = await this.gameState.register(username, email, password);
        if (result.success) {
            this.ui.updateAuthUI(this.gameState.user);
            this.ui.hideAuthModal();
        } else {
            this.ui.showAuthError(result.error);
        }
    }

    handleLogout() {
        this.gameState.logout();
        this.ui.updateAuthUI(null);
        this.questionManager.reset();
    }

    // ==================== GAME FLOW ====================

    async startNewGame() {
        // Reset game state
        this.gameState.reset();
        await this.gameState.clearSave();
        this.gameState.currentState = 'playing';

        // Reset question manager
        this.questionManager.reset();

        // If online, create new progress
        if (this.gameState.isOnline && this.gameState.user) {
            try {
                await window.api.createProgress({});
            } catch (e) {
                console.error('Failed to create progress on server:', e);
            }
        }

        // Initialize game objects
        this.player = new Player(this.canvas);
        this.currentRoom = new Room(this.canvas, 1);

        // Show game screen and update HUD
        this.ui.showScreen('gameScreen');
        this.ui.updateHUD();
        this.updateBrightnessOverlay();

        // Start game loop
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    async continueGame() {
        // Try to load saved state from server first, then localStorage
        let loaded = false;

        if (this.gameState.isOnline && this.gameState.user) {
            try {
                const progress = await window.api.getProgress();
                if (progress && progress.current_room > 1) {
                    await this.gameState.loadFromServer();
                    loaded = true;
                }
            } catch (e) {
                console.error('Failed to load from server:', e);
            }
        }

        // Fallback to localStorage if server didn't have a valid save
        if (!loaded) {
            const hasLocalSave = this.gameState.loadFromStorage();
            if (!hasLocalSave || this.gameState.currentRoom <= 1) {
                console.warn('No valid save found');
                return;
            }
        }

        // Safety check: if loaded a dead save, treat as game over
        if (this.gameState.health <= 0) {
            console.warn('Loaded dead save. Clearing and returning to menu.');
            await this.gameState.clearSave();
            this.gameState.reset();
            this.ui.updateContinueButton();
            return;
        }

        this.gameState.currentState = 'playing';

        // Initialize game objects with saved room
        this.player = new Player(this.canvas);
        this.currentRoom = new Room(this.canvas, this.gameState.currentRoom);
        this.currentRoom.syncWithGameState(this.gameState);

        // Show game screen and update HUD
        this.ui.showScreen('gameScreen');
        this.ui.updateHUD();
        this.updateBrightnessOverlay();

        // Start game loop
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        if (!this.gameState.isPaused && this.gameState.currentState === 'playing') {
            this.update(deltaTime);
            this.render();
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Update player
        this.player.update(this.currentRoom);

        // Update room
        this.currentRoom.update();

        // Check chest interactions
        this.checkChestInteraction();

        // Check portal
        this.checkPortal();
    }

    checkChestInteraction() {
        // Find nearby chest
        const nearbyChest = this.currentRoom.getNearbyChest(this.player);

        if (nearbyChest) {
            this.player.canInteract = true;
            this.player.nearbyChest = nearbyChest;
            this.ui.showInteractionPrompt(true);

            // Check for space key press
            if (this.player.keys.space && !this.spacePressed) {
                this.spacePressed = true;
                this.openChest(nearbyChest);
            }
        } else {
            this.player.canInteract = false;
            this.player.nearbyChest = null;
            this.ui.showInteractionPrompt(false);
        }

        // Reset space pressed flag when key is released
        if (!this.player.keys.space) {
            this.spacePressed = false;
        }
    }

    async openChest(chest) {
        if (chest.isCompleted) return;

        this.activeChest = chest;
        chest.open();

        // Get a question for this chest (now async)
        const question = await this.questionManager.getQuestion(
            this.gameState.currentRoom,
            chest.chestNumber
        );

        if (question) {
            this.activeQuestion = question;
            this.ui.showQuestionModal(question);
            this.questionManager.markAnswered(question.id);
        } else {
            // No questions left - auto complete
            console.warn('No questions available!');
            this.completeQuestion(true);
        }
    }

    async completeQuestion(wasCorrect) {
        console.log(`[Game] completeQuestion called. Correct: ${wasCorrect}`);

        if (!this.activeChest) {
            console.warn('[Game] No active chest found during completion!');
            return;
        }

        const questionId = this.activeQuestion ? this.activeQuestion.id : null;
        const roomNumber = this.gameState.currentRoom;

        try {
            if (wasCorrect) {
                console.log('[Game] Answer CORRECT. Processing chest completion...');
                // Mark chest as complete
                this.activeChest.complete();
                this.gameState.openChest(this.gameState.currentRoom, this.activeChest.chestNumber); // Sync with state

                const points = this.getPointsForDifficulty(this.activeChest.chestNumber);

                await this.gameState.answerCorrect(
                    points,
                    questionId,
                    roomNumber
                );

                // Check if room is complete
                const isRoomComplete = this.currentRoom.checkPortalActivation();
                console.log(`[Game] Room Complete Check: ${isRoomComplete}`);

                if (isRoomComplete) {
                    console.log('[Game] ROOM COMPLETE! Saving and showing modal...');
                    await this.gameState.save();
                    setTimeout(() => {
                        console.log('[Game] Calling ui.showRoomComplete()');
                        this.ui.showRoomComplete(this.gameState.currentRoom);
                    }, 500);
                }
            } else {
                console.log('[Game] Answer INCORRECT. Reducing health...');
                // Handle incorrect answer
                await this.gameState.answerIncorrect(questionId, roomNumber);
                this.updateBrightnessOverlay();

                console.log(`[Game] Health after wrong answer: ${this.gameState.health}`);
                console.log(`[Game] Is Game Over: ${this.gameState.isGameOver}`);

                // Check for game over
                if (this.gameState.isGameOver) {
                    console.log('[Game] GAME OVER TRIGGERED! Stopping loop.');
                    this.running = false;
                    setTimeout(() => {
                        console.log('[Game] Calling ui.showGameOver()');
                        this.ui.showGameOver();
                    }, 500);
                    // Return early, but finally block still runs cleanup
                    return;
                }
            }
        } catch (e) {
            console.error('[Game] Error in completeQuestion:', e);
        } finally {
            // Update HUD always
            this.ui.updateHUD();
            this.activeChest = null;
            this.activeQuestion = null;
        }
    }

    getPointsForDifficulty(chestNumber) {
        const roomMultiplier = this.gameState.currentRoom;
        switch (chestNumber) {
            case 1: return 100 * roomMultiplier; // Easy
            case 2: return 150 * roomMultiplier; // Medium
            case 3: return 200 * roomMultiplier; // Hard
            default: return 100;
        }
    }

    updateBrightnessOverlay() {
        const opacity = this.gameState.getDarknessOpacity();
        this.brightnessOverlay.style.opacity = opacity.toString();
    }

    checkPortal() {
        if (this.currentRoom.portal.active && this.currentRoom.isPlayerAtPortal(this.player)) {
            // Check for space key to enter portal
            if (this.player.keys.space && !this.spacePressed) {
                this.spacePressed = true;
                this.enterPortal();
            }
        }
    }

    async enterPortal() {
        // Check if it's the last room
        if (this.gameState.currentRoom >= 10) {
            // Victory!
            this.gameState.currentState = 'victory';
            this.running = false;
            await this.gameState.clearSave(); // Clear save on victory
            this.ui.showVictory();
            return;
        }

        // Proceed to next room
        await this.proceedToNextRoom();
    }

    async proceedToNextRoom() {
        await this.gameState.nextRoom();

        // Create new room
        this.currentRoom = new Room(this.canvas, this.gameState.currentRoom);
        this.currentRoom.syncWithGameState(this.gameState);

        // Reset player position
        this.player.resetPosition();

        // Update HUD
        this.ui.updateHUD();

        // Save progress
        await this.gameState.save();
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw room
        this.currentRoom.draw(this.ctx);

        // Draw player
        this.player.draw(this.ctx);
    }

    resumeGame() {
        this.ui.hidePauseMenu();
        this.gameState.isPaused = false;
    }

    async saveGame() {
        await this.gameState.save();
        this.ui.showSaveConfirmation();
    }

    quitToMenu() {
        this.running = false;
        this.gameState.isPaused = false;
        this.ui.hidePauseMenu();
        this.gameState.currentState = 'menu';
        this.ui.showScreen('mainMenu');
    }
}

// Start game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
