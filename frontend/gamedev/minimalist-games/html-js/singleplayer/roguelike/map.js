import {
    MAP_WIDTH,
    MAP_HEIGHT,
    TILE_SIZE,
    MAX_ROOMS,
    ROOM_MIN_SIZE,
    ROOM_MAX_SIZE
} from './constants.js';

export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.rooms = [];
    }

    generate() {
        // Initialize map with walls
        this.tiles = [];
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = { char: '#', color: '#555' }; // Wall
            }
        }

        // Create rooms
        for (let i = 0; i < MAX_ROOMS; i++) {
            const w = Math.floor(Math.random() * (ROOM_MAX_SIZE - ROOM_MIN_SIZE + 1)) + ROOM_MIN_SIZE;
            const h = Math.floor(Math.random() * (ROOM_MAX_SIZE - ROOM_MIN_SIZE + 1)) + ROOM_MIN_SIZE;
            const x = Math.floor(Math.random() * (this.width - w - 2)) + 1;
            const y = Math.floor(Math.random() * (this.height - h - 2)) + 1;

            const newRoom = { x1: x, y1: y, x2: x + w, y2: y + h };

            // Check for overlap with existing rooms
            let overlaps = false;
            for (const otherRoom of this.rooms) {
                if (newRoom.x1 <= otherRoom.x2 + 1 && newRoom.x2 >= otherRoom.x1 - 1 &&
                    newRoom.y1 <= otherRoom.y2 + 1 && newRoom.y2 >= otherRoom.y1 - 1) {
                    overlaps = true;
                    break;
                }
            }

            if (!overlaps) {
                this.rooms.push(newRoom);
                this.createRoom(newRoom);
                if (this.rooms.length > 1) {
                    this.createCorridor(newRoom);
                }
            }
        }
    }

    createRoom(room) {
        for (let y = room.y1; y <= room.y2; y++) {
            for (let x = room.x1; x <= room.x2; x++) {
                this.tiles[y][x] = { char: '.', color: '#333' }; // Floor
            }
        }
    }

    createCorridor(room) {
        const prevRoom = this.rooms[this.rooms.length - 2];
        const center1 = { x: Math.floor((room.x1 + room.x2) / 2), y: Math.floor((room.y1 + room.y2) / 2) };
        const center2 = { x: Math.floor((prevRoom.x1 + prevRoom.x2) / 2), y: Math.floor((prevRoom.y1 + prevRoom.y2) / 2) };

        if (Math.random() < 0.5) {
            this.createHorizontalCorridor(center1.x, center2.x, center1.y);
            this.createVerticalCorridor(center1.y, center2.y, center2.x);
        } else {
            this.createVerticalCorridor(center1.y, center2.y, center1.x);
            this.createHorizontalCorridor(center1.x, center2.x, center2.y);
        }
    }

    createHorizontalCorridor(x1, x2, y) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            this.tiles[y][x] = { char: '.', color: '#333' };
        }
    }

    createVerticalCorridor(y1, y2, x) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            this.tiles[y][x] = { char: '.', color: '#333' };
        }
    }

    isPassable(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false; // Out of bounds
        }
        return this.tiles[y][x].char !== '#'; // Not a wall
    }

    render(ctx, player, enemies, items) {
        const gameContainer = document.getElementById('gameCanvas');
        gameContainer.innerHTML = ''; // Clear previous content

        const table = document.createElement('table');
        table.style.width = `${this.width * TILE_SIZE}px`;
        table.style.height = `${this.height * TILE_SIZE}px`;

        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.style.width = `${TILE_SIZE}px`;
                cell.style.height = `${TILE_SIZE}px`;
                cell.style.backgroundColor = this.tiles[y][x].color;

                let char = this.tiles[y][x].char;
                let color = this.tiles[y][x].color;

                // Check for player
                if (player.x === x && player.y === y) {
                    char = player.char;
                    color = player.color;
                } else {
                    // Check for enemies
                    const enemy = enemies.find(e => e.x === x && e.y === y);
                    if (enemy) {
                        char = enemy.char;
                        color = enemy.color;
                    } else {
                        // Check for items
                        const item = items.find(i => i.x === x && i.y === y);
                        if (item) {
                            char = item.char;
                            color = item.color;
                        }
                    }
                }

                cell.textContent = char;
                cell.style.color = color;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        gameContainer.appendChild(table);
    }
}
