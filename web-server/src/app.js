const express = require("express");
const path = require("path");
const hbs = require("hbs");

const publicPath = path.join(__dirname, "../public");
const app = express();

app.set("view engine", "hbs");

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tom"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "The help message"
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
