var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var schema = new Schema(
{
    email : {type:String, require:true, index:{unique: true} },
    username: {type:String, require:true},
    password:{type:String, require:true},
    bloodGroup:{type:String, require:true},
    creation_dt:{type:Date, require:true},
    isDelete:{type:Boolean,required:true},
    deletion_dt:{type:Date},
    updated_dt:{type:Date},
    phone_number:{type:String, require:true},
    address:{type:String,require:true},
    location:{type:Object,require:true},
    isBenefactor:{type:Boolean,require:true},
    bloodAndCity:{type:String},
    city:{type:String},
    profilePicture:{type:String}


},{ emitIndexErrors: true });

//schema.plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}
// silinmis email ile kayit gelirse gercekten eskisini siliyorum.
schema.pre('save', function (next) {
    let user = this 
    if(user.isModified('email')) {
      this.constructor.deleteOne({email:this.email, isDelete:true}, (err) => {
        err ? next(err) : next()
      })
    } else {
      next()
    }
  })


schema.methods.isValid = function(hashedpassword){

    return  bcrypt.compareSync(hashedpassword, this.password);
}



module.exports = mongoose.model('User',schema);