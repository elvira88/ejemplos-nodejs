var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var VideoSchema = new mongoose.Schema({
    _id:String,
    title:String,
    comments:String,
    rating:Number,
    views:Number,
    label:String,
    date:Date,
    owner:String

}, {timestamps: true,collection:"videos"});


var video = mongoose.model("Video", VideoSchema);

module.exports = video;