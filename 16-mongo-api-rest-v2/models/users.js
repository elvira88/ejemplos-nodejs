var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');


var UserSchema = new mongoose.Schema({
    nombreYApellidos: {type: String, lowercase: true, required: [true, "can't be blank"],unique: true, index: true},
    email: String,
    born: Date,
    salt:String,
    password: String,
    avatar: String,
    
}, {timestamps: true,collection:"user"});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
 var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
 return this.password === hash;
};

var user = mongoose.model("User", UserSchema);

module.exports = user;