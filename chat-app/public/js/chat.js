const socket = io();
socket.on("message", message => {
  console.log(message);
  const p = document.createElement("p");
  p.innerText = message;
  document.getElementById("chatText").appendChild(p);
});

document.getElementById("chatSend").addEventListener("click", function() {
  socket.emit("message", document.getElementById("chatSendText").value);
  document.getElementById("chatSendText").value = "";
});

// socket.on("countUpdated", (count) => {
// console.log("The count has been updated! ", count)
// })

// document.querySelector("#increment").addEventListener("click", () => {
// console.log("Clicked")
// socket.emit("increment")
// } )
