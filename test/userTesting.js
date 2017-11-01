'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../app');
const User = require('../models/user');
const config = require('../config');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function() {
  User.collection.drop();

  beforeEach(function(done){
    let user = new User({
      email: "a@gmail.com",
      password: '1234'

    });
    let token = jwt.sign({id: user._id, email: user.email}, config.secretkey, {
      expiresIn: 86400
    })
    user.token = token
    user.save(function(err){
      done();
    })
  })

  afterEach(function(done) {
    User.collection.drop();
    done();
    })

    it('Should register a SINGLE user on users/register POST', function(done){
    chai.request(server)
    .post('/users/register')
    .send({'email': "a@gmail.com", 'password': '1234', "retypepassword": '1234'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.json;
      res.body.should.be.a("object");
      res.body.data.should.have.property('_id');
      res.body.data.should.have.property('email');
      res.body.data.email.should.equal("a@gmail.com");
      done();
    })
})

  it('should login using the token provided on users/login POST', (done) => {
    
  })

})
