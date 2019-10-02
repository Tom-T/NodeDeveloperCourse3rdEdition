const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Define paths for Express
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath)

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
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Tom"
  });
});
app.get("/weather", (req, res) => {
  res.send({
    forecast: "40",
    location: "Tampa"
  });
});

app.listen(3000, () => console.log("Server is up on port 3000!"));
