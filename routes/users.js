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
    })
  }); //fungsi login

module.exports = router;
