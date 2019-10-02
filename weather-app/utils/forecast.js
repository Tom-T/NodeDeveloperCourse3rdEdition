const request = require("request");
const chalk = require("chalk");

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
      //callback(undefined, response.body);
      returnString = "It is currently ";
      temp = response.body.currently.temperature;
      rain = response.body.currently.precipProbability;
      if (temp >= 90) {
        returnString += chalk.red(temp);
      } else if (temp >= 70) {
        returnString += chalk.green(temp);
      } else {
        returnString += chalk.blue(temp);
      }

      returnString += " degrees out. There is a ";

      if (rain >= 60) {
        returnString += chalk.red(rain);
      } else if (rain >= 20) {
        returnString += chalk.yellow(rain);
      } else {
        returnString += chalk.green(rain);
      }

      returnString += " chance of rain.";

      callback(undefined, returnString);
    }
  });
};

module.exports = forecast;
