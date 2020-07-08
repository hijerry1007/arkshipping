var express = require('express');
var router = express.Router();
const db = require('../models')
const Vessel = db.Vessel


/* GET users listing. */
router.get('/postVessel', function (req, res, next) {
  res.render('postVessel');
});

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

module.exports = router;
