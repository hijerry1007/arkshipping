var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel
const Charterer = db.Charterer
const Fixture = db.Fixture
const Op = require('sequelize').Op


const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warning_msg', '請先登入才能使用')
  res.redirect('/signin')
}

/* GET 新增船舶 */
router.get('/postVessel', authenticated, function (req, res, next) {
  res.render('postVessel');
});
/*post 新增船舶*/
router.post('/postVessel', authenticated, function (req, res, next) {
  //check IMONumber
  Vessel.findAll({
    where: { [Op.or]: [{ IMONumber: req.body.IMONumber }, { name: req.body.name }] }
  }).then(vessel => {
    if (vessel) {
      req.flash('error_messages', { error_messages: '船舶重複!' })
      res.redirect('/admin/postVessel')
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
router.get('/edit/positionlist/:id', authenticated, function (req, res, next) {
  const vesselId = Number(req.params.id)
  Vessel.findByPk(vesselId).then(vessel => {
    return res.render('editVslPosition', { vessel: vessel.toJSON() });
  })
})

// post 編輯position
router.put('/edit/positionlist/:id', authenticated, function (req, res, next) {
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
router.get('/post/fixtures/:id', authenticated, function (req, res, next) {
  const vesselId = Number(req.params.id)
  Vessel.findByPk(vesselId).then(vessel => {
    vessel = vessel.toJSON()
    Charterer.findAll({ raw: true, nest: true }).then(charterers => {
      res.render('addFixtures', { charterers, vessel });
    })

  })
})

//post 新增fixture
router.post('/post/fixtures', authenticated, function (req, res, next) {

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
router.get('/vessel/fixtures/:id', authenticated, function (req, res, next) {
  const vesselId = Number(req.params.id)
  Fixture.findAll({ raw: true, nest: true, where: { vesselId: vesselId }, include: [Charterer, Vessel] }).then(fixtures => {
    if (fixtures.length === 0) {
      req.flash('error_messages', { error_messages: '目前沒有fixtures' })
      return res.redirect(`/vessels/${vesselId}`)
    }
    vesselName = fixtures[0].Vessel.name
    fixtures = fixtures.map(fixture => ({
      ...fixture,
      charterer: fixture.Charterer.name,
    }))
    return res.render('vesselFixtures', { fixtures, vesselName });
  })

})

//get post fixture
router.get('/edit/fixtures/:id', authenticated, function (req, res, next) {
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
router.put('/edit/fixtures/:id', authenticated, function (req, res, next) {
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

//get post charterer
router.get('/post/charterer', authenticated, function (req, res, next) {
  Charterer.findAll({ raw: true, nest: true }).then(charterers => {
    res.render('postCharterer', { charterers });
  })
})

//post charterer
router.post('/post/charterer', authenticated, function (req, res, next) {
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

//delete charterer
router.delete('/charterers/:id', authenticated, function (req, res, next) {

  return Charterer.findByPk(req.params.id).then(charterer => {
    charterer.destroy().then(charterer => {
      res.redirect('/admin/post/charterer')
    })
  })

})

//delete fixtures
router.delete('/fixtures/:id', authenticated, function (req, res, next) {

  return Fixture.findByPk(req.params.id).then(fixture => {
    fixture.destroy().then(fixture => {
      res.redirect('back')
    })
  })

})




module.exports = router;
