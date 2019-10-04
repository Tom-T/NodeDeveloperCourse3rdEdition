const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    required: true,
    trim: true,
    type: String,
    validate(value) {
      if (value.length <= 6) {
        throw new Error("Password must contain more then 6 characters");
      } else if (value.includes("password")) {
        throw new Error('Password can\'t contain the word "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  }
});
const user = new User({
  name: "Tom2",
  password: "securepass",
  email: "No@Email.co"
});

user
  .save()
  .then(() => {
    console.log("Record Saved");
  })
  .catch(e => {
    console.log("Error", e);
  });

//   const Task = mongoose.model("task", {
//   description: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   }
// });

// const task1 = new Task({
//   description: "Learn to program",
//   completed: false
// });
// task1
//   .save()
//   .finally(() => {
//     console.log("When does this run?");
//   })
//   .then(() => {
//     console.log("Saved!");
//   })
//   .catch(e => {
//     console.log("Error: ", e);
//   })
//   .finally(() => {
//     console.log("When does this run?2");
//   })
//   .then(() => {
//     console.log("Saved!");
//   });

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
