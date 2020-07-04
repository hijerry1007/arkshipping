var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel

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

router.get('/market', function (req, res, next) {
  res.render('market');
})

router.get('/team', function (req, res, next) {
  res.render('team');
})

router.get('/positionlist', function (req, res, next) {

  return Vessel.findAll().then((vessels) => {
    console.log(vessels)
    res.render('positionList', { vessels });
  })
})

router.get('/vessels/:imo', function (req, res, next) {
  const imo = req.params.imo
  res.render('vessel', { imo: imo });
})


module.exports = router;
