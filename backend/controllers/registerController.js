var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register', function (req, res, next) {
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
      city:req.body.city,
      town:req.body.town,
      district:req.body.district
  
    });
    let promise = User.findOne({ email: req.body.email }).exec();
    promise.then((data) => {
      if (data) {
        if (data.isDelete == false) {
          return res.status(501).json({ message: 'This email has already exist.' });
        }
        else {
          User.findOneAndUpdate({ email: req.body.email }, {
            $set: {
              "isDelete": false, "email": req.body.email,
              "username": req.body.username,
              "password": User.hashPassword(req.body.password),
              "bloodGroup": req.body.bloodGroup,
              "phone_number": req.body.phone_number,
              "updated_dt": Date.now()
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
