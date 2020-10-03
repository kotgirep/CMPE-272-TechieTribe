let nock = require('nock');
let Twitter = require('twitter');
let httpMocks = require('node-mocks-http');
let express = require("express");
let user = require('../../routes/user');
let chai = require('chai')
let should = chai.should()
let expect = chai.expect

describe('UserTweet', function() {
    it('should return 200 if delete is successful', done => {
        var request = httpMocks.createRequest({
            body: {
                tweetid: "1235473"
            }
        });
        var response = httpMocks.createResponse();

        // Ref: https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js#L27
        const scope = nock('https://api.twitter.com/1.1')
            .post('/statuses/destroy/1235473.json')
            .reply(200, {}) // ideally, reply from twitter should also contain the tweet object.
            ;

        // anonymous function with done() instruction, should be send as "next".
        user.deleteTweetHandler(request, response, function () {
            expect(response.statusCode).to.equal(200);
            expect(response._getJSONData().message).to.equal('Successfully deleted tweet!');
            done();
        });
    })

    it('should return 404 if delete fails', done => {
        var request = httpMocks.createRequest({
            body: {
                tweetid: "1235473"
            }
        });
        var response = httpMocks.createResponse();

        // Ref: https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js#L27
        const scope = nock('https://api.twitter.com/1.1')
            .post('/statuses/destroy/1235473.json')
            .reply(404, {
                message: "No status found with that ID."
            }) // ideally, reply from twitter should also contain the tweet object.
            ;

        // anonymous function with done() instruction, should be send as "next".
        user.deleteTweetHandler(request, response, function () {
            expect(response.statusCode).to.equal(404);
            expect(response._getJSONData().error).to.equal('Unable to find tweet!');
            done();
        });
    })

});