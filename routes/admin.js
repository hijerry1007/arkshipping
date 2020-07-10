var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel


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

router.get('/post/fixtures/:IMONumber', function (req, res, next) {
  const IMONumber = req.params.IMONumber
  res.render('addFixtures', { IMONumber });
})

router.get('/edit/fixtures/:IMONumber', function (req, res, next) {
  const IMONumber = req.params.IMONumber

  res.render('editFixtures', { IMONumber });
})

router.get('/post/charterer', function (req, res, next) {
  const charterer = 'YML'
  res.render('postCharterer', { charterer });
})

module.exports = router;
