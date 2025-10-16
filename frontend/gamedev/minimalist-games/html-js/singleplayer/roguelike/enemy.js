import {
    ENEMY_MAX_HEALTH_BASE,
    ENEMY_HEALTH_INCREASE_PER_LEVEL,
    ENEMY_DAMAGE_BASE,
    ENEMY_DAMAGE_RANDOM
} from './constants.js';
// Removed direct import of 'game' as it will be passed via constructor

export class Enemy {
    constructor(x, y, char, color, health, gameInstance) { // Accept game instance
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = color;
        this.maxHealth = health;
        this.health = health;
        this.game = gameInstance; // Store game instance
    }

    act() {
        if (this.game.isGameOver || this.game.enemies.length === 0) return;

        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        let moved = false;

        // Check if player is adjacent and attack
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
            this.attackPlayer();
            return; // Enemy attacked, turn ends
        }

        // Simple AI: move towards player if possible
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) moved = this.move(1, 0);
            else if (dx < 0) moved = this.move(-1, 0);
        } else {
            if (dy > 0) moved = this.move(0, 1);
            else if (dy < 0) moved = this.move(0, -1);
        }

        // If not moved, try the other axis
        if (!moved) {
            if (dx > 0) moved = this.move(1, 0);
            else if (dx < 0) moved = this.move(-1, 0);
            else if (dy > 0) moved = this.move(0, 1);
            else if (dy < 0) moved = this.move(0, -1);
        }
    }

    move(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (this.game.map.isPassable(newX, newY) && !this.game.hasEnemyAt(newX, newY) && !(this.game.player.x === newX && this.game.player.y === newY)) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }

    attackPlayer() {
        const damage = Math.floor(Math.random() * ENEMY_DAMAGE_RANDOM) + ENEMY_DAMAGE_BASE;
        this.game.logMessage(`The ${this.char} attacks you for ${damage} damage.`);
        this.game.player.takeDamage(damage);
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            return true; // Enemy defeated
        }
        return false; // Enemy still alive
    }
}
