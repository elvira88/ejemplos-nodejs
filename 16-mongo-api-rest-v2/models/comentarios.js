var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var ComentarioSchema = new mongoose.Schema({
    username: String,
    fecha: Date,
    mensaje: String,
    video:String
    
}, {timestamps: true,collection:"user"});


var comentario = mongoose.model("Comentario", ComentarioSchema);

module.exports = comentario;