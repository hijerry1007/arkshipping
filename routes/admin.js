var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/postVessel', function (req, res, next) {
  res.render('postVessel');
});

module.exports = router;
