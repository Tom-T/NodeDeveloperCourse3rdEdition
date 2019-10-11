const $locationButton = document.querySelector("#send-location");
const $chatSendButton = document.getElementById("chatSend");
const $chatText = document.getElementById("chatSendText");
const $chatWindow = document.getElementById("chatText");

const socket = io();

socket.on("message", message => {
  let isScrolledToBottom = $chatWindow.scrollHeight - $chatWindow.clientHeight <= $chatWindow.scrollTop + 1;
  const p = document.createElement("p");
  p.innerText = message;
  $chatWindow.appendChild(p);
  if (isScrolledToBottom) {
    $chatWindow.scrollTop = $chatWindow.scrollHeight - $chatWindow.clientHeight;
  }
});

$chatSendButton.addEventListener("click", function() {
  $chatSendButton.setAttribute("disabled", "disabled");
  socket.emit("sendMessage", $chatText.value, error => {
    $chatSendButton.removeAttribute("disabled");
    $chatText.value = "";
    $chatText.focus();
    if (error) {
      return alert(error);
    }
  });
});

$locationButton.addEventListener("click", e => {
  $locationButton.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", { latitude: position.coords.latitude, longitude: position.coords.longitude }, () => {
      alert("Location shared!");
      $locationButton.removeAttribute("disabled");
    });
  });
});
