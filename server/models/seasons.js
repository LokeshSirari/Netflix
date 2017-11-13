var mongoose = require('mongoose');

// Define our seasons schema

var SeasonsSchema = new Schema({
    season_name: { type: String },
    series_id: { type: String }
});

module.exports = mongoose.model('Seasons', SeasonsSchema);