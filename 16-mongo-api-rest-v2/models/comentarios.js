var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var ComentarioSchema = new mongoose.Schema({
    _id: String,
    usuario: String,
    fecha: Date,
    mensaje: String,
    video: String
    
}, {timestamps: true, collection: "comentarios"});


var comentario = mongoose.model("Comentario", ComentarioSchema);

module.exports = comentario;