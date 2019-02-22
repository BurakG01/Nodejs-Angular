var express = require('express');
var router = express.Router();
const service = require('../services/adresService')
router.get('/cities', function (req, res, next) {

  service.getCities().then((response) => {

    return res.status(200).json(response);
  })
})
router.get('/towns/:id', function (req, res, next) {

  service.getTowns(req.params.id).then((response) => {

    return res.status(200).json(response);
  })
})
router.get('/districts/:id', function (req, res, next) {

  service.getDistricts(req.params.id).then((response) => {

    return res.status(200).json(response);
  })
})

router.get('/neighborhoods/:id', function (req, res, next) {

  service.getNeighborhoods(req.params.id).then((response) => {

    return res.status(200).json(response);
  })
})

module.exports = router;