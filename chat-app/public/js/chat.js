const $locationButton = document.querySelector("#send-location");
const $chatSendButton = document.querySelector("#chatSend");
const $chatText = document.querySelector("#chatSendText");
const $chatWindow = document.querySelector("#chatText");

const $messages = document.querySelector("#messages");

// Templates
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $locationMessageTemplate = document.querySelector("#locationMessage-template").innerHTML;

const socket = io();

// socket.on("message", message => {
//   let isScrolledToBottom = $chatWindow.scrollHeight - $chatWindow.clientHeight <= $chatWindow.scrollTop + 1;
//   const p = document.createElement("p");
//   p.innerText = message;
//   $chatWindow.appendChild(p);
//   if (isScrolledToBottom) {
//     $chatWindow.scrollTop = $chatWindow.scrollHeight - $chatWindow.clientHeight;
//   }
// });

socket.on("message", message => {
  const html = Mustache.render($messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML("beforeend", html)

})

socket.on("locationMessage", link => {
  console.log("here" + link)
  const html = Mustache.render($locationMessageTemplate, {
    link
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$chatSendButton.addEventListener("click", () => {
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
