require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5d97a0e6249f9433623efef9")
//   .then(task => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then(count => console.log(count + " remaining."))
//   .catch(e => console.log(e));

deleteTaskAndCount = async id => {
  const removedTask = await Task.findByIdAndDelete(id);
  const remainingTasks = await Task.countDocuments({ completed: false });
  return remainingTasks;
};

deleteTaskAndCount("5d97a0e6249f9433623efef9")
  .then(task => {
    console.log("Task:", task);
  })
  .catch(e => console.log("e: ", e));
