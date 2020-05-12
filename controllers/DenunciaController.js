const Denuncia = require('./../models/Denuncia');
const DenunciaDao = require('./../Dao/DenunciaDao');
const { check, body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

//-------------------------------------------------------------------------------
module.exports = {
  
  //-------------------------------------------------------------------------------
  //Visualizar denúncia selecionada
  verDenuncia: async (req, res, next) => {
    try {
      let denuncia_id = req.params.id;
      let usuario = req.session.usuario;
      let denuncia = await DenunciaDao.buscarDenunciasComRelacionamentos(denuncia_id, usuario.id);
      res.render('usuario/denuncia-selecionada', { title: 'Denúncia Selecionada', denuncia:denuncia[0], usuario });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
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
        let denuncia = new Denuncia(req.body.descricao, req.body.endereco, req.body.bairro,
          req.body.cidade_id, req.session.usuario.id, 1);
          denuncia.Imagem = req.files[0].originalname;
          //Pegar o id da cidade no campo do formulário
          let idCidade = parseInt(req.body.cidade);
          //Verificar se foi informado um id
          if (isNaN(idCidade)){
            idCidade = await DenunciaDao.buscar(denuncia, 'descricao', req.body.cidade, 1, 3);
            //Verificar se conseguiu encontrar a cidade
            if (idCidade[0].id) {
              denuncia.Cidades_id = idCidade[0].id;
            } else {
              //Informar o usuário que a cidade é inválida
              res.render('usuario/denuncia', { title: 'Denúncia', error: [{msg:'Cidade inválida'}], usuario: req.session.usuario, cidades });
            }
          } else {
            // Sendo passado o id da cidade no formulario será atribuido a model
            denuncia.Cidades_id = idCidade;
          }
          //Salvar
          let result = await DenunciaDao.salvar(denuncia);
          res.redirect('/users');
        } else {
          //Criar um novo erro passando a primeira mensagem de erro
          throw new Error(e.errors);
        }
        // Em caso de qualquer erro executar os passos
      } catch (err) {
        //Listar cidades para renderinzar a lista na página
        let cidades = await DenunciaDao.listarCidadesPagina(49);
        //Verificar se foi realizado upload de uma imagem 
        if (req.files[0] != undefined) {
          let imagem = path.join('public', 'uploads', req.files[0].originalname);
          let existeImagem = fs.existsSync(imagem);
          //Se encontrar imagem, exluir
          if (existeImagem) {
            //Apagar a imagem
            fs.unlinkSync(imagem);
          }
        }
        res.render('usuario/denuncia', { title: 'Denúncia', error: [{msg:'Verifique os dados'}, {msg:err.message.slice(0,50)}], usuario: req.session.usuario, cidades });
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