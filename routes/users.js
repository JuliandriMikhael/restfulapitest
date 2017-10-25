'use strict'

const express = require('express');
const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checker = require('../helpers/checker');


/* GET users listing. */
router.post('/register', function(req, res, next){ // ini untuk register user di dalam postman dengan email

  let email = req.body.email;
  let password = req.body.password;
  let retypepassword = req.body.retypepassword;


  if (!(email && password && retypepassword)) {
    return res.json({success: false, message: 'authenticate failed. make sure you input the email and password'});
  }else if (password != retypepassword) {
    return res.json({success: false, message: 'authenticate failed. make sure you input the email and password'})
  }

  var user = new User({
    email: email,
    password: password
  })
  user.save(function(err) {
    if (err) throw err;
    console.log(user, 'data');
      let token = jwt.sign({id: user._id, email: user.email}, config.secretkey, {
        expiresIn: 86400
      })
      res.json({ //hasil yang di tampilkan oleh json berbentuk objek
        data: {email: user.email},
        token: token
      })
  })
})

  router.post('/login', function(req, res, next) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (user != user){
        res.json({success: false, meesage: 'auhenctication failed. User not found'})
      }else if (user) {
        if(user.password != req.body.password){
          res.json({success: false, message: 'auth failed. password is not match'})
        }else {
          let token = jwt.sign({
            _id: user._id,
            email: user.email}, config.secretkey,{
              expiresIn: 86400
            })
            res.json({
              success: true,
              data: {email:user.email},
              token:token
            })
         }
      }

    })
  }); //fungsi login

  router.post('/check', function(req, res, next){
  let token = req.body.token || req.param('token') || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, config.secretkey, function(err, hash){
      if (err) {
        res.json({succes: false, message: "failed to authencticate token"})
      }else {
        res.json({
          valid: true
        });
      }
    })
  }else {
    return res.status(403).send({
      valid: false,
      message: 'no token provided' 
    })
  }
})

module.exports = router;
