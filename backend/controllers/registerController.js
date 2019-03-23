var express = require('express');
var router = express.Router();
var User = require('../models/user');
var myfunction=require('../myFunctions')

router.post('/register', function (req, res, next) {

  var city=myfunction.getCountryNameAndPostalCode(req.body.location).city
    var user = new User({
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
      bloodGroup: req.body.bloodGroup,
      creation_dt: Date.now(),
      isDelete: false,
      deletion_dt: null,
      updated_dt: null,
      phone_number: req.body.phone_number,
      address:req.body.address,
      location:req.body.location,
      isBenefactor:req.body.isBenefactor,
      bloodAndCity:city+' '+req.body.bloodGroup,
      city:city
      
  
    });




   // emaili unique yaptim burada email var mi kontrolune gerek yok burayi duzelt bir ara

    let promise = User.findOne({ email: req.body.email }).exec();
    promise.then((data) => {
      if (data) {
        if (data.isDelete == false) {
          return res.status(501).json({ message: 'This email has already exist.' });
        }
        else {
          User.findOneAndUpdate({ email: req.body.email }, {
            $set: {
              "isDelete": false, 
              "email": req.body.email,
              "username": req.body.username,
              "password": User.hashPassword(req.body.password),
              "bloodGroup": req.body.bloodGroup,
              "phone_number": req.body.phone_number,
              "updated_dt": Date.now(),
              "location":req.body.location,
              "address":req.body.address ,
              "isBeneficator":req.body.isBeneficator
            }
          }, { new: true }, (err, doc) => {
  
            return res.status(201).json(doc);
          })
        }
      }
      else {
        let record = user.save();
        record.then((doc) => {
          return res.status(201).json(doc);
        })
        record.catch((err) => {
          return res.status(501).json({ message: 'Error registering user.' })
        })
      }
    })
  
  })
  module.exports = router;
