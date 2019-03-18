var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var schema = new Schema(
{
    email : {type:String, require:true,unique: true },
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
    bloodAndCity:{type:String}

});

schema.plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}



schema.methods.isValid = function(hashedpassword){

    console.log(this.password)
    console.log(hashedpassword)
    return  bcrypt.compareSync(hashedpassword, this.password);
}



module.exports = mongoose.model('User',schema);