console.log("Client side javascript loaded.");

fetch("/weather?address=boston").then(response => {
  response.json().then(data => {
    if (data.error) {
      return console.log(data.error);
    }
    console.log("Location: " + data.location + "\nForecast" + data.forecast);
  });
});
