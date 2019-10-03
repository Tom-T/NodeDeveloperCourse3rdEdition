const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define paths for Express
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve.
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tom"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "The help message",
    name: "Tom"
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    name: "Tom"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Tom"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided." });
  }
  geocode(req.query.address, (error, { longitude, latitude, location }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
        address: req.query.address
      });
    });
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "No search string provided!" });
  }

  const value = req.query;
  res.send({
    products: [],
    value
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found.",
    name: "Tom"
  });
});

app.listen(3000, () => console.log("Server is up on port 3000!"));
