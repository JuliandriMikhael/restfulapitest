'use strict'

const express = require('express');
const router = express.Router();
const Data = require("../models/data")

router.post('/input', function(req, res){ // ini itu cuma percobaan alias prototype
  console.log(req.body.letter);
  var data = new Data({ //router untuk setup dan login si user
     letter: req.body.letter,
     frequency: req.body.frequency
  })
