var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setup', function(req, res){
  var mikha = new User({
    username: "mikha",
    password: '1234'
  })
  mikha.save(function(err) {
    if (err) throw err;
      console.log('user saved successfully');
      res.json({success: true})
  })
})

module.exports = router;
