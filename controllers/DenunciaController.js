const Denuncia = require('./../models/Denuncia');
const DenunciaDao = require('./../Dao/DenunciaDao');
const { check, body, validationResult } = require('express-validator');

//-------------------------------------------------------------------------------
module.exports = {
  
  //-------------------------------------------------------------------------------
  //Visualizar denúncia selecionada
  verDenuncia: async (req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  },
  
  //-------------------------------------------------------------------------------
  listarDenuncias: async (req, res, next) => {
    //Implementado em UsuarioController
  },
  
  //-------------------------------------------------------------------------------
  //Salvar uma nova denúncia
  salvarDenuncia: async (req, res, next) => {
    try {
      //Verificar se os dados informados estão ok
      let e = validationResult(req);
      if (e.isEmpty()) {
        //Criar o objeto model
        let denuncia = new Denuncia(req.bady.descricao, req.body.endereco, req.body.bairro,
          req.body.cidade_id, req.session.usuario.id, 1);
          denuncia.Imagem = req.files[0].originalname;
          //Salvar
          let result = await DenunciaDao.salvar(denuncia);
        } else {
          //Renderizar a página passando os erros encontrados
          res.render('userio/denuncia', {title:'Denúncia', error:e.errors});
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    }
    
  };