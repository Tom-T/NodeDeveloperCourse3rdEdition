const socket = io();
socket.on("message", message => {
  console.log(message);
  const p = document.createElement("p");
  p.innerText = message;
  document.getElementById("chatText").appendChild(p);
});

document.getElementById("chatSend").addEventListener("click", function() {
  socket.emit("sendMessage", document.getElementById("chatSendText").value);
  document.getElementById("chatSendText").value = "";
});
document.querySelector("#send-location").addEventListener("click", e => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    socket.emit("sendLocation", position.coords.latitude, position.coords.longitude);
  });
});
