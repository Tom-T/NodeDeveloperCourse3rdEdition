const express = require("express");
const path = require("path")

const publicPath = path.join(__dirname, "../public");
const app = express();

app.use(express.static(publicPath));


app.get("/weather", (req, res) => {
  res.send({
    forecast: "40",
    location: "Tampa"
  })
});


app.listen(3000, () => console.log("Server is up on port 3000!"));
