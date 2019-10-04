require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5d97a0e6249f9433623efef9")
  .then(task => {
    return Task.countDocuments({ completed: false });
  })
  .then(count => console.log(count + " remaining."))
  .catch(e => console.log(e));
