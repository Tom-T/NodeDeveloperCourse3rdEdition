const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

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

  socket.broadcast.emit("message", "A new user has joined!")

  chatLog.forEach(message => {
    socket.emit("message", message);
  });

  socket.on("sendMessage", message => {
    io.emit("message", message);
    chatLog.push(message);
    while (chatLog.length >= 4) {
      chatLog.shift();
    }
  });

  socket.on("disconnect", () =>{
    io.emit("message", "A user has left")
  })

  socket.on("sendLocation", (lat, long) => {
      io.emit("message", "Location: " + lat +"," + long);
  });

});

server.listen(port);
