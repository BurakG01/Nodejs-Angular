var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/recordstatistics', verifyToken, function (req, res, next) {
    User.aggregate([
        {
          $match: {
            isDelete:false,
            isBenefactor:true
        }
        },
        {
    
     
        $group:{
          _id:{
            year : { $year : "$creation_dt" },        
            month : { $month : "$creation_dt" },        
        
        },
          total:{$sum:1},
         
        }
      }],function(err,result){
         var year =new Date().getFullYear()
         var monthsData=new Array(12).fill(0);
         result=result.filter(item=>item._id.year==year)
         result.map((iter)=>{
          monthsData[iter._id.month-1]=iter.total;

       })
     return res.status(200).json(monthsData);
    
      })
    

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