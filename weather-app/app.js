const chalk = require("chalk");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// geocode("Tampa", (error, data) => {
//   if (error) {
//     return console.log(chalk.red(error));
//   }

//   forecast(data.longitude, data.latitude, (error, forecastdata) => {
//     if (error) {
//       return console.log(chalk.red(error));
//     }
//     console.log("Location name: ", data.location);
//     console.log("Data", forecastdata);
//   });
// });

if (process.argv.length > 2) {
  // console.log(process.argv.splice(2).toString());
  geocode(process.argv.splice(2), (error, data) => {
    if (error) {
      return console.log(chalk.red(error));
    }

    forecast(data.longitude, data.latitude, (error, forecastdata) => {
      if (error) {
        return console.log(chalk.red(error));
      }
      console.log("Location name: ", data.location);
      console.log("Data", forecastdata);
    });
  });
} else {
  console.log("Please provide a location!")
}
