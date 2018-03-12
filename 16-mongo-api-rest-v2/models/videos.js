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
    url:String

}, {timestamps: true,collection:"videos"});


var video = mongoose.model("Video", VideoSchema);

module.exports = video;