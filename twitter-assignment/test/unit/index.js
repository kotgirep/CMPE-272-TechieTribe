let nock = require('nock');
let Twitter = require('twitter');
let httpMocks = require('node-mocks-http');
let express = require("express");
let index = require('../../routes/index');
let chai = require('chai')
let should = chai.should()
let expect = chai.expect
const mock = require('./service-mock')

/*[GET] Unit Test for search functionality
 By: Supriya Meduri
 */

describe('SearchTweet', function () {
    it('should return 200 if search is successful', done => {
        var request = httpMocks.createRequest({
            body: {
                q: "Biden",
                count: "1"

            }
        });
        // Ref: https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js#L27
        var response = httpMocks.createResponse();

        const scope = nock('https://api.twitter.com/1.1')
            .get('/search/tweets.json')
            .reply(200, mock)
        ;

        index.searchTweet(request, response, function () {
            expect(response.statusCode).to.equal(200);
            expect(response._getJSONData().statuses.length).to.equal(1);
            done();
        });


    })

    it('should return 404 if search fails', done => {
        var request = httpMocks.createRequest({
            body: {
                q: "Biden",
                count: "1"

            }
        });
        var response = httpMocks.createResponse();

        // Ref: https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js#L27
        const scope = nock('https://api.twitter.com/1.1')
            .get('/search/tweets.json')
            .reply(404, {
                message: "No tweet found with search key word."
            })
        ;


        index.searchTweet(request, response, function () {
            expect(response.statusCode).to.equal(404);
            expect(response._getJSONData().error).to.equal('Unable to find the tweet !');
            done();
        });
    })

});