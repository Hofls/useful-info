import {
    MAP_WIDTH,
    MAP_HEIGHT,
    MAX_ENEMIES_PER_LEVEL,
    PLAYER_MAX_HEALTH,
    ENEMY_MAX_HEALTH_BASE,
    ENEMY_HEALTH_INCREASE_PER_LEVEL
} from './constants.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Item } from './item.js';
import { Map } from './map.js';

// Global game instance
let game;

export class Game {
    constructor() {
        this.player = new Player(0, 0, this); // Pass the game instance to the player
        this.map = new Map(MAP_WIDTH, MAP_HEIGHT);
        this.enemies = [];
        this.items = [];
        this.isGameOver = false;
        this.messageLog = []; // For displaying game messages
        this.level = 1;
    }

    init() {
        this.map.generate();
        // Set player position after map is generated
        if (this.map.rooms.length > 0) {
            const firstRoom = this.map.rooms[0];
            this.player.x = Math.floor((firstRoom.x1 + firstRoom.x2) / 2);
            this.player.y = Math.floor((firstRoom.y1 + firstRoom.y2) / 2);
        }

        this.setupEnemies();
        this.setupItems();
        this.setupInputHandler();
        this.render();
        this.logMessage(`Welcome to Roguelike! Level ${this.level}`);
    }

    setupEnemies() {
        const numEnemies = MAX_ENEMIES_PER_LEVEL + this.level - 1; // Increase enemies per level
        for (let i = 0; i < numEnemies; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * this.map.width);
                y = Math.floor(Math.random() * this.map.height);
            } while (!this.map.isPassable(x, y) || (this.player.x === x && this.player.y === y) || this.hasEnemyAt(x, y));
            const enemyHealth = ENEMY_MAX_HEALTH_BASE + (this.level - 1) * ENEMY_HEALTH_INCREASE_PER_LEVEL;
            this.enemies.push(new Enemy(x, y, 'G', '#f00', enemyHealth)); // Goblin, Red
        }
    }

    setupItems() {
        // Place a health potion in a random room
        if (this.map.rooms.length > 0) {
            const room = this.map.rooms[Math.floor(Math.random() * this.map.rooms.length)];
            let x, y;
            do {
                x = Math.floor(Math.random() * (room.x2 - room.x1 + 1)) + room.x1;
                y = Math.floor(Math.random() * (room.y2 - room.y1 + 1)) + room.y1;
            } while (!this.map.isPassable(x, y) || (this.player.x === x && this.player.y === y) || this.hasEnemyAt(x, y) || this.hasItemAt(x, y));
            this.items.push(new Item(x, y, '!', '#ff0', 'Health Potion', (player) => player.heal(30))); // Yellow '!' for potion
        }
    }

    setupInputHandler() {
        document.addEventListener('keydown', (event) => {
            if (this.isGameOver) return;

            let playerActed = false;
            switch (event.key) {
                case 'ArrowUp':
                    playerActed = this.player.move(0, -1);
                    break;
                case 'ArrowDown':
                    playerActed = this.player.move(0, 1);
                    break;
                case 'ArrowLeft':
                    playerActed = this.player.move(-1, 0);
                    break;
                case 'ArrowRight':
                    playerActed = this.player.move(1, 0);
                    break;
                default:
                    return; // Ignore other keys
            }

            if (playerActed) {
                this.update();
                this.render();
            }
        });
    }

    update() {
        // Enemy actions only happen if player is alive and there are enemies
        if (!this.isGameOver && this.enemies.length > 0) {
            this.enemies.forEach(enemy => enemy.act());
        }

        // Check for game over condition after enemy actions
        if (this.isGameOver) {
            this.render(); // Render game over screen
            return;
        }

        this.render(); // Re-render after updates
    }

    nextLevel() {
        this.level++;
        this.logMessage(`You advance to Level ${this.level}!`);
        this.map = new Map(MAP_WIDTH, MAP_HEIGHT); // Generate new map
        this.map.generate();

        // Reset player position in the center of the first room of the new map
        if (this.map.rooms.length > 0) {
            const firstRoom = this.map.rooms[0];
            this.player.x = Math.floor((firstRoom.x1 + firstRoom.x2) / 2);
            this.player.y = Math.floor((firstRoom.y1 + firstRoom.y2) / 2);
        } else {
            // Fallback if no rooms are generated (should not happen with current logic)
            this.player.x = Math.floor(this.map.width / 2);
            this.player.y = Math.floor(this.map.height / 2);
        }

        this.setupEnemies();
        this.setupItems();
        this.render();
    }

    render() {
        if (this.isGameOver) {
            this.renderGameOver();
        } else {
            this.map.render(null, this.player, this.enemies, this.items);
            this.renderUI();
        }
    }

    renderGameOver() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '<div style="color: red; font-size: 30px; text-align: center; margin-top: 50px;">GAME OVER</div>';
        this.renderUI(); // Show UI elements even on game over
    }

    renderUI() {
        // Render player health
        const healthBar = document.getElementById('health-bar');
        if (!healthBar) {
            const newHealthBar = document.createElement('div');
            newHealthBar.id = 'health-bar';
            newHealthBar.style.marginTop = '10px';
            newHealthBar.style.color = '#eee';
            document.body.appendChild(newHealthBar);
        }
        const healthContainer = document.getElementById('health-bar');
        healthContainer.innerHTML = `Health: ${this.player.health}/${this.player.maxHealth}`;

        // Render message log
        const logElement = document.getElementById('message-log');
        if (!logElement) {
            const newLogElement = document.createElement('div');
            newLogElement.id = 'message-log';
            newLogElement.style.marginTop = '20px';
            newLogElement.style.color = '#ccc';
            document.body.appendChild(newLogElement);
        }
        const logContainer = document.getElementById('message-log');
        logContainer.innerHTML = this.messageLog.slice(-5).join('<br>'); // Show last 5 messages
    }

    logMessage(message) {
        this.messageLog.push(message);
        if (this.messageLog.length > 10) { // Keep log size manageable
            this.messageLog.shift();
        }
    }

    gameOver(message) {
        this.isGameOver = true;
        this.logMessage(message);
        this.render();
    }

    hasEnemyAt(x, y) {
        return this.enemies.some(enemy => enemy.x === x && enemy.y === y);
    }

    getEnemyAt(x, y) {
        return this.enemies.find(enemy => enemy.x === x && enemy.y === y);
    }

    getItemAt(x, y) {
        return this.items.find(item => item.x === x && item.y === y);
    }

    hasItemAt(x, y) {
        return this.items.some(item => item.x === x && item.y === y);
    }
}

// Initialize and start the game
window.onload = () => {
    game = new Game();
    game.init();
};

export { game };
