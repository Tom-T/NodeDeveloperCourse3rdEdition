const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model("user", {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const Task = mongoose.model("task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const task1 = new Task({
  description: "Learn to program",
  completed: false
})
task1
  .save()
  .finally(() => {
    console.log("When does this run?");
  })
  .then(() => {
    console.log("Saved!");
  })
  .catch(e => {
    console.log("Error: ", e);
  })
  .finally(() => {
    console.log("When does this run?2");
  })
  .then(() => {
    console.log("Saved!");
  });

// const me = new User({
//   name: "Mike",
//   age: "asdfasdf"
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log("Error! ", error);
//   });
