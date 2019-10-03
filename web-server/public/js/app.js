import Speech from "speak-tts";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const speachButton = document.querySelector("#speak");


//for speach
const speech = new Speech(); // will throw an exception if not browser supported

speech.init({
  volume: 1,
  lang: "en-GB",
  rate: 1,
  pitch: 1,
  voice: "Google UK English Male",
  splitSentences: true,
  listeners: {
    onvoiceschanged: voices => {
      console.log("Event voiceschanged", voices);
    }
  }
});

//speachButton.style.display = "none";
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  //speachButton.style.display = "none";
  fetch("/weather?address=" + search.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = "";
        return (messageTwo.textContent = data.error);
      }
      messageTwo.textContent = data.forecast;
      messageOne.textContent = data.location;
      speachButton.style.display = "block";
    });
  });
});


speachButton.addEventListener("click", e => {
  e.preventDefault();
  speech
    .speak({
      text: messageTwo.textContent
    })
    .then(() => {
      console.log("Success !");
    })
    .catch(e => {
      console.error("An error occurred :", e);
    });
  console.log("clicked!");
});
