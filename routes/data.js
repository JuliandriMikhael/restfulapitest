'use strict'

const express = require('express');
const router = express.Router();
const Data = require("../models/data")

router.post('/input', function(req, res){ 
  console.log(req.body.letter);
  var data = new Data({
     letter: req.body.letter,
     frequency: req.body.frequency
  })
