var express = require('express');
var router = express.Router();
const UsuarioController = require('./../controllers/UsuarioController');
const { check, validationResult, body } = require('express-validator');


//------------------------------------------------------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  let logado = req.session.usuario != undefined;
  if (logado) {
    res.redirect('/users');
  } else {
    res.render('index', { title: 'Login', error:null});
  }
});

//------------------------------------------------------------------------------
/* GET home page. */
router.get('/login', function(req, res, next) {
  let logado = req.session.usuario != undefined;
  if (logado) {
    res.redirect('/users');
  } else {
    res.render('index', { title: 'Login', error: null });
  }
});

//------------------------------------------------------------------------------
/* Realizar o login */
router.post('/login', [
  check('email', 'Informe email').isEmail(),
  check('senha','Senha inválida').isLength({min:6})
], UsuarioController.login);

//------------------------------------------------------------------------------
/* GET cadastro page. */
router.get('/cadastro', function (req, res, next) {
  let logado = req.session.usuario != undefined;
  if (logado) {
    res.redirect('/users');
  } else {
    res.render('cadastro', { title: 'Cadastro', error: null });
  }
});

//------------------------------------------------------------------------------
/* POST cadastrar usuário validando email. */
router.post('/cadastro', [
  check('email', 'Email inválido').isEmail(),
  check('senha', 'Senha min. 6 caracteres').isLength({ min: 6, max: 20 })
], UsuarioController.salvarUsuario);

module.exports = router;
