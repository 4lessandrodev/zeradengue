var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('usuario/index');
});


/* GET nova denuncia listing. */
router.get('/denuncia', function (req, res, next) {
  res.render('usuario/denuncia');
});

/* GET denuncia selecionada listing. */
router.get('/denuncia/:id', function (req, res, next) {
  res.render('usuario/denuncia-selecionada');
});

/* GET perfil do usuário listing. */
router.get('/perfil', function (req, res, next) {
  res.render('usuario/usuario');
});

module.exports = router;
