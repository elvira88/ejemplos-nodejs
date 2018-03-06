var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Listado de usuarios');
    var usuario=[{
          name:'Laura M',
          email:'laura@geners.com',
          password:'laura88',
          birthdate:'03/04/1988',
          avatar:'2',
          history:'200',
          playlist:'2',
          upload:'3',
          comments:'40',
      },{
          name:'Elvira D',
          email:'elvira@geners.com',
          password:'elvira88',
          birthdate:'15/09/1988',
          avatar:'5',
          history:'340',
          playlist:'7',
          upload:'0',
          comments:'10',
      },{
          name:'Aritz C',
          email:'aritz@geners.com',
          password:'aritz93',
          birthdate:'20/05/1993',
          avatar:'1',
          history:'1055',
          playlist:'22',
          upload:'17',
          comments:'149',
      },{
          name:'Alvaro P',
          email:'alvaro@geners.com',
          password:'alvaro90',
          birthdate:'31/12/1990',
          avatar:'6',
          history:'110',
          playlist:'0',
          upload:'0',
          comments:'0',
      }];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(usuario));
});
router.post('/', function(req, res, next) {
  res.send('Añadir usuario');
});
router.get('/:id', function(req, res, next) {
  res.send('Mostrar usuario '+ req.params.id);
});
router.post('/:id', function(req, res, next) {
  res.send('Modificar usuario '+ req.params.id);
});
router.get('/delete/:id', function(req, res, next) {
  res.send('Borrar usuario '+ req.params.id);
});
module.exports = router;