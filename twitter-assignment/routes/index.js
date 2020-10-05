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

/* Search tweet associated with the given 'search word' and 'count' - returns the no of tweets based on count
 req content-type: JSON
Author: Supriya Meduri */


function searchTweet(req, res, next) {

    var searchKey = req.body.search_message
    var countNo = req.body.search_count;
    let params = {
        q: searchKey,
        count: countNo
    };

    client.get('search/tweets', params, function (error, tweet, response) {
        if (error) {
            console.log("Unable to find the tweet with search word and count ! Error:" + JSON.stringify(error));
            res.status(404).json({
                error: 'Unable to find the tweet !'
            });
        } else {
            console.log('Tweet(s) found !')
            res.status(200).json(tweet)
        }

        return next();
    });

};


//Changed to post by (Priti Sharma)
router.post('/search', searchTweet);

/*This is to get the current user tweets:
Author: Priti Sharma*/
function liveStream(req, res, next) {
    var noOfTweets = 100;
    var screenName = process.env.TWITTER_SCREEN_NAME;
    let params = {
        screen_name: screenName,
        count: noOfTweets
    };
    client.get('statuses/user_timeline', params, function (error, tweet, response) {
        if (error) {
            console.log("Unable to find the user ! Error:" + JSON.stringify(error));
            res.status(404).json({
                error: 'Unable to find the tweet !'
            });
        } else {
            console.log('user found !')
            res.status(200).json(tweet)
        }
  	console.log(tweet);
        return next();
    });
};
router.get('/list', liveStream);
/*End Change*/

module.exports = router;
module.exports.searchTweet = searchTweet;

