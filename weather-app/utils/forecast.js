const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?units=us";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
