  "use strict";

  const { ObjectId } = require('mongodb');

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
        database.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },

    // Likes a tweet and if tweet is alredy liked clicking it should do the reverse
    likeTweet: function(ID_HERE, callback) {
      db.connect(MONGODB_URI, (err, database) =>{
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }

        if (ID_HERE.state === 'false') {
          database.collection('tweets').updateOne(
          { _id: ObjectId(ID_HERE.id) },

          {
            $inc: {likes: 1},
            $set: {state: 'true'}
          },

          () => {
            database.collection("tweets").find().toArray((err, results) => {
              callback(null, results);
              database.close();
            });
          })
        } else {
          database.collection('tweets').updateOne(
            { _id: ObjectId(ID_HERE.id) },

            {
              $inc: {likes: -1},
              $set: {state: 'false'}
            },

            () => {
              database.collection("tweets").find().toArray((err, results) => {
                callback(null, results);
                database.close();
              });
          })
        }
      })
    },

    // Load existing tweets
    getTweets: function(callback) {
      db.connect(MONGODB_URI, (err,database) => {
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }

        database.collection("tweets").find().toArray((err, results) => {

          callback(null, results);
          database.close();
        });
      });
    }
  };
}
