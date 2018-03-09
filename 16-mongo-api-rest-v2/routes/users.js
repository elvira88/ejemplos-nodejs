var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100/test');
var db = mongoose.connection;
var conectado = false;
var User = require("../models/user");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});
var formidable = require('formidable');
var fs = require('fs');

//listado
router.get('/', function(req, res, next) {
    //res.send('Listado de usuarios');
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        User.find(function (err, users) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(users));
        });

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }
});
//añadir
router.post('/', function(req, res, next) {
  res.send('Añadir usuario');
});
//Coger por ID
router.get('/:id', function(req, res, next) {
  res.send('Mostrar usuario '+ req.params.id);
});
//Editar por ID
router.post('/:id', function(req, res, next) {
  res.send('Modificar usuario '+ req.params.id);
});
//Borrar por ID
router.get('/delete/:id', function(req, res, next) {
  res.send('Borrar usuario '+ req.params.id);
});
module.exports = router;