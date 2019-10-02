const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidHRpamVyaW5hIiwiYSI6ImNrMTljODRkbzA5ZzEzZG50OWpqZzRiZWMifQ.2AlOEN_CcB0rKyuGb9NTaw&limit=1";

  request(
    { url, json: true },
    (
      error,
      {
        body: {
          features: {
            0: {
              place_name: location,
              center: { 1: latitude, 0: longitude }
            }
          }
        }
      }
    ) => {
      if (error) {
        callback("Unable to connect to location services!");
      } else if (location.length) {
        callback(undefined, {
          location,
          latitude,
          longitude
        });
      } else {
        callback("Address not found!");
      }
    }
  );
};

module.exports = geocode;
