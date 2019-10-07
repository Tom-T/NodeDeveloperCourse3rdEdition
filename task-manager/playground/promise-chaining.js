require("../src/db/mongoose");
const User = require("../src/models/user");

// 5d9768a03189bf6975857879

// User.findByIdAndUpdate("5d978aecaccc411044e1cd3b", { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(count => {
//     console.log(count);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5d9768a03189bf6975857879", 2)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
