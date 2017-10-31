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

//read
router.get('/browse', function(req, res){
  Data.findOne({
    letter:"A"
  }, function(err, data) {
    if (err) throw err;
    res.json({
      data:{
      _id: data._id,
      letter: data.letter,
      frequency: 1.1}
    })
  })
})

//edit
router.put('/edit/:_id', function(req, res){ // edit by id using params
  Data.findById(req.params._id, function(err, data) {
    if (err) throw err;
    data.letter = req.body.letter;
    data.frequency = req.body.frequency;
    data.save(function(err, data){
      if (err) {
        res.json({"ERROR": err})
      }else {
        res.json({
          success: true,
          message: "data have been updated",
          data:data
        })
      }
    })
  })
  })

  //add
  router.post('/add', function(req, res){ // ini itu cuma percobaan alias prototype
    console.log(req.body.letter);
    var data = new Data({ //router untuk setup dan login si user
       letter: req.body.letter,
       frequency: req.body.frequency
    })
    data.save(function(err, data){
      if (err) throw err;
        console.log('User saved succesfully'); // ini fungsi kalo dia bisa login dan ngirim pesan
