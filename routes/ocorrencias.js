const express = require('express');
const router = express.Router();
const denunciaController = require('./../controllers/DenunciaController');
const multer = require('multer');
const path = require('path');
//------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'images', 'denuncias'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + (String(file.originalname).replace(' ', '-')));
  }
});
var upload = multer({ storage: storage });
//------------------------------------------------------------------



/* POST nova ocorrência */
router.post('/save', upload.any(), denunciaController.save);

/* GET listar ocorrencias */
router.get('/list', denunciaController.list);

/* GET listar ocorrencias */
router.get('/find/:id' ,denunciaController.find);

module.exports = router;