const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/8faf1fcb572732ca282d61acc5180cfb/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?units=us";

  request(
    { url, json: true },
    (
      error,
      {
        body: {
          error: locationError,
          currently: { temperature: temp, precipProbability: rain, humidity }
        }
      }
    ) => {
      if (error) {
        callback("Unable to connect to weather service!");
      } else if (locationError) {
        callback("Unable to find location");
      } else {
        //callback(undefined, response.body);
        returnString = "It is currently " + temp + " degrees with " + (humidity*100).toPrecision(2) + "% humidity. There is ";

        rain *= 100;
        if (rain == 0) {
          returnString += "no chance of rain ";
        } else {
          returnString += "a " + rain + "% chance of rain.";
        }

        callback(undefined, returnString);
      }
    }
  );
};

module.exports = forecast;
