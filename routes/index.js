var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel
const pageLimit = 20
const Op = require('sequelize').Op


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

  let offset = 0;
  if (req.query.page) {
    offset = (req.query.page - 1) * pageLimit
  }

  if (req.query.keyword) {
    let keywordQuery = req.query.keyword

    return Vessel.findAndCountAll({
      offset: offset, limit: pageLimit, order: [['teu', 'ASC']], where: { name: { [Op.like]: '%' + keywordQuery + '%' } }
    }).then(results => {
      let page = Number(req.query.page) || 1;
      let pages = Math.ceil(results.count / pageLimit);
      let totalPage = Array.from({ length: pages }).map((item, index) => index + 1);
      let prev = page - 1 < 1 ? 1 : page - 1;
      let next = page + 1 > pages ? pages : page + 1;

      const vessels = results.rows.map(r => ({
        ...r.dataValues,
      }))


      res.render('positionList', {
        vessels: vessels,
        page: page,
        totalPage: totalPage,
        prev: prev,
        next: next
      });
    })
  }
  return Vessel.findAndCountAll({
    offset: offset, limit: pageLimit, order: [['teu', 'ASC']]
  }).then(results => {
    let page = Number(req.query.page) || 1;
    let pages = Math.ceil(results.count / pageLimit);
    let totalPage = Array.from({ length: pages }).map((item, index) => index + 1);
    let prev = page - 1 < 1 ? 1 : page - 1;
    let next = page + 1 > pages ? pages : page + 1;

    const vessels = results.rows.map(r => ({
      ...r.dataValues,
    }))


    res.render('positionList', {
      vessels: vessels,
      page: page,
      totalPage: totalPage,
      prev: prev,
      next: next
    });
  })
})

router.get('/vessels/:id', function (req, res, next) {
  const vesselId = Number(req.params.id)

  Vessel.findByPk(vesselId).then(vessel => {
    res.render('vessel', { vessel });

  })
})


module.exports = router;
