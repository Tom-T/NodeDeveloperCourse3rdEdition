console.log("Client side javascript loaded.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  fetch("/weather?address=" + search.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = ""
        return messageTwo.textContent = data.error;
      }
      messageTwo.textContent = "Location: " + data.location + "\nForecast " + data.forecast;
      messageOne.textContent = "";
    });
  });
});
