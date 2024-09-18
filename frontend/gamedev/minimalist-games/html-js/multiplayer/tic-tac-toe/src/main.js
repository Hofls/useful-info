const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Setup express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static HTML and JS
app.use(express.static('public'));

let players = [];
let board = Array(9).fill(null);
let currentPlayer = 'X';

io.on('connection', (socket) => {
  // Register the player if we have less than 2 players
  if (players.length < 2) {
    players.push(socket);
    socket.emit('message', `You are player ${players.length === 1 ? 'X' : 'O'}`);
  }

  socket.on('move', (index) => {
    if (players.indexOf(socket) !== (currentPlayer === 'X' ? 0 : 1)) {
      return; // Not this player's turn
    }

    if (board[index] === null) {
      board[index] = currentPlayer;
      io.emit('updateBoard', board);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      io.emit('turn', currentPlayer);

      const winner = checkWinner();
      if (winner) {
        io.emit('winner', winner);
        resetGame();
      } else if (board.every(cell => cell !== null)) {
        io.emit('winner', 'Draw');
        resetGame();
      }
    }
  });

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
  }

  socket.on('disconnect', () => {
    players = players.filter(p => p !== socket);
    resetGame();
  });
});

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O' as winner
    }
  }
  return null;
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
