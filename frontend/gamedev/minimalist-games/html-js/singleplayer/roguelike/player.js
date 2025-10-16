import {
    PLAYER_MAX_HEALTH,
    PLAYER_DAMAGE_BASE,
    PLAYER_DAMAGE_RANDOM
} from './constants.js';

export class Player {
    constructor(x, y, gameInstance) { // Accept game instance
        this.x = x;
        this.y = y;
        this.char = 'P';
        this.color = '#0f0'; // Green
        this.maxHealth = PLAYER_MAX_HEALTH;
        this.health = this.maxHealth;
        this.experience = 0; // Add experience property
        this.game = gameInstance; // Store game instance
    }

    move(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        // Check for collisions with map boundaries and walls
        if (!this.game.map.isPassable(newX, newY)) {
            this.game.logMessage("You bump into a wall.");
            return false; // Cannot move into walls
        }

        // Check for enemies
        const enemy = this.game.getEnemyAt(newX, newY);
        if (enemy) {
            this.attack(enemy);
            // Ensure game updates and renders after an attack, even if player didn't move
            this.game.update();
            this.game.render();
            return false; // Did not move, but attacked
        }

        // Check for items
        const item = this.game.getItemAt(newX, newY);
        if (item) {
            this.pickupItem(item);
        }

        // Move player
        this.x = newX;
        this.y = newY;
        return true; // Move successful
    }

    attack(enemy) {
        const damage = Math.floor(Math.random() * PLAYER_DAMAGE_RANDOM) + PLAYER_DAMAGE_BASE;
        this.game.logMessage(`You attack the ${enemy.char} for ${damage} damage.`);
        if (enemy.takeDamage(damage)) {
            this.game.logMessage(`You defeated the ${enemy.char}!`);
            this.game.enemies = this.game.enemies.filter(e => e !== enemy);
            this.gainExperience(10); // Award 10 experience points for defeating an enemy
            // Check if all enemies are defeated to advance level
            if (this.game.enemies.length === 0) {
                this.game.nextLevel();
            }
        }
    }

    pickupItem(item) {
        item.effect(this);
        this.game.logMessage(`You picked up a ${item.name}!`);
        this.game.items = this.game.items.filter(i => i !== item); // Remove item
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.game.gameOver("You have been defeated!");
        }
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    gainExperience(amount) {
        this.experience += amount;
        // Potentially add level-up logic here in the future
        this.game.logMessage(`You gained ${amount} experience!`);
    }
}
