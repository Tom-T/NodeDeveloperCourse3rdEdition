const socket = io();
socket.on("message", message => {
  console.log(message);
  const p = document.createElement("p");
  p.innerText = message;
  document.getElementById("chatText").appendChild(p);
});

document.getElementById("chatSend").addEventListener("click", function() {
  socket.emit("sendMessage", document.getElementById("chatSendText").value, error => {
    if (error) {
      return alert(error);
    }
    document.getElementById("chatSendText").value = "";
  });
});

document.querySelector("#send-location").addEventListener("click", e => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", { latitude: position.coords.latitude, longitude: position.coords.longitude }, () =>{
      alert("Location shared!")

    });
  });
});
