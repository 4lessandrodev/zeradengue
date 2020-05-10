var express = require('express');
var router = express.Router();
const UsuarioController = require('./../controllers/UsuarioController');
const { check, validationResult, body } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login'});
});

/* GET cadastro page. */
router.get('/cadastro', function (req, res, next) {
  res.render('cadastro', { title: 'Cadastro', error: null });
});

/* POST cadastrar usuário validando email. */
router.post('/cadastro', [
  check('email', 'Email inválido').isEmail(),
  check('senha', 'Senha entre 6 e 20 caracteres').isLength({ min: 6, max: 20 })
], UsuarioController.salvarUsuario);

module.exports = router;
