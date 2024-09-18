const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Global game state
const games = {};

// Create a new game
app.post('/create_game', (req, res) => {
    const gameId = uuidv4();
    games[gameId] = {
        players: [],
        state: {}  // Example: empty game state, adjust as needed
    };
    res.json({ game_id: gameId });
});

// Join an existing game
app.post('/join_game/:gameId', (req, res) => {
    const gameId = req.params.gameId;

    if (!games[gameId]) {
        return res.status(404).json({ error: 'Game not found' });
    }

    const playerId = uuidv4();
    games[gameId].players.push(playerId);
    res.json({ player_id: playerId });
});

// Get game state
app.get('/game_state/:gameId', (req, res) => {
    const gameId = req.params.gameId;

    if (!games[gameId]) {
        return res.status(404).json({ error: 'Game not found' });
    }

    res.json(games[gameId]);
});

// Make a move
app.post('/make_move/:gameId/:playerId', (req, res) => {
    const gameId = req.params.gameId;
    const playerId = req.params.playerId;

    if (!games[gameId]) {
        return res.status(404).json({ error: 'Game not found' });
    }

    if (!games[gameId].players.includes(playerId)) {
        return res.status(404).json({ error: 'Player not found in game' });
    }

    const moveData = req.body;

    // Example move processing, adjust as needed for your game
    games[gameId].state[playerId] = moveData;

    res.json({ status: 'Move accepted' });
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
