const express = require('express');
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

exports.io = io;

/**
 * @param {number} [port=3000] The listen port for the server
 * @returns {Promise<number>} The listen port of the server
 */
exports.start = async function(port = 3000) {
  return new Promise((resolve, reject) => {
    server.listen(port, () => resolve(port));
  });
}