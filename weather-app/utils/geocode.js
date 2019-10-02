const request = require("request");

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

module.exports = geocode