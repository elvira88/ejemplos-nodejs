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
        User.findOne(
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
        User.findOne(
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
router.post('/edit/:id', function (req, res, next) {
    if (conectado) {
        var objetoModificado = {};
        objetoModificado._id = req.params.id;
        objetoModificado.username = req.body.nombre;
        objetoModificado.fecha = req.body.fecha;
        objetoModificado.mensaje = req.body.mensaje;
        objetoModificado.video = req.body.video;
        console.log(objetoModificado);
        User.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, comentarios) {
                if (err) return console.error(err);
                console.log(comentarios);
                User.findById(
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
/*router.get('/borra/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findById(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('borra', {
                    item: usuario
                });
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});*/
router.get('/delete/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        User.findByIdAndRemove(
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
        User.findOne(
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
router.post('/add', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var comentario = new Comentario({
            _id: req.body.id,
            usuario: req.body.usuario,
            fecha: req.body.fecha,
            mensaje: req.body.mensaje,
            video: req.body.video
        });
        usuario.save(function (err, comentarioDevuelto) {
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
router.get("/uploadComentario",function(req,res){
    console.log("presentando Comentario");
    res.render("upload", {
        title: 'Subir Comentario'
    });
});
router.post("/uploadComentario",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname+'/../public/uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('Comentario subido');
        res.end();
      });
    }
    );
});
module.exports = router;
