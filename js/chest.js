// ========================================
// DATA SCIENCE DUNGEON - CHEST
// ========================================

class Chest {
    constructor(x, y, chestNumber) {
        this.x = x;
        this.y = y;
        this.width = 128; // Resized to 128
        this.height = 128; // Resized to 128
        this.chestNumber = chestNumber; // 1, 2, or 3 (determines difficulty)
        this.isOpen = false;
        this.isCompleted = false;
        this.glowPhase = 0;

        // Load sprite
        this.sprite = new Image();
        this.sprite.src = 'assets/chest.png';
        this.spriteLoaded = false;
        this.sprite.onload = () => {
            this.spriteLoaded = true;
        };
    }

    update() {
        // Glow animation for unopened chests
        if (!this.isCompleted) {
            this.glowPhase += 0.05;
        }
    }

    draw(ctx) {
        // Draw glow effect for unopened chests
        if (!this.isCompleted) {
            const glowIntensity = Math.sin(this.glowPhase) * 0.3 + 0.5;
            const glowColor = this.getDifficultyColor();
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 15 * glowIntensity;
        }

        if (this.spriteLoaded) {
            // Draw sprite
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

            // Draw overlay for completed chests
            if (this.isCompleted) {
                ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
                ctx.fillRect(this.x, this.y, this.width, this.height);

                // Draw checkmark
                ctx.fillStyle = '#22c55e';
                ctx.font = '20px "Press Start 2P"';
                ctx.textAlign = 'center';
                ctx.fillText('✓', this.x + this.width / 2, this.y + this.height / 2 + 8);
            }
        } else {
            // Fallback: draw a rectangle
            if (this.isCompleted) {
                ctx.fillStyle = '#166534'; // Dark green
            } else if (this.isOpen) {
                ctx.fillStyle = '#854d0e'; // Dark brown
            } else {
                ctx.fillStyle = '#92400e'; // Brown
            }
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Draw lock/status
            ctx.fillStyle = this.getDifficultyColor();
            ctx.fillRect(this.x + this.width / 4, this.y + 5, this.width / 2, 10);

            if (this.isCompleted) {
                ctx.fillStyle = '#22c55e';
                ctx.font = '16px "Press Start 2P"';
                ctx.textAlign = 'center';
                ctx.fillText('✓', this.x + this.width / 2, this.y + this.height / 2 + 6);
            }
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Draw difficulty indicator
        if (!this.isCompleted) {
            ctx.fillStyle = this.getDifficultyColor();
            ctx.font = '8px "Press Start 2P"';
            ctx.textAlign = 'center';
            const diffLabel = this.getDifficultyLabel();
            ctx.fillText(diffLabel, this.x + this.width / 2, this.y - 5);
        }
    }

    getDifficultyColor() {
        switch (this.chestNumber) {
            case 1: return '#22c55e'; // Green - Easy
            case 2: return '#f59e0b'; // Orange - Medium
            case 3: return '#ef4444'; // Red - Hard
            default: return '#ffffff';
        }
    }

    getDifficultyLabel() {
        switch (this.chestNumber) {
            case 1: return 'I';
            case 2: return 'II';
            case 3: return 'III';
            default: return '';
        }
    }

    getCenterX() {
        return this.x + this.width / 2;
    }

    getCenterY() {
        return this.y + this.height / 2;
    }

    // Check if player is within interaction range
    isPlayerNear(player, range = 150) {
        const dx = player.getCenterX() - this.getCenterX();
        const dy = player.getCenterY() - this.getCenterY();
        return Math.sqrt(dx * dx + dy * dy) < range;
    }

    open() {
        this.isOpen = true;
    }

    complete() {
        this.isCompleted = true;
        this.isOpen = true;
    }
}

// Export for use in other modules
window.Chest = Chest;
