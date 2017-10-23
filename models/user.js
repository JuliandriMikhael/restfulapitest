"use strict"

const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({ //ini buat store database ke mongodb
  email: String,
  password: String
}))
