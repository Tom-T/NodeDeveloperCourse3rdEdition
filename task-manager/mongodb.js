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

  // db.collection("tasks")
  //   .updateMany({},{
  //     $set: {
  //       completed: true
  //     }
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  db.collection("tasks")
    .deleteOne({ description: "This is the first completed task." })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
});
