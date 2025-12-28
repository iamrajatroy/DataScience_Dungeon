// ========================================
// DATA SCIENCE DUNGEON - PLAYER
// ========================================

class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 400; // Center X
        this.y = 200; // Center Y (Safe from chests)
        this.width = 256; // Visual width
        this.height = 256; // Visual height

        // Hitbox for collision (smaller than sprite)
        this.hitboxWidth = 64;
        this.hitboxHeight = 64;
        this.hitboxOffsetX = (this.width - this.hitboxWidth) / 2;
        this.hitboxOffsetY = this.height - this.hitboxHeight - 20; // Near bottom/feet

        this.speed = 4;
        this.sprite = new Image();
        this.sprite.src = 'assets/hero.png';
        this.spriteLoaded = false;
        this.sprite.onload = () => {
            this.spriteLoaded = true;
        };

        // Movement state
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            space: false
        };

        // Animation
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameDelay = 8;
        this.direction = 'down'; // up, down, left, right
        this.isMoving = false;

        // Interaction
        this.canInteract = false;
        this.nearbyChest = null;

        this.setupControls();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') { this.keys.up = true; e.preventDefault(); }
            if (e.key === 'ArrowDown' || e.key === 's') { this.keys.down = true; e.preventDefault(); }
            if (e.key === 'ArrowLeft' || e.key === 'a') { this.keys.left = true; e.preventDefault(); }
            if (e.key === 'ArrowRight' || e.key === 'd') { this.keys.right = true; e.preventDefault(); }
            if (e.key === ' ') {
                this.keys.space = true;
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys.up = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys.down = false;
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
            if (e.key === ' ') this.keys.space = false;
        });

        // Setup touch controls for mobile/tablet
        this.setupTouchControls();
    }

    setupTouchControls() {
        // D-pad buttons
        const dpadButtons = document.querySelectorAll('.dpad-btn');

        dpadButtons.forEach(btn => {
            const key = btn.dataset.key;

            // Touch start - activate movement
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys[key] = true;
                btn.classList.add('pressed');
            }, { passive: false });

            // Touch end - deactivate movement
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys[key] = false;
                btn.classList.remove('pressed');
            }, { passive: false });

            // Touch cancel - deactivate movement
            btn.addEventListener('touchcancel', (e) => {
                this.keys[key] = false;
                btn.classList.remove('pressed');
            });

            // Also support mouse for testing on desktop
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.keys[key] = true;
                btn.classList.add('pressed');
            });

            btn.addEventListener('mouseup', (e) => {
                this.keys[key] = false;
                btn.classList.remove('pressed');
            });

            btn.addEventListener('mouseleave', (e) => {
                this.keys[key] = false;
                btn.classList.remove('pressed');
            });
        });

        // Action button (space key equivalent)
        const actionBtn = document.getElementById('touch-action-btn');
        if (actionBtn) {
            actionBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys.space = true;
                actionBtn.classList.add('pressed');
            }, { passive: false });

            actionBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys.space = false;
                actionBtn.classList.remove('pressed');
            }, { passive: false });

            actionBtn.addEventListener('touchcancel', (e) => {
                this.keys.space = false;
                actionBtn.classList.remove('pressed');
            });

            // Mouse support for desktop testing
            actionBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.keys.space = true;
                actionBtn.classList.add('pressed');
            });

            actionBtn.addEventListener('mouseup', (e) => {
                this.keys.space = false;
                actionBtn.classList.remove('pressed');
            });

            actionBtn.addEventListener('mouseleave', (e) => {
                this.keys.space = false;
                actionBtn.classList.remove('pressed');
            });
        }
    }

    update(room) {
        let dx = 0;
        let dy = 0;

        if (this.keys.up) {
            dy = -this.speed;
            this.direction = 'up';
        }
        if (this.keys.down) {
            dy = this.speed;
            this.direction = 'down';
        }
        if (this.keys.left) {
            dx = -this.speed;
            this.direction = 'left';
        }
        if (this.keys.right) {
            dx = this.speed;
            this.direction = 'right';
        }

        this.isMoving = dx !== 0 || dy !== 0;

        // Calculate potential new position
        const newX = this.x + dx;
        const newY = this.y + dy;

        // Calculate hitbox position at new coordinates
        const hitboxX = newX + this.hitboxOffsetX;
        const hitboxY = newY + this.hitboxOffsetY;

        // Boundary checks using hitbox
        const minX = 50; // Wall thickness
        const maxX = this.canvas.width - this.hitboxWidth - 50;
        const minY = 50;
        const maxY = this.canvas.height - this.hitboxHeight - 50;

        // Check room-specific collisions (walls, etc.) using hitbox
        if (room) {
            const canMoveX = !room.checkCollision(hitboxX, this.y + this.hitboxOffsetY, this.hitboxWidth, this.hitboxHeight);
            const canMoveY = !room.checkCollision(this.x + this.hitboxOffsetX, hitboxY, this.hitboxWidth, this.hitboxHeight);

            // Update X if valid
            if (canMoveX && hitboxX >= minX && hitboxX <= maxX) {
                this.x = newX;
            }

            // Update Y if valid
            if (canMoveY && hitboxY >= minY && hitboxY <= maxY) {
                this.y = newY;
            }
        } else {
            // Simple boundary check without room objects
            if (hitboxX >= minX && hitboxX <= maxX) this.x = newX;
            if (hitboxY >= minY && hitboxY <= maxY) this.y = newY;
        }

        // Animation update
        if (this.isMoving) {
            this.frameTimer++;
            if (this.frameTimer >= this.frameDelay) {
                this.frameTimer = 0;
                this.frameIndex = (this.frameIndex + 1) % 4;
            }
        } else {
            this.frameIndex = 0;
        }
    }

    draw(ctx) {
        if (this.spriteLoaded) {
            // Draw sprite (assuming spritesheet with directions)
            // For now, draw the whole sprite scaled
            ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            // Fallback: draw a rectangle
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Draw direction indicator
            ctx.fillStyle = '#22c55e';
            const indicatorSize = 8;
            switch (this.direction) {
                case 'up':
                    ctx.fillRect(this.x + this.width / 2 - indicatorSize / 2, this.y, indicatorSize, indicatorSize);
                    break;
                case 'down':
                    ctx.fillRect(this.x + this.width / 2 - indicatorSize / 2, this.y + this.height - indicatorSize, indicatorSize, indicatorSize);
                    break;
                case 'left':
                    ctx.fillRect(this.x, this.y + this.height / 2 - indicatorSize / 2, indicatorSize, indicatorSize);
                    break;
                case 'right':
                    ctx.fillRect(this.x + this.width - indicatorSize, this.y + this.height / 2 - indicatorSize / 2, indicatorSize, indicatorSize);
                    break;
            }
        }

        // Draw interaction indicator if near chest
        if (this.canInteract) {
            ctx.fillStyle = '#f59e0b';
            ctx.font = '10px "Press Start 2P"';
            ctx.textAlign = 'center';
            const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            ctx.fillText(isTouchDevice ? 'TAP ⚡' : 'SPACE', this.x + this.width / 2, this.y - 10);
        }


    }

    // Reset position for new room
    resetPosition() {
        this.x = 400;
        this.y = 200;
    }

    // Get center position
    getCenterX() {
        return this.x + this.width / 2;
    }

    getCenterY() {
        return this.y + this.height / 2;
    }

    // Check if near a point
    isNear(targetX, targetY, range = 200) {
        const dx = this.getCenterX() - targetX;
        const dy = this.getCenterY() - targetY;
        return Math.sqrt(dx * dx + dy * dy) < range;
    }
}

// Export for use in other modules
window.Player = Player;
