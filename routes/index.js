var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const userController = require('./../controllers/UsuarioController');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', error:false, email:'', senha:'' });
});

/* GET cadastro page. */
router.get('/cadastro', function (req, res, next) {
  res.render('cadastro', { title: 'Cadastro', error: false, email: '', senha: ''  });
});

/* POST cadastrar novo usuário */
router.post('/cadastro', [
  check('email', 'Email é campo obrigatório').isEmail(),
  check('senha','Senha deve ter de 3 a 8 caractéres').isLength({min:3,max:8})
], userController.save);

/* POST realizar login */
router.post('/login', [
  check('email', 'Email é campo obrigatório').isEmail(),
  check('senha', 'Senha deve ter de 3 a 8 caractéres').isLength({ min: 3, max: 8 })
], userController.login);

module.exports = router;
