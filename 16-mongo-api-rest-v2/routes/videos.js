var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100/test');
var db = mongoose.connection;
var conectado = false;
var Video = require("../models/videos");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    /*res.render('api', {
        title: 'API Rest Mongo'
    });*/
     //res.send('Listado de comentarios');
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        Video.find(function (err,videos) {
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
router.get('/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        Video.findOne(
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
        Video.findOne(
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
router.post('/:id', function (req, res, next) {
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
        objetoModificado.url = req.body.url;
        console.log(objetoModificado);
        Video.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, videos) {
                if (err) return console.error(err);
                console.log(videos);
                Video.findById(
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
        Video.findById(
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
        Video.findByIdAndRemove(
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
        Video.findOne(
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
router.post('/', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var video = new Video({
            _id: req.body.id,
            title: req.body.title,
            comments : req.body.comments,
            url : req.body.url
        });
        video.save(function (err, userdevuelto) {
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
router.post("/upload",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname+'/../public/uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('http://localhost:3000/uploads/'+ files.filetoupload.name);
        res.end();
      });
    }
    );
});

module.exports = router;