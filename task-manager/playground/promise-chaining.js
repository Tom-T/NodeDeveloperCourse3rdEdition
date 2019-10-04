require("../src/db/mongoose");
const User = require("../src/models/user");

// 5d9768a03189bf6975857879

User.findByIdAndUpdate("5d978aecaccc411044e1cd3b", { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
