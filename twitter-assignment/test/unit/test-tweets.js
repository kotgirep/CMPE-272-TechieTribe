let express = require("express");
// let tweets = require("../../routes/tweets");
let chai = require("chai");
let should = chai.should();
let expect = chai.expect;
let server = require("../../app");

describe("CreateTweetTest", function () {
  it("should return 200 if create tweet is successful", (done) => {
    let ts = new Date().getTime();
    let tweet_data = "testing create-tweet-API created at: " + ts;
    let tweet_this = { tweet_message: tweet_data };
    chai
      .request(server)
      .post("/tweets/create/")
      .send(tweet_this)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
