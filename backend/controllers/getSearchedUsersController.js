var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const myfunctions = require('../myFunctions');

router.post('/search', verifyToken, function (req, res, next) {
    let usersArray=[]
 
 
   User.find({
     $or:[
      
      {bloodAndCity: req.body.blodGroupAndCity},
        {city:req.body.City}
       
     ],
  
    isDelete:false,
    isBenefactor:true
  
  }, function(err, users) 
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
     
      return res.status(200).json(usersArray);
  
   });
  
  
 
 })

 router.get('/getbloodandcity',verifyToken,function(req,res,next){
  User.find({isBenefactor:true}).distinct('bloodAndCity', function(error, bloodAndCity) {
    // ids is an array of all ObjectIds
   if (error) return res.status(500).json({message:'Someting went wrong'})
   return res.status(200).json(bloodAndCity)
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