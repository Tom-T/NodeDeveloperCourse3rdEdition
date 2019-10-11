const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let chatLog = [];

io.on("connection", socket => {
  console.log("new websocket connection");
  socket.emit("message", "Welcome!");

  socket.broadcast.emit("message", "A new user has joined!");

  chatLog.forEach(message => {
    socket.emit("message", message);
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }
    io.emit("message", message);
    chatLog.push(message);
    while (chatLog.length >= 4) {
      chatLog.shift();
    }
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });

  socket.on("sendLocation", (position, callback) => {
    io.emit("message", "Location: " + `https://google.com/maps?q=${position.latitude},${position.longitude}`);
    callback();
  });
});

server.listen(port);
