var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');
var nodemailer = require('nodemailer');
router.post('/login', function (req, res, next) {
  

  /*var transporter = nodemailer.createTransport({
    
    //service: 'gmail',
    host:"smtp.live.com",
    port:587,

    auth: {
      user: 'gundogdu.burak@outlook.com',
      pass: 'Burak.6451'
    },
    tls:{
    rejectUnauthorized:false
    }

  });
  
  var mailOptions = {
    from: 'gundogdu.burak@outlook.com',
    to: 'gokcephlvn@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy :)!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/



  let promise = User.findOne({ email: req.body.email }).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isDelete == false) {

        if (doc.isValid(req.body.password)) {
          // generate token
          let token = jwt.sign({
            username: doc.username,
            id: doc.id,
            isDelete: doc.isDelete
          }, 'secret', { expiresIn: '3h' });

          return res.status(200).json(token);

        } else {
          return res.status(501).json({ message: ' Invalid Credentials' });
        }

      } else {
        return res.status(501).json({
          message: ' Your account was deleted at' + ' '
            + dateFormat(doc.deletion_dt, "dd-mm-yyyy")
        });
      }

    }
    else {
      return res.status(501).json({ message: 'User email is not registered.' })
    }
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Some internal error' });
  })
})
module.exports = router;
