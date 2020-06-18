var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
const usuarioController = require('./../controllers/UsuarioController');
const multer = require('multer');
const path = require('path');
const Auth = require('./../middleware/Auth');
//------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'images', 'avatar'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + (String(file.originalname).replace(' ', '-')));
  }
});
var upload = multer({ storage: storage });
//------------------------------------------------------------------

/* GET users listing. */
router.get('/home', function (req, res, next) {
  res.render('usuario/index',{title:'Home'});
});


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
  const user = req.session.USER;
  res.render('usuario/usuario', { title: 'Perfil', user});
});

/* PUT editar perfil do usuário */
router.put('/perfil', upload.any(), usuarioController.edit);

/* GET testar se os dados foram salvos na sessão */
router.get('/teste', function (req, res) {
  let conectedUser = req.session.USER;
  res.send(conectedUser);
});

/* GET apagar os dados do usuário na sessão*/
router.get('/logout', Auth.logout);

module.exports = router;