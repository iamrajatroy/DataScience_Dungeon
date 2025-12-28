// ========================================
// DATA SCIENCE DUNGEON - GAME STATE
// ========================================

class GameState {
    constructor() {
        this.reset();
        this.user = null;
        this.isOnline = false;
    }

    reset() {
        this.currentRoom = 1;
        this.health = 100;
        this.score = 0;
        this.totalCorrect = 0;
        this.totalIncorrect = 0;
        this.chestsOpened = []; // Array of {room, chest} objects
        this.gameCompleted = false;
        this.isGameOver = false;
        this.isPaused = false;
        this.currentState = 'menu'; // menu, playing, paused, gameOver, victory
    }

    // Getter for totalWrong (alias for totalIncorrect)
    get totalWrong() {
        return this.totalIncorrect;
    }

    // ==================== OBSERVER PATTERN ====================

    subscribe(listener) {
        if (!this.listeners) this.listeners = [];
        this.listeners.push(listener);
    }

    notify() {
        if (!this.listeners) return;
        this.listeners.forEach(listener => {
            try {
                listener(this);
            } catch (e) {
                console.error('[GameState] Listener error:', e);
            }
        });
    }

    // ==================== SERVER STORAGE ====================

    async initialize() {
        // Check if API is available
        this.isOnline = await window.api.healthCheck();

        if (this.isOnline && window.api.isAuthenticated()) {
            // Try to get user info
            try {
                this.user = await window.api.checkAuth();
            } catch (e) {
                this.user = null;
            }
        }

        // Load from server if logged in
        if (this.isOnline && this.user) {
            await this.loadFromServer();
        }
    }

    // Save to server only
    async save() {
        if (!this.isOnline || !this.user) {
            console.warn('[GameState] Cannot save: not logged in or offline');
            return false;
        }

        const saveData = {
            current_room: this.currentRoom,
            brightness_level: this.health,
            score: this.score,
            total_correct: this.totalCorrect,
            total_incorrect: this.totalIncorrect,
            chest_states: this.chestsOpened,
            game_completed: this.gameCompleted,
        };

        try {
            await window.api.updateProgress(saveData);
            console.log('[GameState] Saved to server');
            return true;
        } catch (e) {
            console.error('[GameState] Failed to save to server:', e);
            return false;
        }
    }

    // Load from server
    async loadFromServer() {
        try {
            const data = await window.api.getProgress();
            this.currentRoom = data.current_room || 1;
            this.health = (data.brightness_level !== undefined) ? data.brightness_level : 100;
            this.score = data.score || 0;
            this.totalCorrect = data.total_correct || 0;
            this.totalIncorrect = data.total_incorrect || 0;
            this.gameCompleted = data.game_completed || false;

            // Parse chest states
            if (data.chest_states) {
                try {
                    this.chestsOpened = JSON.parse(data.chest_states);
                    if (!Array.isArray(this.chestsOpened)) {
                        this.chestsOpened = [];
                    }
                } catch {
                    this.chestsOpened = [];
                }
            } else {
                this.chestsOpened = [];
            }

            console.log('[GameState] Loaded from server:', data);
            this.notify(); // Update UI
            return true;
        } catch (e) {
            console.error('[GameState] Failed to load from server:', e);
            return false;
        }
    }

    async hasSavedGame() {
        // User must be logged in and online
        console.log('[GameState] hasSavedGame check:', { user: this.user, isOnline: this.isOnline });
        if (!this.user || !this.isOnline) {
            console.log('[GameState] hasSavedGame: No user or offline, returning false');
            return false;
        }

        try {
            const progress = await window.api.getProgress();

            // If a progress record exists at all, the game was started/saved
            if (!progress) return false;

            // Check if progress has any activity (not just default empty state)
            // OR check if progress.id exists (meaning it was explicitly saved)
            // For simplicity: any progress record = saveable game
            console.log('[GameState] hasSavedGame: progress exists, returning true');
            return true;
        } catch (e) {
            console.error('[GameState] hasSavedGame error:', e);
            return false;
        }
    }

    async clearSave() {
        if (this.isOnline && this.user) {
            try {
                await window.api.deleteProgress();
            } catch (e) {
                console.error('[GameState] Failed to clear server progress:', e);
            }
        }
    }

    // ==================== AUTH METHODS ====================

    async login(email, password) {
        try {
            await window.api.login(email, password);
            this.user = await window.api.checkAuth();
            this.isOnline = true;
            await this.loadFromServer();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    async register(username, email, password) {
        try {
            await window.api.register(username, email, password);
            this.user = await window.api.checkAuth();
            this.isOnline = true;
            await this.loadFromServer(); // Initialize progress for new user
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    logout() {
        window.api.logout();
        this.user = null;
        this.reset();
    }

    // ==================== GAME LOGIC ====================

    // Check if a chest has been opened
    isChestOpened(roomNumber, chestNumber) {
        return this.chestsOpened.some(c => c.room === roomNumber && c.chest === chestNumber);
    }

    // Mark chest as opened
    openChest(roomNumber, chestNumber) {
        if (!this.isChestOpened(roomNumber, chestNumber)) {
            this.chestsOpened.push({ room: roomNumber, chest: chestNumber });
            this.notify(); // Update UI
        }
    }

    // Get opened chests count for current room
    getOpenedChestsInRoom(roomNumber) {
        return this.chestsOpened.filter(c => c.room === roomNumber).length;
    }

    // Check if room is complete
    isRoomComplete(roomNumber) {
        return this.getOpenedChestsInRoom(roomNumber) >= 3;
    }

    // Answer correctly
    async answerCorrect(points = 100, questionId = null, roomNumber = null) {
        console.log(`[GameState] answerCorrect called. Points: ${points}`);
        this.totalCorrect++;
        this.score += points;
        console.log(`[GameState] New Score: ${this.score}, Total Correct: ${this.totalCorrect}`);

        this.notify(); // Update UI IMMEDIATELY

        // Record on server if online
        if (this.isOnline && this.user && questionId) {
            try {
                await window.api.markQuestionAnswered(questionId, true, roomNumber);
            } catch (e) {
                console.error('Failed to record answer on server:', e);
            }
        }

        // Autosave progress (non-blocking)
        this.save().catch(e => console.error('Background save failed:', e));
    }

    // Answer incorrectly - reduce health by 20%
    async answerIncorrect(questionId = null, roomNumber = null) {
        console.log('[GameState] answerIncorrect called.');
        this.totalIncorrect++;
        this.health = Math.max(0, this.health - 20);
        console.log(`[GameState] Health reduced to: ${this.health}`);

        this.notify(); // Update UI IMMEDIATELY

        // Record on server if online
        if (this.isOnline && this.user && questionId) {
            window.api.markQuestionAnswered(questionId, false, roomNumber).catch(console.error);
        }

        if (this.health <= 0) {
            this.isGameOver = true;
            this.currentState = 'gameOver';
            await this.clearSave();
            console.log('[GameState] Game Over! Save cleared.');
            return;
        }

        // Autosave progress (non-blocking)
        this.save().catch(e => console.error('Background save failed:', e));
    }

    // Move to next room
    async nextRoom() {
        if (this.currentRoom < 10) {
            this.currentRoom++;
            await this.save();
        } else {
            // Game complete!
            this.gameCompleted = true;
            this.currentState = 'victory';
            await this.save();
        }
    }

    // Get health color based on current health
    getHealthColor() {
        if (this.health > 60) return '#22c55e'; // Green
        if (this.health > 30) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    }

    // Get darkness overlay opacity (0-1) based on health
    getDarknessOpacity() {
        return (100 - this.health) / 100 * 0.6;
    }
}

// Export for use in other modules
window.GameState = GameState;
