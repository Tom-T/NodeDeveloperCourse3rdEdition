// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require("mongodb");


const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to DB");
  }
  const db = client.db(databaseName);

  // db.collection("users").insertOne(
  //   {
  //     name: "Tom",
  //     age: 37
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert user");
  //     }

  //     console.log(result.ops);
  //   }
  // );

  // db.collection("users").insertMany(
  //   [
  //     {
  //       name: "jan",
  //       age: 28
  //     },
  //     {
  //       name: "Gunther",
  //       age: 23
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert documents");
  //     }

  //     console.log(result.ops);
  //   }
  // );

  // db.collection("tasks").insertMany(
  //   [
  //     {
  //       description: "This is the first completed task.",
  //       completed: true
  //     },
  //     {
  //       description: "This is the second task.",
  //       completed: false
  //     },
  //     {
  //       description: "This another task.",
  //       completed: false
  //     },
  //     {
  //       description: "This finished task.",
  //       completed: true
  //     }
  //   ],
  //   (error, ops) => {
  //     if (error) {
  //       return console.log("Error whlie accessing the DB:\n", error);
  //     }
  //     console.log("Database updated without issues!\n", ops);
  //   }
  // );




});
