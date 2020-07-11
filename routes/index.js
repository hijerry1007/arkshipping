var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel
const Charterer = db.Charterer
const Fixture = db.Fixture
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

  return Vessel.findByPk(vesselId, {
    include: [
      { model: Fixture, include: [Charterer] }
    ]
  }).then(vessel => {

    fixtures = vessel.toJSON().Fixtures.map(fixture => ({
      ...fixture
    }))

    fixtures = fixtures.sort((a, b) => {
      return Date.parse(b.minPeriod) - Date.parse(a.minPeriod)
    }).map(fixture => ({
      ...fixture,
      begDate: `${fixture.minPeriod.slice(5, 7)}/${fixture.minPeriod.slice(0, 4)}`,
      endDate: `${fixture.maxPeriod.slice(5, 7)}/${fixture.maxPeriod.slice(0, 4)}`
    }))

    const timeSheetColor = ['lorem', 'default', 'ipsum', 'dolor']
    let data = []
    const fixtureLength = fixtures.length
    // let timeSheetData = []
    for (let i = 0; i < fixtures.length; i++) {
      let randomNumber = Math.floor(Math.random() * 4)
      data.push({ begDate: `${fixtures[i].begDate}`, endDate: `${fixtures[i].endDate}`, charterer: `${fixtures[i].Charterer.name}`, color: timeSheetColor[randomNumber] })
      // data.push(`${fixtures[i].endDate}`)
      // data.push(`${fixtures[i].Charterer.name}`)
      // data.push(timeSheetColor[randomNumber])
      // timeSheetData.push(data)
    }

    // const timeSheet = {
    //   timeSheetData: timeSheetData
    // }
    console.log(data)
    res.render('vessel', { vessel: vessel.toJSON(), data });
  })
})


module.exports = router;
