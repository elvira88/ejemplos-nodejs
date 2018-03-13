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
  //res.send('Listado de comentarios');
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

router.get('/get/:id', function (req, res, next) {
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        Comentario.findOne(
            objeto,
            function (err, comentarios) {
                if (err) return console.error(err);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(comentarios));
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/edita/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        Comentario.findOne(
            objeto,
            function (err, comentarios) {
                if (err) return console.error(err);
                //console.log(users);
                res.render("edit", {
                    item: comentarios
                });
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.post('/:id', function (req, res, next) {
    if (conectado) {
        var objetoModificado = {};
        objetoModificado._id = req.params.id;
        objetoModificado.username = req.body.nombre;
        objetoModificado.fecha = req.body.fecha;
        objetoModificado.mensaje = req.body.mensaje;
        objetoModificado.video = req.body.video;
        console.log(objetoModificado);
        Comentario.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, comentarios) {
                if (err) return console.error(err);
                console.log(comentarios);
                Comentario.findById(
                    req.params.id,
                    function (err, comentarios) {
                        if (err) return console.error(err);
                        console.log(comentarios);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(comentarios));
                    }
                );
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/borra/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        Comentario.findById(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('borra', {
                    item: comentarios
                });
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/delete/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        Comentario.findByIdAndRemove(
            req.params.id,
            function (err, comentarios) {
                if (err) return console.error(err);
                //console.log(users);
                //FALTA BORRAR
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(comentarios));
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/show/:id', function (req, res, next) {
    console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        Comentario.findOne(
            objeto,
            function (err, comentarios) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('show', {
                    item: comentarios
                });
            }
        );

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.post('/', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var comentario = new Comentario({
            usuario: req.body.usuario,
            fecha: req.body.fecha,
            mensaje: req.body.mensaje,
            video: req.body.video
        });
        comentario.save(function (err, comentarioDevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("comentario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(comentarioDevuelto));
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});

module.exports = router;
