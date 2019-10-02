const fs = require("fs");

const filename = "1-json.json";

const data = JSON.parse(fs.readFileSync(filename).toString());
data.name = "Tom T";
data.age = "37";

const dataJSON = JSON.stringify(data);
fs.writeFileSync(filename, dataJSON);
