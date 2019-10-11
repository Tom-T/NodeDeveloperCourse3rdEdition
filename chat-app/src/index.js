const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage, generateLocationMessage } = require("./utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username,
      room
    });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit("message", generateMessage("Welcome!"));

    socket.broadcast.to(user.room).emit("message", generateMessage(user.username + " user has joined!"));
    callback();
  });
  socket.on("sendMessage", (text, callback) => {
    const filter = new Filter();
    if (filter.isProfane(text)) {
      return callback("Profanity is not allowed.");
    }
    message = generateMessage(text);
    io.to(getUser(socket.id).room).emit("message", message);
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", generateMessage(user.username + " has left"));
    }
  });

  socket.on("sendLocation", (position, callback) => {
    io.to(getUser(socket.id).room).emit(
      "locationMessage",
      generateLocationMessage(`https://google.com/maps?q=${position.latitude},${position.longitude}`)
    );
    callback();
  });
});

server.listen(port);
