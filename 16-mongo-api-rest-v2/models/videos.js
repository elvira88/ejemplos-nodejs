var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var VideoSchema = new mongoose.Schema({
    title:String,
    comments:String,
    rating:Number,
    views:Number,
    label:String,
    date:Date,
    owner:String,

}, {timestamps: true,collection:"user"});


var video = mongoose.model("Video", VideoSchema);

module.exports = video;