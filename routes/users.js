var express = require('express');
var router = express.Router();
const UsuarioController = require('./../controllers/UsuarioController');

/* GET users listing. */
router.get('/', UsuarioController.index);
  
/* GET nova denuncia listing. */
router.get('/denuncia', function (req, res, next) {
  res.render('usuario/denuncia',{title:'Denúncia'});
});

/* GET denuncia selecionada listing. */
router.get('/denuncia/:id', function (req, res, next) {
  res.render('usuario/denuncia-selecionada',{title:'Denúncia Selecionada'});
});

/* GET perfil do usuário listing. */
router.get('/perfil', function (req, res, next) {
  res.render('usuario/usuario',{title:'Perfil'});
});

module.exports = router;
