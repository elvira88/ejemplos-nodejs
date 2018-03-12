var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100/test');
var db = mongoose.connection;
var conectado = false;
var videos = require("../models/videos");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});
var fs = require('fs');

function cogeLogin(session){
    return session.videos;
}
/* GET home page. */
router.get('/', function (req, res, next) {
    /*res.render('api', {
        title: 'API Rest Mongo'
    });*/
     //res.send('Listado de comentarios');
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        Comentario.find(function (err,videos) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(videos));
        });

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }
});
router.get('/get/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findOne(
            //{_id:req.params.id}
            objeto,
            function (err, videos) {
                if (err) return console.error(err);
                //console.log(users);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(videos));
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
            function (err, videos) {
                if (err) return console.error(err);
                //console.log(users);
                res.render("edit", {
                    item: videos
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
    //console.log(req.params.id);
    if (conectado) {
        var objetoModificado = {};
        objetoModificado._id = req.params.id;
        objetoModificado.title = req.body.title;
        objetoModificado.comments = req.body.comments;
        objetoModificado.rating = req.body.rating;
        objetoModificado.views = req.body.views;
        objetoModificado.label = req.body.label;
        objetoModificado.date = req.body.date;
        objetoModificado.owner = req.body.owner;
        console.log(objetoModificado);
        User.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, videos) {
                if (err) return console.error(err);
                console.log(videos);
                User.findById(
                    req.params.id,
                    function (err, videos) {
                        if (err) return console.error(err);
                        console.log(videos);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(videos));
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
        User.findById(
            objeto,
            function (err, videos) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('borra', {
                    item: videos
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
        User.findByIdAndRemove(
            req.params.id,
            function (err, videos) {
                if (err) return console.error(err);
                //console.log(users);
                //FALTA BORRAR
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(videos));
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
            function (err, videos) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('show', {
                    item: videos
                });
            }
        );

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
/*router.get('/addForm', function (req, res, next) {
    if (conectado) {
        res.render('videos', {
            title: 'API Rest Mongo'
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});*/
/*router.get('/addStatic', function (req, res, next) {

    if (conectado) {
        var video = new Video({
            title: ""
            //, otro_campo:"otro valor"
        });
        video.save(function (err, videodevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("video guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(videodevuelto));
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});*/
router.post('/add', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var video = new Video({
            username: req.body.nombre,
            hash: req.body.pass,
            title = req.body.title,
        });
        usuario.setPassword(req.body.pass);
        usuario.save(function (err, userdevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userdevuelto));
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get("/uploadVideoGet",function(req,res){
    console.log("presentando Video");
    res.render("upload", {
        title: 'Subir Video'
    });
});

module.exports = router;