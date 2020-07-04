var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/introduction', function (req, res, next) {
  res.render('introduction');
})

router.get('/services', function (req, res, next) {
  res.render('services');
})

module.exports = router;
