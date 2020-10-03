//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)
var tweet = null

describe('UserTweet', () => {
    it('create a tweet', done => {
        let tweetText = 'Sample tweet!'
        chai.request(server)
          .post(`/tweets/create/`)
          .set('content-type', 'application/json')
          .send({tweet_message: tweetText})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            expect(res.body.id_str).to.not.be.empty;
            res.body.text.should.be.eql(tweetText)
            tweet = res.body
            done()
          })
      })

    it('delete a tweet', done => {
        chai.request(server)
          .delete(`/user/tweet/`)
          .set('content-type', 'application/json')
          .send({tweetid: tweet.id_str})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            expect(res.body.message).to.equal('Successfully deleted tweet!');
            done()
          })
      })
})