var mongoose = require('mongoose');

// Define our admin schema
var UserSchema= new mongoose.Schema({                  
    password: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    role:{type:Number},
    email:{type:String,unique:true},
    status:{type:String}
 });
module.exports = mongoose.model('users',UserSchema);