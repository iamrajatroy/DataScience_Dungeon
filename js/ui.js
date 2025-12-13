// ========================================
// DATA SCIENCE DUNGEON - UI MANAGER
// ========================================

class UIManager {
    constructor(gameState, questionManager) {
        this.gameState = gameState;
        this.questionManager = questionManager;
        this.currentQuestion = null;
        this.selectedAnswer = null;
        this.isShowingFeedback = false;

        // Cache DOM elements
        this.elements = {
            // Screens
            mainMenu: document.getElementById('main-menu'),
            howToPlay: document.getElementById('how-to-play'),
            gameScreen: document.getElementById('game-screen'),
            gameOver: document.getElementById('game-over'),
            victory: document.getElementById('victory'),

            // HUD
            roomNumber: document.getElementById('room-number'),
            healthFill: document.getElementById('health-fill'),
            healthPercent: document.getElementById('health-percent'),
            scoreValue: document.getElementById('score-value'),
            interactionPrompt: document.getElementById('interaction-prompt'),

            // Question Modal
            questionModal: document.getElementById('question-modal'),
            questionDifficulty: document.getElementById('question-difficulty'),
            questionTopic: document.getElementById('question-topic'),
            questionText: document.getElementById('question-text'),
            answerOptions: document.querySelectorAll('.answer-btn'),
            answerFeedback: document.getElementById('answer-feedback'),
            feedbackText: document.getElementById('feedback-text'),
            explanationText: document.getElementById('explanation-text'),
            continueBtn: document.getElementById('continue-btn-modal'),

            // Pause Menu
            pauseMenu: document.getElementById('pause-menu'),

            // Room Complete
            roomComplete: document.getElementById('room-complete'),
            completedRoomNum: document.getElementById('completed-room-num'),

            // Buttons
            newGameBtn: document.getElementById('new-game-btn'),
            continueGameBtn: document.getElementById('continue-btn'),
            howToPlayBtn: document.getElementById('how-to-play-btn'),
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            resumeBtn: document.getElementById('resume-btn'),
            saveBtn: document.getElementById('save-btn'),
            quitBtn: document.getElementById('quit-btn'),
            retryBtn: document.getElementById('retry-btn'),
            menuBtnGameover: document.getElementById('menu-btn-gameover'),
            playAgainBtn: document.getElementById('play-again-btn'),
            menuBtnVictory: document.getElementById('menu-btn-victory'),
            continueRoomBtn: document.getElementById('continue-room-btn'),

            // Auth elements
            authModal: document.getElementById('auth-modal'),
            loginBtn: document.getElementById('login-btn'),
            registerBtn: document.getElementById('register-btn'),
            logoutBtn: document.getElementById('logout-btn'),
            userDisplay: document.getElementById('user-display'),
            authLoginBtn: document.getElementById('auth-login-btn'),
            authRegisterBtn: document.getElementById('auth-register-btn'),
            authCloseBtn: document.getElementById('auth-close-btn'),
            authError: document.getElementById('auth-error'),
            loginForm: document.getElementById('login-form'),
            registerForm: document.getElementById('register-form'),
            authTabLogin: document.getElementById('auth-tab-login'),
            authTabRegister: document.getElementById('auth-tab-register'),

            // Stats
            finalRooms: document.getElementById('final-rooms'),
            finalCorrect: document.getElementById('final-correct'),
            finalScore: document.getElementById('final-score'),
            victoryCorrect: document.getElementById('victory-correct'),
            victoryScore: document.getElementById('victory-score'),
            victoryHealth: document.getElementById('victory-health')
        };

        console.log('[UIManager] Elements cached:', {
            healthPercent: this.elements.healthPercent,
            scoreValue: this.elements.scoreValue,
            healthFill: this.elements.healthFill
        });

        if (!this.elements.healthPercent || !this.elements.scoreValue) {
            console.error('[UIManager] CRITICAL: HUD elements not found in DOM!');
        }

        // Callback functions (set by game)
        this.onNewGame = null;
        this.onContinueGame = null;
        this.onAnswerSubmit = null;
        this.onQuestionComplete = null;
        this.onResume = null;
        this.onSave = null;
        this.onQuit = null;
        this.onRoomComplete = null;
        this.onLogin = null;
        this.onRegister = null;
        this.onLogout = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Main menu buttons
        this.elements.newGameBtn.addEventListener('click', () => {
            if (!window.api.isAuthenticated()) {
                this.showAuthModal('login');
                this.showAuthError('You must be logged in to play!');
                return;
            }
            if (this.onNewGame) this.onNewGame();
        });

        this.elements.continueGameBtn.addEventListener('click', () => {
            if (this.onContinueGame) this.onContinueGame();
        });

        this.elements.howToPlayBtn.addEventListener('click', () => {
            this.showScreen('howToPlay');
        });

        this.elements.backToMenuBtn.addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Auth buttons
        if (this.elements.loginBtn) {
            this.elements.loginBtn.addEventListener('click', () => {
                this.showAuthModal('login');
            });
        }

        if (this.elements.registerBtn) {
            this.elements.registerBtn.addEventListener('click', () => {
                this.showAuthModal('register');
            });
        }

        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => {
                if (this.onLogout) this.onLogout();
            });
        }

        if (this.elements.authCloseBtn) {
            this.elements.authCloseBtn.addEventListener('click', () => {
                this.hideAuthModal();
            });
        }

        if (this.elements.authTabLogin) {
            this.elements.authTabLogin.addEventListener('click', () => {
                this.showAuthTab('login');
            });
        }

        if (this.elements.authTabRegister) {
            this.elements.authTabRegister.addEventListener('click', () => {
                this.showAuthTab('register');
            });
        }

        if (this.elements.authLoginBtn) {
            this.elements.authLoginBtn.addEventListener('click', () => {
                const email = document.getElementById('login-email')?.value;
                const password = document.getElementById('login-password')?.value;
                if (this.onLogin && email && password) {
                    this.onLogin(email, password);
                }
            });
        }

        if (this.elements.authRegisterBtn) {
            this.elements.authRegisterBtn.addEventListener('click', () => {
                const username = document.getElementById('register-username')?.value;
                const email = document.getElementById('register-email')?.value;
                const password = document.getElementById('register-password')?.value;
                if (this.onRegister && username && email && password) {
                    this.onRegister(username, email, password);
                }
            });
        }

        // Pause menu buttons
        this.elements.resumeBtn.addEventListener('click', () => {
            if (this.onResume) this.onResume();
        });

        this.elements.saveBtn.addEventListener('click', () => {
            if (this.onSave) this.onSave();
        });

        this.elements.quitBtn.addEventListener('click', () => {
            if (this.onQuit) this.onQuit();
        });

        // Game over buttons
        this.elements.retryBtn.addEventListener('click', () => {
            if (this.onNewGame) this.onNewGame();
        });

        this.elements.menuBtnGameover.addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Victory buttons
        this.elements.playAgainBtn.addEventListener('click', () => {
            if (this.onNewGame) this.onNewGame();
        });

        this.elements.menuBtnVictory.addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Room complete
        this.elements.continueRoomBtn.addEventListener('click', () => {
            this.hideRoomComplete();
            if (this.onRoomComplete) this.onRoomComplete();
        });

        // Answer buttons
        this.elements.answerOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isShowingFeedback) {
                    const option = btn.dataset.option;
                    this.selectAnswer(option);
                }
            });
        });

        // Continue after feedback
        this.elements.continueBtn.addEventListener('click', () => {

            // Calculate result BEFORE hiding modal
            if (!this.currentQuestion) {
                this.hideQuestionModal();
                return;
            }

            const isCorrect = this.selectedAnswer === this.currentQuestion.answer;

            this.hideQuestionModal();

            if (this.onQuestionComplete) {
                this.onQuestionComplete(isCorrect);
            }
        });

        // Keyboard shortcut for pause
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.gameState.currentState === 'playing') {
                if (this.gameState.isPaused) {
                    if (this.onResume) this.onResume();
                } else {
                    this.showPauseMenu();
                }
            }
        });
    }

    // ==================== AUTH UI ====================

    updateAuthUI(user) {
        const loginBtn = this.elements.loginBtn;
        const registerBtn = this.elements.registerBtn;
        const logoutBtn = this.elements.logoutBtn;
        const userDisplay = this.elements.userDisplay;

        if (user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userDisplay) {
                userDisplay.style.display = 'block';
                userDisplay.textContent = `👤 ${user.username} `;
            }
        } else {
            // Not logged in
            if (loginBtn) loginBtn.style.display = 'block';
            if (registerBtn) registerBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userDisplay) userDisplay.style.display = 'none';
        }

        this.updateContinueButton();
    }

    showAuthModal(tab = 'login') {
        if (this.elements.authModal) {
            this.elements.authModal.classList.remove('hidden');
            this.showAuthTab(tab);
            this.clearAuthError();
        }
    }

    hideAuthModal() {
        if (this.elements.authModal) {
            this.elements.authModal.classList.add('hidden');
            this.clearAuthError();
        }
    }

    showAuthTab(tab) {
        const loginForm = this.elements.loginForm;
        const registerForm = this.elements.registerForm;
        const loginTab = this.elements.authTabLogin;
        const registerTab = this.elements.authTabRegister;

        if (tab === 'login') {
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
            if (loginTab) loginTab.classList.add('active');
            if (registerTab) registerTab.classList.remove('active');
        } else {
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'block';
            if (loginTab) loginTab.classList.remove('active');
            if (registerTab) registerTab.classList.add('active');
        }
    }

    showAuthError(message) {
        if (this.elements.authError) {
            this.elements.authError.textContent = message;
            this.elements.authError.style.display = 'block';
        }
    }

    clearAuthError() {
        if (this.elements.authError) {
            this.elements.authError.textContent = '';
            this.elements.authError.style.display = 'none';
        }
    }

    // ==================== SCREENS ====================

    showScreen(screenName) {
        // Hide all screens
        Object.values(this.elements).forEach(el => {
            if (el && el.classList && el.classList.contains('screen')) {
                el.classList.remove('active');
            }
        });

        // Show requested screen
        const screen = this.elements[screenName];
        if (screen) {
            screen.classList.add('active');
        }

        // Update continue button visibility
        if (screenName === 'mainMenu') {
            this.updateContinueButton();
        }
    }

    async updateContinueButton() {
        const hasSave = await this.gameState.hasSavedGame();
        this.elements.continueGameBtn.style.display = hasSave ? 'block' : 'none';
    }

    updateHUD() {
        // Direct DOM lookup to avoid caching issues
        const roomEl = document.getElementById('room-number');
        const healthFillEl = document.getElementById('health-fill');
        const healthPercentEl = document.getElementById('health-percent');
        const scoreEl = document.getElementById('score-value');

        console.log('[UIManager] updateHUD executing. Elements found:', {
            room: !!roomEl,
            health: !!healthFillEl,
            score: !!scoreEl
        });

        if (roomEl) roomEl.textContent = `${this.gameState.currentRoom}/10`;

        // Update health bar
        const health = this.gameState.health;
        if (healthFillEl) {
            healthFillEl.style.width = `${health}%`;
            healthFillEl.style.backgroundColor = this.gameState.getHealthColor();
        }
        if (healthPercentEl) {
            healthPercentEl.textContent = `${health}%`;
        }

        // Update score
        if (scoreEl) {
            scoreEl.textContent = this.gameState.score.toString();
            // Visual flash for debugging
            scoreEl.style.color = 'yellow';
            setTimeout(() => scoreEl.style.color = '', 300);
        }

        console.log(`[UIManager] HUD Updated. Health: ${health}, Score: ${this.gameState.score}`);
    }

    showInteractionPrompt(show) {
        if (show) {
            this.elements.interactionPrompt.classList.remove('hidden');
        } else {
            this.elements.interactionPrompt.classList.add('hidden');
        }
    }

    showQuestionModal(question) {
        this.currentQuestion = question;
        this.selectedAnswer = null;
        this.isShowingFeedback = false;

        // Set difficulty badge
        this.elements.questionDifficulty.textContent = question.difficulty.toUpperCase().replace('_', ' ');
        this.elements.questionDifficulty.className = 'difficulty-badge ' + question.difficulty.replace('_', '-');

        // Set topic badge
        this.elements.questionTopic.textContent = question.topic;

        // Set question text
        this.elements.questionText.textContent = question.question;

        // Set answer options
        this.elements.answerOptions.forEach(btn => {
            const option = btn.dataset.option;
            const optionText = btn.querySelector('.option-text');
            optionText.textContent = question.options[option];
            btn.classList.remove('correct', 'incorrect', 'disabled');
        });

        // Hide feedback
        this.elements.answerFeedback.classList.add('hidden');

        // Show modal
        this.elements.questionModal.classList.remove('hidden');
    }

    selectAnswer(option) {
        this.selectedAnswer = option;
        this.isShowingFeedback = true;

        const isCorrect = option === this.currentQuestion.answer;

        // Disable all buttons and highlight selected
        this.elements.answerOptions.forEach(btn => {
            btn.classList.add('disabled');
            const btnOption = btn.dataset.option;

            if (btnOption === option) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }

            if (btnOption === this.currentQuestion.answer && !isCorrect) {
                btn.classList.add('correct');
            }
        });

        // Show feedback
        this.elements.answerFeedback.classList.remove('hidden');
        this.elements.feedbackText.textContent = isCorrect ? '✓ CORRECT!' : '✗ INCORRECT!';
        this.elements.feedbackText.className = isCorrect ? 'correct' : 'incorrect';
        this.elements.explanationText.textContent = this.currentQuestion.explanation;

        // Screen effects
        const container = document.getElementById('game-container');
        if (isCorrect) {
            container.classList.add('screen-flash');
            setTimeout(() => container.classList.remove('screen-flash'), 300);
        } else {
            container.classList.add('screen-shake');
            setTimeout(() => container.classList.remove('screen-shake'), 300);
        }
    }

    hideQuestionModal() {
        this.elements.questionModal.classList.add('hidden');
        this.currentQuestion = null;
    }

    showPauseMenu() {
        this.gameState.isPaused = true;
        this.elements.pauseMenu.classList.remove('hidden');
    }

    hidePauseMenu() {
        this.gameState.isPaused = false;
        this.elements.pauseMenu.classList.add('hidden');
    }

    showRoomComplete(roomNumber) {
        this.elements.completedRoomNum.textContent = roomNumber;
        this.elements.roomComplete.classList.remove('hidden');
    }

    hideRoomComplete() {
        this.elements.roomComplete.classList.add('hidden');
    }

    showGameOver() {
        this.elements.finalRooms.textContent = (this.gameState.currentRoom - 1).toString();
        this.elements.finalCorrect.textContent = this.gameState.totalCorrect.toString();
        this.elements.finalScore.textContent = this.gameState.score.toString();
        this.showScreen('gameOver');
    }

    showVictory() {
        this.elements.victoryCorrect.textContent = this.gameState.totalCorrect.toString();
        this.elements.victoryScore.textContent = this.gameState.score.toString();
        this.elements.victoryHealth.textContent = this.gameState.health.toString();
        this.showScreen('victory');
    }

    showSaveConfirmation() {
        // Brief save confirmation
        const saveBtn = this.elements.saveBtn;
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'SAVED!';
        saveBtn.style.backgroundColor = '#22c55e';

        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.backgroundColor = '';
        }, 1500);
    }
}

// Export for use in other modules
window.UIManager = UIManager;
