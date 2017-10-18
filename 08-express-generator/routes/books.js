var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var obj1={
        id:1,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"libro gueno gueno de magos y malotes"
    };
    var obj2={
        id:2,
        isbn:"2131231",
        titulo:"Harry potter y la camara secreta",
        autores:"J.K. Rowling",
        sinopsis:"Aparece el maligno una vez más"
    };
    var obj3={
        id:3,
        isbn:"2131231",
        titulo:"Harry potter y el prisionero de Azkaban",
        autores:"J.K. Rowling",
        sinopsis:"Hola Padrino, te quiero mucho!"
    };

    res.render(
        'books/index',
        {
            listado: [obj1,obj2,obj3],
            variable: "Listado de Libros"
        }
    );
});
/* GET users add form. */
router.get('/add', function(req, res, next) {
    var objeto={id:1,isbn:"",titulo:"",autores:"",sinopsis:""};
    res.render('books/add', { objeto: objeto });
});
/* POST users add form. */
router.post('/add', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //console.log(fields.id);
        res.render('books/show', { objeto: fields });
    });
});
/* GET users edit form. */
router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    console.log(id);
    var objeto={
        id:id,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"libro gueno gueno de magos y malotes"
    };
    res.render('books/add', { objeto: objeto });
});
/* POST users edit form. */
router.post('/edit/:id', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //fields.id=0;
        //console.log(fields.id);
        res.render('books/show', { objeto: fields });
    });
});
/* GET users listing. */
router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;
    res.render('books/delete', { id: id });
});
/* GET users listing. */
router.get('/delete/confirm/:id', function(req, res, next) {
    var id=req.params.id;
    res.render('books/delete-confirmed', { id: id });

});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var objeto={
        id:1,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"liobro gueno gueno de magos y malotes"
    };
    res.render('books/show', { objeto: objeto });
});

module.exports = router;