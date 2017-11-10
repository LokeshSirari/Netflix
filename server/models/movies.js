var mongoose = require('mongoose');

// Define our admin schema
var MoviesSchema= new mongoose.Schema({                  
    name: {type: String},
    catagery: {type: String},
    image:{type: String}
 });
module.exports = mongoose.model('movies',MoviesSchema);