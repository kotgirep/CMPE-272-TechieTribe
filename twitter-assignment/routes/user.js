var express = require("express");
var router = express.Router();
var request = require("request");
var Twitter = require("twitter");

require('dotenv').config();
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/* Deletes tweet associated with the given tweetid. */
// content-type: JSON
router.delete('/tweet/', function(req, res, next) {
  var tweetid = req.body.tweetid;
  console.log("Calling twitter delete api for id: " + tweetid);
  client.post("statuses/destroy/" + tweetid, function (error, tweet, response) {
    if (error) {
      console.log("Unable to delete tweet for id: " +tweetid + ". Error: " + JSON.stringify(error));
      res.send("Unable to delete tweet!");
    } else {
      //console.log(tweet);
      res.send("Deleted tweet successfully!");
    }
  });
});

module.exports = router;
