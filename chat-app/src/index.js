const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage, generateLocationMessage } = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let chatLog = [];

io.on("connection", socket => {
  console.log("new websocket connection");
  socket.emit("message", generateMessage("Welcome!"));

  socket.broadcast.emit("message", generateMessage("A new user has joined!"));

  chatLog.forEach(message => {
    socket.emit("message", message);
  });

  socket.on("sendMessage", (text, callback) => {
    const filter = new Filter();
    if (filter.isProfane(text)) {
      return callback("Profanity is not allowed.");
    }
    message = generateMessage(text);
    io.emit("message", message);
    chatLog.push(message);
    while (chatLog.length >= 4) {
      chatLog.shift();
    }
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left"));
  });

  socket.on("sendLocation", (position, callback) => {
    io.emit(
      "locationMessage",generateLocationMessage(`https://google.com/maps?q=${position.latitude},${position.longitude}`)
    );
    callback();
  });
});

server.listen(port);
