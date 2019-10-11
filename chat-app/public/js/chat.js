const $locationButton = document.querySelector("#send-location");
const $chatSendButton = document.querySelector("#chatSend");
const $chatText = document.querySelector("#chatSendText");
const $chatWindow = document.querySelector("#chatText");

const $messages = document.querySelector("#messages");

// Templates
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $locationMessageTemplate = document.querySelector("#locationMessage-template").innerHTML;
const $sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

const socket = io();

socket.on("message", message => {
  const html = Mustache.render($messageTemplate, {
    userName: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render($sidebarTemplate, {
    room,
    users
  });
  document.querySelector("#sidebar").innerHTML = html;
  autoscroll();
});

socket.on("locationMessage", message => {
  const html = Mustache.render($locationMessageTemplate, {
    userName: message.username,
    link: message.url,
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

$chatSendButton.addEventListener("click", () => {
  if ($chatText.value === "") {
    return;
  }
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

socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
