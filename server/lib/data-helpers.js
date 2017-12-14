  "use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.connect(MONGODB_URI, (err,database) => {
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }
        // console.log("good");
        database.collection("tweets").insertOne(newTweet);
        // console.log(database);
        callback(null, true);
      });
    },

    getTweets: function(callback) {
      db.connect(MONGODB_URI, (err,database) => {
        // console.log("open db");
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }

        database.collection("tweets").find().toArray((err, results) => {
          // console.log("get it ");
          // console.log(results);
          callback(null, results);
          database.close();
          // console.log("close db");
        });
      });
    }
  };
}
