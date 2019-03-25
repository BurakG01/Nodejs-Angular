var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const myfunctions = require('../myFunctions');




router.get('/username', verifyToken, function (req, res, next) {

  return res.status(200).json(decodedToken);


})


router.get('/userinfo', verifyToken, function (req, res, next) {
  let userFindByid = decodedToken.id;
  let promise = User.findOne({ _id: userFindByid }).exec();
  promise.then((userinfo) => {

    if (userinfo) {
      let countryAndPostalCode = myfunctions.getCountryNameAndPostalCode(userinfo.location)


      return res.status(200).json({
        username: userinfo.username,
        bloodGroup: userinfo.bloodGroup,
        email: userinfo.email,
        phone_number: userinfo.phone_number,
        location: userinfo.location,
        address: userinfo.location.formatted_address,
        isBenefactor: userinfo.isBenefactor,
        country: countryAndPostalCode.country,
        city: countryAndPostalCode.city,
        postal_code: countryAndPostalCode.postal_code

      })

    }
  })


})


router.post('/update', verifyToken, function (req, res, next) {
  let userFindByid = decodedToken.id;

  User.findOne({_id:userFindByid}, function(err, user) {
    console.log(Date.now())
    if (err) {
      throw err
    } else {
      if (user) {
        user.email = req.body.email,
        user.username=req.body.username,
        user.phone_number=req.body.phone_number,
        user.isBenefactor=req.body.isBenefactor,
        user.location=req.body.location,
        user.updated_dt=Date.now()
        user.save(err => {
          if(err&&err.code===11000){
            return res.status(500).json({message:"This email has already exist"});
          }
        else{
          return res.status(200).json({message:'Your account was updated'});
        }
        })
      } else {
        console.log("User was not found!")
      }
    }
  })


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
