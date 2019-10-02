const request = require("request");
const chalk = require("chalk");

const url =
  "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/37.8267,-122.4233";

request({ url: url, json: true }, (error, response) => {
  //console.log(response)
  temp = response.body.currently.temperature;
  rain = response.body.currently.precipProbability;
  returnString = "It is currently ";
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
  console.log(returnString);
});
