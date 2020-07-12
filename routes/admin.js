var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel
const Charterer = db.Charterer
const Fixture = db.Fixture


/* GET 新增船舶 */
router.get('/postVessel', function (req, res, next) {
  res.render('postVessel');
});
/*post 新增船舶*/
router.post('/postVessel', function (req, res, next) {
  //check IMONumber
  Vessel.findOne({
    where: { IMONumber: `${req.body.IMONumber}` }
  }).then(vessel => {
    if (vessel) {
      alert(`船舶已存在`)
    } else {
      Vessel.create({
        name: req.body.name,
        IMONumber: req.body.IMONumber,
        blt: req.body.blt,
        type: req.body.type,
        teu: req.body.teu,
        homo: req.body.homo,
        reefer: req.body.reefer,
        dwt: req.body.dwt,
        draft: req.body.draft,
        gear: req.body.gear,
        loa: req.body.loa,
        beam: req.body.beam,
        spdcon: req.body.spdcon,
        place: req.body.place,
        opendate: req.body.opendate
      }).then(vessel => {
        res.redirect('/positionList')
      })
    }

  })
});

// get 編輯position
router.get('/edit/positionlist/:id', function (req, res, next) {
  const vesselId = Number(req.params.id)
  Vessel.findByPk(vesselId).then(vessel => {
    res.render('editVslPosition', { vessel });
  })
})

// post 編輯position
router.post('/edit/positionlist/:id', function (req, res, next) {
  const vesselId = Number(req.params.id)
  Vessel.findByPk(vesselId).then(vessel => {
    vessel.update({
      ...vessel,
      name: req.body.name,
      IMONumber: req.body.IMONumber,
      blt: req.body.blt,
      type: req.body.type,
      teu: req.body.teu,
      homo: req.body.homo,
      reefer: req.body.reefer,
      dwt: req.body.dwt,
      draft: req.body.draft,
      gear: req.body.gear,
      loa: req.body.loa,
      beam: req.body.beam,
      spdcon: req.body.spdcon,
      place: req.body.place,
      opendate: req.body.opendate
    }).then(vessel => {
      res.redirect(`/vessels/${vesselId}`);
    })
  })
})


//get 新增fixture
router.get('/post/fixtures/:id', function (req, res, next) {
  const vesselId = Number(req.params.id)
  Vessel.findByPk(vesselId).then(vessel => {
    vessel = vessel.toJSON()
    Charterer.findAll({ raw: true, nest: true }).then(charterers => {
      res.render('addFixtures', { charterers, vessel });
    })

  })
})

//post 新增fixture
router.post('/post/fixtures', function (req, res, next) {

  Fixture.create({
    ChartererId: req.body.chartererId,
    VesselId: req.body.vesselId,
    minPeriod: req.body.minPeriod,
    maxPeriod: req.body.maxPeriod,
    hire: req.body.hire
  }).then(fixture => {
    res.redirect(`/vessels/${req.body.vesselId}`)

  })
})

//get vessel fixtures
router.get('/vessel/fixtures/:id', function (req, res, next) {
  const vesselId = Number(req.params.id)
  Fixture.findAll({ raw: true, nest: true, where: { vesselId: vesselId }, include: [Charterer, Vessel] }).then(fixtures => {

    vesselName = fixtures[0].Vessel.name
    fixtures = fixtures.map(fixture => ({
      ...fixture,
      charterer: fixture.Charterer.name,
    }))
    res.render('vesselFixtures', { fixtures, vesselName });
  })

})

//get post fixture
router.get('/edit/fixtures/:id', function (req, res, next) {
  return Fixture.findByPk(req.params.id, { raw: true, nest: true, include: [Vessel, Charterer] }).then(fixture => {
    fixture = {
      ...fixture,
      vesselName: fixture.Vessel.name,
      vesselId: fixture.Vessel.id,
      chartererId: fixture.Charterer.id,
      chartererName: fixture.Charterer.name
    }
    Charterer.findAll().then(charterers => {
      res.render('editFixture', { fixture, charterers })
    })
  })
})

//post edit fixture
router.post('/edit/fixtures/:id', function (req, res, next) {
  Fixture.findByPk(req.params.id).then(fixture => {
    console.log(req.body.chartererId)
    fixture.update({
      VesselId: req.body.vesselId,
      ChartererId: req.body.chartererId,
      hire: req.body.hire,
      minPeriod: req.body.minPeriod,
      maxPeriod: req.body.maxPeriod
    }).then(fixture => {
      res.redirect(`/admin/vessel/fixtures/${req.body.vesselId}`)
    })
  })
})

router.get('/post/charterer', function (req, res, next) {
  Charterer.findAll({ raw: true, nest: true }).then(charterers => {
    res.render('postCharterer', { charterers });
  })
})

router.post('/post/charterer', function (req, res, next) {
  const newCharterer = req.body.charterer
  Charterer.findOne({ where: { name: newCharterer } }).then(charterer => {
    if (charterer) {
      console.log('charterer already exits')
      return res.redirect('/admin/post/charterer')
    }

    Charterer.create({
      name: newCharterer
    }).then(charterer => {
      return res.redirect('/admin/post/charterer')
    })

  })
})



module.exports = router;
