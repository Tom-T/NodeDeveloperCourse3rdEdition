const https = require("https");

const url =
  "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/40,-70";

const request = https.request(url, response => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk.toString();
  });
  response.on("end", () => {
    console.log(JSON.parse(data))
  });
});

request.on("error", (error) =>{
  console.log("An error: " + error)
})
request.end()
