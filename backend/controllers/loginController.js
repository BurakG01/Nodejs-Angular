var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');
router.post('/login', function (req, res, next) {
  

  let promise = User.findOne({ email: req.body.email }).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isDelete == false) {

        if (doc.isValid(req.body.password)) {
         
          // burada bir token uretiyoruz main deskten bu tokenla istek yaptigimzda 
          // asagidaki datalari alabilir . buraya sonradan data ekleyecez .
          let token = jwt.sign({
            username: doc.username,
            id: doc.id,
            isDelete: doc.isDelete,
            bloodGroup:doc.bloodGroup
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
