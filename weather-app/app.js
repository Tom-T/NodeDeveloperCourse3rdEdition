const chalk = require("chalk");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// const url =
//   "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/37.8267,-122.4233?units=us";

// const locationUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHRpamVyaW5hIiwiYSI6ImNrMTljODRkbzA5ZzEzZG50OWpqZzRiZWMifQ.2AlOEN_CcB0rKyuGb9NTaw&limit=1";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log(chalk.red("Unable to connect to weather service!"));
//   } else if (response.body.error) {
//     console.log(chalk.red("Unable to find location"));
//   } else {
//     //console.log(response)
//     temp = response.body.currently.temperature;
//     rain = response.body.currently.precipProbability;
//     returnString = "It is currently ";
//     if (temp >= 90) {
//       returnString += chalk.red(temp);
//     } else if (temp >= 70) {
//       returnString += chalk.green(temp);
//     } else {
//       returnString += chalk.blue(temp);
//     }

//     returnString += " degrees out. There is a ";

//     if (rain >= 60) {
//       returnString += chalk.red(rain);
//     } else if (rain >= 20) {
//       returnString += chalk.yellow(rain);
//     } else {
//       returnString += chalk.green(rain);
//     }

//     returnString += " chance of rain.";
//     console.log(returnString);
//   }
// });

// request({ url: locationUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log(chalk.red("Unable to connect to location services!"));
//   } else if (response.body.features.length) {
//     console.log(
//       "City: "+
//       response.body.features[0].place_name +
//       " \n\tLat: " +
//         response.body.features[0].center[1] +
//         "\n\tLon: " +
//         response.body.features[0].center[0]
//     );
//   } else {
//     console.log(chalk.red("Address not found!"));
//   }
// });

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })

// geocode("Tampa", (error, data) => {
//   if (error) {
//     console.log(chalk.red(error));
//   } else {
//     console.log(
//       data.location +
//         "\n\t Lat:" +
//         data.latitude +
//         " and Long:" +
//         data.longitude
//     );
//   }
// });

geocode("Tampa", (error, data) => {
  if (error) {
    console.log(chalk.red(error));
  } else {
    forecast(data.longitude, data.latitude, (forecasterror, forecastdata) => {
      console.log("Error", forecasterror);
      console.log("Location name: ", data.location);
      console.log("Data", forecastdata.currently.summary);
    });
  }
});
