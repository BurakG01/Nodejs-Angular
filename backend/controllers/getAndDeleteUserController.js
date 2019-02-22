var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const service=require('../services/adresService')



router.get('/username', verifyToken, function (req, res, next) {

    return res.status(200).json(decodedToken.username);
  })
  router.get('/delete', verifyToken, function (req, res, next) {
    let userFindByid = decodedToken.id;
    User.findByIdAndUpdate(userFindByid, { $set: { "isDelete": true, "deletion_dt": Date.now() } }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result)
      return res.status(200).json(result.username);
    });
  })
  var decodedToken = '';
  function verifyToken(req, res, next) {
    let token = req.query.token;
  
    jwt.verify(token, 'secret', function (err, tokendata) {
      if (err) {
        return res.status(400).json({ message: ' Unauthorized request' });
      }
      if (tokendata) {
        decodedToken = tokendata;
        next();
      }
    })
  }

  module.exports = router;
