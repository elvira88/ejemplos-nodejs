var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100/test');
var db = mongoose.connection;
var conectado = false;
var Comentario = require("../models/comentarios");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res, next) {
  //res.send('Listado de usuarios');
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        Comentario.find(function (err,comentarios) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(comentarios));
        });

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }
});

router.post("/", function (req, res, next){
      var comentario=[
    {
        texto:"Lorem imput",
        usuario:"pepe",
        fecha:new Date(),
        video:"pepaPig"
    },
    {
        texto:"Lorem imput2",
        usuario:"pepe2",
        fecha:new Date(),
        video:"pepaPig2"
    }
  ];
    res.send("Añadir un comentario");
});

router.get("/:id/", function (req, res, next){
      var comentario=[
    {
        texto:"Lorem imput",
        usuario:"pepe",
        fecha:new Date(),
        video:"pepaPig"
    },
    {
        texto:"Lorem imput2",
        usuario:"pepe2",
        fecha:new Date(),
        video:"pepaPig2"
    }
  ];
    res.send("Mostrar un comentario" + req.params.id);
});

router.post("/:id/", function (req, res, next){
      var comentario=[
    {
        texto:"Lorem imput",
        usuario:"pepe",
        fecha:new Date(),
        video:"pepaPig"
    },
    {
        texto:"Lorem imput2",
        usuario:"pepe2",
        fecha:new Date(),
        video:"pepaPig2"
    }
  ];
    res.send("Editar un comentario" + req.params.id);
});

router.get("/delete/:id",function(req,res,next){
      var comentario=[
    {
        texto:"Lorem imput",
        usuario:"pepe",
        fecha:new Date(),
        video:"pepaPig"
    },
    {
        texto:"Lorem imput2",
        usuario:"pepe2",
        fecha:new Date(),
        video:"pepaPig2"
    }
  ];
    res.send("Borrar un comentario"+ req.params.id);
});

router.post("/upload",function(req,res,next){
      var comentario=[
    {
        texto:"Lorem imput",
        usuario:"pepe",
        fecha:new Date(),
        video:"pepaPig"
    },
    {
        texto:"Lorem imput2",
        usuario:"pepe2",
        fecha:new Date(),
        video:"pepaPig2"
    }
  ];
    res.send("Subir un comentario");
});

module.exports = router;