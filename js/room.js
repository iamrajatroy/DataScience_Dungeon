// ========================================
// DATA SCIENCE DUNGEON - ROOM
// ========================================

class Room {
    constructor(canvas, roomNumber) {
        this.canvas = canvas;
        this.roomNumber = roomNumber;
        this.width = canvas.width;
        this.height = canvas.height;

        // Room background
        this.background = new Image();
        this.background.src = 'assets/room.png';
        this.backgroundLoaded = false;
        this.background.onload = () => {
            this.backgroundLoaded = true;
        };

        // Create chests with positions
        this.chests = this.createChests();

        // Portal to next room
        this.portal = {
            x: this.width / 2 - 30,
            y: 30,
            width: 60,
            height: 50,
            active: false,
            glowPhase: 0
        };

        // Room theme colors based on room number
        this.themeColor = this.getRoomThemeColor();
    }

    createChests() {
        // Position chests strategically in the room
        // Adjusted for 128x128 chest sprites
        const positions = [
            { x: 100, y: 380 },  // Bottom left
            { x: 570, y: 380 },  // Bottom right
            { x: 340, y: 150 }   // Top center
        ];

        return positions.map((pos, index) =>
            new Chest(pos.x, pos.y, index + 1)
        );
    }

    getRoomThemeColor() {
        const themes = [
            '#3b82f6', // Blue - Statistics
            '#22c55e', // Green - ML
            '#8b5cf6', // Purple - DL
            '#f59e0b', // Orange - RL
            '#ef4444', // Red - NLP
            '#ec4899', // Pink - LLMs
            '#06b6d4', // Cyan - GenAI
            '#84cc16', // Lime - Mixed
            '#f97316', // Orange - Advanced
            '#a855f7'  // Violet - Expert
        ];
        return themes[(this.roomNumber - 1) % themes.length];
    }

    update() {
        // Update chests
        this.chests.forEach(chest => chest.update());

        // Update portal animation if active
        if (this.portal.active) {
            this.portal.glowPhase += 0.08;
        }
    }

    draw(ctx) {
        // Draw background
        if (this.backgroundLoaded) {
            ctx.drawImage(this.background, 0, 0, this.width, this.height);
        } else {
            // Fallback: procedural dungeon floor
            this.drawProceduralBackground(ctx);
        }

        // Draw room number indicator
        this.drawRoomIndicator(ctx);

        // Draw portal
        this.drawPortal(ctx);

        // Draw chests
        this.chests.forEach(chest => chest.draw(ctx));
    }

    drawProceduralBackground(ctx) {
        // Dark floor
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw stone tiles
        const tileSize = 40;
        for (let x = 0; x < this.width; x += tileSize) {
            for (let y = 0; y < this.height; y += tileSize) {
                const shade = ((x / tileSize + y / tileSize) % 2 === 0) ? '#16161a' : '#1e1e2e';
                ctx.fillStyle = shade;
                ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
            }
        }

        // Draw walls
        ctx.fillStyle = '#2d2d44';
        // Top wall
        ctx.fillRect(0, 0, this.width, 50);
        // Bottom wall
        ctx.fillRect(0, this.height - 50, this.width, 50);
        // Left wall
        ctx.fillRect(0, 0, 50, this.height);
        // Right wall
        ctx.fillRect(this.width - 50, 0, 50, this.height);

        // Wall details
        ctx.strokeStyle = '#3d3d5c';
        ctx.lineWidth = 2;
        for (let i = 0; i < this.width; i += 60) {
            // Top wall bricks
            ctx.strokeRect(i, 0, 60, 25);
            ctx.strokeRect(i + 30, 25, 60, 25);
            // Bottom wall bricks
            ctx.strokeRect(i, this.height - 50, 60, 25);
            ctx.strokeRect(i + 30, this.height - 25, 60, 25);
        }

        // Room theme accent
        ctx.fillStyle = this.themeColor;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(50, 50, this.width - 100, this.height - 100);
        ctx.globalAlpha = 1;

        // Corner torches
        this.drawTorch(ctx, 60, 60);
        this.drawTorch(ctx, this.width - 80, 60);
        this.drawTorch(ctx, 60, this.height - 80);
        this.drawTorch(ctx, this.width - 80, this.height - 80);
    }

    drawTorch(ctx, x, y) {
        // Torch base
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(x, y, 12, 20);

        // Flame
        const flickerOffset = Math.random() * 2;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x + 6 + flickerOffset, y - 5, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x + 6, y - 3, 5, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
        ctx.beginPath();
        ctx.arc(x + 6, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    drawRoomIndicator(ctx) {
        // Room badge in corner
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(this.width - 100, 60, 40, 30);

        ctx.fillStyle = this.themeColor;
        ctx.font = '14px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(this.roomNumber.toString(), this.width - 80, 82);
    }

    drawPortal(ctx) {
        const p = this.portal;

        if (this.portal.active) {
            // Active portal with glow
            const glowIntensity = Math.sin(this.portal.glowPhase) * 0.3 + 0.7;

            ctx.shadowColor = '#a855f7';
            ctx.shadowBlur = 20 * glowIntensity;

            // Portal frame
            ctx.fillStyle = '#4c1d95';
            ctx.fillRect(p.x - 5, p.y - 5, p.width + 10, p.height + 10);

            // Portal interior
            const gradient = ctx.createRadialGradient(
                p.x + p.width / 2, p.y + p.height / 2, 0,
                p.x + p.width / 2, p.y + p.height / 2, p.width / 2
            );
            gradient.addColorStop(0, '#c084fc');
            gradient.addColorStop(0.5, '#8b5cf6');
            gradient.addColorStop(1, '#4c1d95');

            ctx.fillStyle = gradient;
            ctx.fillRect(p.x, p.y, p.width, p.height);

            // Swirl effect
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const centerX = p.x + p.width / 2;
            const centerY = p.y + p.height / 2;
            for (let i = 0; i < 3; i++) {
                const angle = this.portal.glowPhase + (i * Math.PI * 2 / 3);
                const radius = 15;
                ctx.arc(
                    centerX + Math.cos(angle) * radius,
                    centerY + Math.sin(angle) * radius * 0.5,
                    5, 0, Math.PI * 2
                );
            }
            ctx.stroke();

            // "NEXT" text
            ctx.fillStyle = '#ffffff';
            ctx.font = '8px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('ENTER', p.x + p.width / 2, p.y + p.height + 15);

            ctx.shadowBlur = 0;
        } else {
            // Inactive portal (locked)
            ctx.fillStyle = '#374151';
            ctx.fillRect(p.x, p.y, p.width, p.height);

            ctx.strokeStyle = '#4b5563';
            ctx.lineWidth = 3;
            ctx.strokeRect(p.x, p.y, p.width, p.height);

            // Lock icon
            ctx.fillStyle = '#6b7280';
            ctx.font = '16px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('🔒', p.x + p.width / 2, p.y + p.height / 2 + 6);
        }
    }

    checkCollision(x, y, width, height) {
        // Check wall collisions
        const wallThickness = 50;

        // Left wall
        if (x < wallThickness) return true;
        // Right wall
        if (x + width > this.width - wallThickness) return true;
        // Bottom wall
        if (y + height > this.height - wallThickness) return true;

        // Top wall with portal gap
        if (y < wallThickness) {
            // Allow through portal area if portal is active
            if (this.portal.active) {
                const portalLeft = this.portal.x - 10;
                const portalRight = this.portal.x + this.portal.width + 10;
                if (x + width / 2 > portalLeft && x + width / 2 < portalRight) {
                    return false; // Can pass through portal
                }
            }
            return true;
        }

        // Check chest collisions (make them solid but with smaller hitbox)
        // Use a smaller collision box to allow player to get closer for interaction
        const chestPadding = 30; // Allow player to get closer to chest edges
        for (const chest of this.chests) {
            const collisionX = chest.x + chestPadding;
            const collisionY = chest.y + chestPadding;
            const collisionWidth = chest.width - (chestPadding * 2);
            const collisionHeight = chest.height - (chestPadding * 2);

            if (x < collisionX + collisionWidth &&
                x + width > collisionX &&
                y < collisionY + collisionHeight &&
                y + height > collisionY) {
                return true;
            }
        }

        return false;
    }

    // Check if player is at portal
    isPlayerAtPortal(player) {
        if (!this.portal.active) return false;

        const p = this.portal;
        return player.getCenterX() > p.x &&
            player.getCenterX() < p.x + p.width &&
            player.getCenterY() < p.y + p.height + 30;
    }

    // Find which chest the player is near
    getNearbyChest(player) {
        for (const chest of this.chests) {
            if (chest.isPlayerNear(player) && !chest.isCompleted) {
                return chest;
            }
        }
        return null;
    }

    // Activate portal when all chests are complete
    checkPortalActivation() {
        const completedCount = this.chests.filter(c => c.isCompleted).length;
        const allComplete = this.chests.every(c => c.isCompleted);

        console.log(`[Room] checkPortalActivation: ${completedCount}/${this.chests.length} chests completed.`);

        if (allComplete && !this.portal.active) {
            console.log('[Room] All chests opened! Activating portal.');
            this.portal.active = true;
        }
        return this.portal.active;
    }

    // Mark chests as completed based on game state
    syncWithGameState(gameState) {
        this.chests.forEach((chest, index) => {
            if (gameState.isChestOpened(this.roomNumber, index + 1)) {
                chest.complete();
            }
        });
        this.checkPortalActivation();
    }
}

// Export for use in other modules
window.Room = Room;
