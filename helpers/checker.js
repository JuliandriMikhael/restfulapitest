'use strict'

const jwt = require('jsonwebtoken') //penyedia token otomatis untuk di postman
const config = require('../config')

module.exports = function(req, res, next){ //ini diambil dari si checker
  let token = req.body.token || req.param('token') || req.headers['x-access-token']; //x token digunaakan sbgai header di postman untuk authentikasi
  if(token){
    jwt.verify(token, config.secretkey, function(err, decoded){ //ini dipake buar verifikasi si ceker itu
      if (err) {
        return res.json({success: false, message: 'failed to authenticate token'}); // ini message kalo ga jalan tokennya
      }else {
        //req.decoded = decoded; // ini kalo jalan
        next(); //?
      }
    })
  }else {
    return res.status(403).send({
      success: false,
      message: 'no token provided' // ini kalo tokennya ga ada
    })
  }
}

// helpers ini di bikin buat mempermudah contohnya kaya destroy session/token yang ada di soal 30 untuk berikutnya helpernya beda lagi
