const request = require("request");
const chalk = require("chalk");

const url =
  "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/37.8267,-122.4233?units=us";

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

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidHRpamVyaW5hIiwiYSI6ImNrMTljODRkbzA5ZzEzZG50OWpqZzRiZWMifQ.2AlOEN_CcB0rKyuGb9NTaw&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length) {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0]
      });
    } else {
      callback("Address not found!");
    }
  });
};



geocode("Tampa", (error, data) => {
  if (error) {
    console.log(chalk.red(error));
  } else {
    console.log(
      data.location + "\n\t Lat:" + data.latitude + " and Long:" + data.longitude
    );
  }
});
