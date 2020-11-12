let express = require("express");
// let tweets = require("../../routes/tweets");
let chai = require("chai");
let should = chai.should();
let expect = chai.expect;
let server = require("../../app");
let tweet_id_created = null;

describe("CreateTweetTest", function () {
    it("should return 200 if create tweet is successful", (done) => {
        let ts = new Date().getTime();
        let tweet_data = "testing create-tweet-API created at: " + ts;
        let tweet_this = {tweet_message: tweet_data};
        chai
            .request(server)
            .post("/tweets/create/")
            .send(tweet_this)
            .end((err, res) => {
                res.should.have.status(200);
                tweet_id_created = res.body["id_str"];
                done();
            });
    });
});

    it("should return 200 if re-tweet is successful", (done) => {
        let ts = new Date().getTime();
        chai
            .request(server)
            .post("/tweets/" + tweet_id_created)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    /*Unit test for like functionality
    By: Supriya Meduri
    */
    describe("LikeTweet", function () {
    it("Should return 200 if favorite is successful", (done) => {
        let tweet_id_created = {tweetId: '1309312507882795008'};

        chai
            .request(server)
            .post("/tweets/like/" + tweet_id_created.toString())
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
