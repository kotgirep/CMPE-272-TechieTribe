var express = require("express");
var router = express.Router();
var request = require("request");
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: "",
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("this is tweets end-point !!");
});

/*[POST] To create a tweet or update status */
router.post("/", function (req, res, next) {
  var status_message = req.body.tweet_message;
  console.log("trying to print request body: ");
  console.log(status_message);
  client.post("statuses/update", { status: status_message }, function (
    error,
    tweet,
    response
  ) {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });
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

/*[DELETE] To do delete a tweet */
router.delete("/:tweet_id", function (req, res, next) {
  var tweet_to_delete = req.params["tweet_id"];
  console.log("trying to print tweet ID of tweet to delete: ");
  console.log(tweet_to_delete);

  //To-Do: add a method to perform deletion of a tweet
});

module.exports = router;
