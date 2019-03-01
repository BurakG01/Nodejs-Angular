var express = require('express');
var router = express.Router();
var User = require('../models/user');
var dateFormat = require('dateformat');
var nodemailer = require('nodemailer');
const config=require('../config');
const myFunctions=require('../myFunctions')

router.post('/getpassword', function (req, res, next) {

    let promise = User.findOne({ email: req.body.email }).exec();

    promise.then(function (doc) {
        if (doc) {
            if (doc.isDelete == false) {
                var getNewPassword=myFunctions.getNewPassword()

                var transporter = nodemailer.createTransport({
                    host:config.host,
                    port: config.port,

                    auth:config.auth,
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                var mailOptions = {
                    from: config.auth.user,
                    to: req.body.email,
                    subject: 'New Password',
                    text:"Your new password is :"+getNewPassword
                    
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {

                        User.findOneAndUpdate({ email: req.body.email }, {
                            $set: {
                                "password":User.hashPassword(getNewPassword),
                            }
                        }, { new: true }, (err, doc) => {
                            
                            if(doc){
                                console.log('Email sent: ' + info.response);
                                return res.status(200).json({message:'New password was sent'});
                            }
                        }
                        )
                       
                    }
                });

            }

            else {
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

})
module.exports = router;