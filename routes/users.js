var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
  res.render('usuario/usuario',{title:'Perfil'});
});

module.exports = router;
var express = require('express');
var router = express.Router();
const usuarioController = require('./../controllers/UsuarioController');
const multer = require('multer');
const path = require('path');
//------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','avatar'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + (String(file.originalname).replace(' ', '-')));
  }
});
var upload = multer({ storage: storage });
//------------------------------------------------------------------



router.put('/perfil', upload.any(), usuarioController.edit);

module.exports = router;