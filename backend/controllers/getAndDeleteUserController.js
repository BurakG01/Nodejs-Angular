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

   User.findOneAndUpdate({ _id:userFindByid }, {
    $set: {
     "email":req.body.email,
     "username":req.body.username,
     "phone_number":req.body.phone_number,
     "address":req.body.address,
     "isBenefactor":req.body.isBenefactor,
     "location":req.body.location
    }
  }, { runValidators: true, context: 'query' }, (err, doc) => {

   if(err){
     
    return res.status(500).json({message:err.message});
   }
   else{
    return res.status(200).json({message:'Your account was updated'});
   }
  })
 

})

/*router.post('/search', verifyToken, function (req, res, next) {
   let usersArray=[]
  User.find({bloodAndCity: req.body.blodGroupAndCity,isDelete:false,isBenefactor:true}, function(err, users) 
  {
     if (err)
     {
      return res.status(500).json({message:err.message});
     }
     users.map((iter,index)=>{
      usersArray.push([
        [iter.email,iter.username,iter.phone_number],
        
        iter.location.geometry.location.lat,
        iter.location.geometry.location.lng,
        index
      
      ])
     })
     console.log(usersArray);
     return res.status(200).json(usersArray);
 
  });
 
 

})*/


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
