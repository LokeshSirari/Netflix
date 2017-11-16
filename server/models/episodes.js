var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Define our episodes schema
var EpisodesSchema = new mongoose.Schema({
    episode: { type: String },
    season_name: { type: String },
    series_id:{type: String},
    episode_name:{type: String}
});

module.exports = mongoose.model('Episodes', EpisodesSchema);