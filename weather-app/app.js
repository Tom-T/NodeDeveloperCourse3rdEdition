const chalk = require("chalk");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (process.argv.length > 2) {
  process.argv.splice(2).forEach(location => {
    geocode(location, (error, {longitude, latitude, location}) => {
      if (error) {
        return console.log(chalk.red(error));
      }

      forecast(longitude, latitude, (error, forecastdata) => {
        if (error) {
          return console.log(chalk.red(error));
        }
        console.log("Location name: ", location);
        console.log("Data", forecastdata);
      });
    });
  });
} else {
  console.log("Please provide a location!");
}
