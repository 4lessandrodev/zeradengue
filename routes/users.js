var express = require('express');
var router = express.Router();
const UsuarioController = require('./../controllers/UsuarioController');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

//https://www.npmjs.com/package/multer#diskstorage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

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
router.get('/perfil', UsuarioController.verUsuario);

/* Post atualizar o perfil do usuário */
router.put('/perfil', [check('nome', 'Informe o nome').isEmpty()], upload.any(), UsuarioController.atualizarPerfil);

/* Encerrar a sessão - Fazer logoff*/
router.get('/logout', UsuarioController.sair);

module.exports = router;
