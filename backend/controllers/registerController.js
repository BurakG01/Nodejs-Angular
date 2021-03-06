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
    user.save(err => {
      if(err&&err.code===11000){
        return res.status(500).json({message:"This email has already exist"});
      }
    else{
      return res.status(200).json({message:'Your account was updated'});
    }
    })
  })
  module.exports = router;


   // emaili unique yaptim burada email var mi kontrolune gerek yok burayi duzelt bir ara

   /* let promise = User.findOne({ email: req.body.email }).exec();
    promise.then((data) => {
      if (data) {
        if (data.isDelete == false) {
          return res.status(501).json({ message: 'This email has already exist.' });
        }
        else {
          User.deleteOne({email:req.body.email},function(err){
            if(err){
// burada return biseyler don
            }
            else{
              user.updated_dt=Date.now();
              let record = user.save();
              record.then((doc) => {
                return res.status(201).json(doc);
              })
              record.catch((err) => {
                return res.status(501).json({ message: 'Error registering user.' })
              })
            }
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
    })*/
  
 
