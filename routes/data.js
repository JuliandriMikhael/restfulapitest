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
  data.save(function(err){
    if (err) throw err;
      console.log('User saved succesfully'); 
      res.json({
        success: true,
        message: "data has been added",
        data:{
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
  })
})
