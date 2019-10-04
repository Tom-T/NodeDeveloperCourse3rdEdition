// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to DB");
  }
  const db = client.db(databaseName);

  // db.collection("users").findOne({ _id: new ObjectID("5d973995ddd12c2bc79c2dc9") }, (error, user) => {
  //   if (error) {
  //     return console.log("unable to fetch");
  //   }

  //   console.log(user);
  // });

  db.collection("tasks").findOne({}, { sort: [["_id", "desc"]], limit: 1 }, (error, task) => {
    if (error) {
      return console.log("unable to fetch");
    }
    console.log(task);
  });
  console.log("Unfinished tasks:");
  db.collection("tasks")
    .find({ completed: false })
    .toArray((error, tasks) => {
      tasks.forEach(task => {
        console.log(task);
      });
    });
});
