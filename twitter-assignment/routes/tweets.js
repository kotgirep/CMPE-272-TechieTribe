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

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("this is tweets end-point !!");
});

/*[POST] To create a tweet or update status */
// req content-type: JSON
router.post("/create/", function (req, res, next) {
  var status_message = req.body.tweet_message;
  console.log("trying to print request body: ");
  console.log(req.body);
  client.post("statuses/update", { status: status_message }, function (
    error,
    tweet,
    response
  ) {
    if (error) throw error;
    console.log(tweet.id);
    console.log(tweet.id_str);
    console.log(tweet.text);
    //console.log(tweet); // Tweet body.
    //console.log(response); // Raw response object.
  });
  res.send("successfully posted tweet");
});

/*[POST] To do a re-tweet */
router.post("/:tweetId", function (req, res, next) {
  var tweetId = req.params["tweetId"];
  console.log("tweet ID of tweet to re-tweet: ");
  console.log(tweetId);

  client.post("statuses/retweet/" + tweetId, function (error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });
});

module.exports = router;
