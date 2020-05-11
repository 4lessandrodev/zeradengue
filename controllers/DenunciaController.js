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
          res.redirect('/users');
        } else {
          //Renderizar a página passando os erros encontrados
          let cidades = await DenunciaDao.listarCidadesPagina(49);
        res.render('usuario/denuncia', { title: 'Denúncia', error: e.errors, usuario: req.session.usuario, cidades});
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    },
    
    //-------------------------------------------------------------------------------
    //Listar cidades para a api
    listarCidadesApi: async (req, res, next) => {
      try {
        let param = req.query;
        param = param.filtro.toUpperCase();
        let listaDeCidades = await DenunciaDao.listarCidades(param);
        res.send(listaDeCidades);
      } catch (error) {
        console.log(error);
      }
    },
    
    //-------------------------------------------------------------------------------
    //Renderizar página de nova denúncia
    novaDenuncia: async (req, res, next) => {
      try {
        let cidades = await DenunciaDao.listarCidadesPagina(49);
        res.render('usuario/denuncia', { title: 'Denúncia', usuario: req.session.usuario, error: null, cidades });
      } catch (error) {
        
      }
    }
  };