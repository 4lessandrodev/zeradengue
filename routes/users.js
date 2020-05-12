var express = require('express');
var router = express.Router();
const UsuarioController = require('./../controllers/UsuarioController');
const DenunciaController = require('./../controllers/DenunciaController');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

//---------------------------MULTER----------------------------------------------------
//https://www.npmjs.com/package/multer#diskstorage
//Upload de avatares
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','avatares'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

//---------------------------MULTER----------------------------------------------------
//Upload de denuncias
var imagemDenuncia = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadDenuncia = multer({ storage: imagemDenuncia });

//-------------------------------------------------------------------------------
/* GET users listing. */
router.get('/', UsuarioController.index);

//-------------------------------------------------------------------------------
/* GET nova denuncia listing. */
router.get('/denuncia', DenunciaController.novaDenuncia);

//-------------------------------------------------------------------------------
/* Salvar denuncia. */
router.post('/denuncia', [
  check('endereco', 'Informe endereço completo').isEmpty(),
  check('cidade', 'Informe a cidade').isEmpty(),
  check('bairro', 'Informe o bairro').isEmpty()
], uploadDenuncia.any(), DenunciaController.salvarDenuncia);

//-------------------------------------------------------------------------------
/* GET denuncia selecionada listing. */
router.get('/denuncia/:id', DenunciaController.verDenuncia);

//-------------------------------------------------------------------------------
/* GET perfil do usuário listing. */
router.get('/perfil', UsuarioController.verUsuario);

//-------------------------------------------------------------------------------
/* Post atualizar o perfil do usuário */
router.put('/perfil', [check('nome', 'Informe o nome').isEmpty()], upload.any(), UsuarioController.atualizarPerfil);

//-------------------------------------------------------------------------------
/* Encerrar a sessão - Fazer logoff*/
router.get('/logout', UsuarioController.sair);

//-------------------------------------------------------------------------------
/* Encerrar a sessão - Fazer logoff*/
router.get('/listar-cidades', DenunciaController.listarCidadesApi);

//-------------------------------------------------------------------------------
module.exports = router;
