const Denuncia = require('./../models/Denuncia');
const Usuario = require('./../models/Usuario');
const UsuarioDao = require('./../Dao/UsuarioDao');
const DenunciaDao = require('./../Dao/DenunciaDao');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {
  
  //--------------------------------------------------------------------------------------------
  /* Carregar a página principal */
  index: async (req, res, next) => {
    try {
      //Por padrão lista as denuncias com status 1 = pendente
      let status = 1;
      let dataInicial = req.query.inicio;
      let dataFinal = req.query.fim;
      let tamanhoDaLista = 20;
      if (req.query.status != undefined) {
        status = req.query.status;
      }
      if (req.query.inicio == undefined) {
        dataInicial = moment().subtract(30, 'days').format('YYYY-MM-DD');
        dataFinal = moment().add(1, 'day').format('YYYY-MM-DD');
      }
      let userModel = new Usuario();
      let usuarioId = req.session.usuario.id;
      //Atualizar o usuário 
      let usuarioEncontrado = await UsuarioDao.buscar(userModel, 'id', usuarioId); //Model, coluna do banco, e id do usuário 
      let denuncias = await DenunciaDao.listarDenunciasComRelacionamentos(usuarioId, tamanhoDaLista, status, dataInicial, dataFinal); //usuario_id e Limite da lista default = 20
      let usuario = {
        id: usuarioEncontrado[0].id, imagem: usuarioEncontrado[0].imagem, admin: usuarioEncontrado[0].admin,
        nome: usuarioEncontrado[0].nome
      };
      req.session.usuario = usuario;
      res.render('usuario/index', { title: 'Home', denuncias, usuario, dataInicial, dataFinal, status});
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
  
  
  //--------------------------------------------------------------------------------------------
  /* Exibir perfil do usuário */
  verUsuario: async (req, res, next) => {
    try {
      let userModel = new Usuario();
      let resultado = await UsuarioDao.buscar(userModel, 'id', req.session.usuario.id);
      let usuario = { imagem: resultado[0].imagem, nome: resultado[0].nome };
      res.render('usuario/usuario', { title: 'Perfil', usuario, error: null });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  
  
  
  //--------------------------------------------------------------------------------------------
  /* Criar um novo usuário */
  salvarUsuario: async (req, res, next) => {
    
    //A variável recebe o objeto de erros do express validator (Validação na rota)
    let e = validationResult(req);
    
    //Verificar se não ocorreram erros de validação de compos
    if (e.isEmpty()) {
      try {
        let { email, senha} = req.body;
        let model = new Usuario(email, senha);
        model.Senha = bcrypt.hashSync(senha, 10);
        let result = await UsuarioDao.salvar(model);
        let usuarioEncontrado = await UsuarioDao.buscar(model, 'id', result.insertId);

        let usuario = {
          id: usuarioEncontrado[0].id, imagem: usuarioEncontrado[0].imagem, admin: usuarioEncontrado[0].admin,
          nome: usuarioEncontrado[0].nome
        };
        req.session.usuario = usuario;

        res.redirect('/users');
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    } else {
      res.render('cadastro', { title: 'Login', error:e.errors});
    }
  },
  
  
  
  //--------------------------------------------------------------------------------------------
  //Realizar o login e validando as informações do usuário 
  login: async (req, res, next) => {
    //A variável recebe o objeto de erros do express validator (Validação na rota)
    let e = validationResult(req);
    
    //Verificar se não ocorreram erros de validação de compos
    if (e.isEmpty()) {
      try {
        let model = new Usuario();
        model.Email = req.body.email;
        model.Senha = req.body.senha;
        //Buscar o usuario
        let result = await UsuarioDao.buscar(model, 'email', model.Email, 1);
        //Verificar se encontrou um usuario com o email informado 
        if (result.length > 0) {
          //Verificar se a senha é igual 
          let correto = bcrypt.compareSync(model.Senha, result[0].senha);
          if (correto) {
            //Salvar o usuario na sessão 
            req.session.usuario = { id: result[0].id, imagem: result[0].imagem, admin: result[0].admin, nome: result[0].nome };
            //Renderizar a pagina home 
            res.redirect('/users');
          }
        } else {
          //Renderizar a pagina home informando que os dados estão inválidos
          res.render('index', { title: 'Login', error: [{ msg: 'Dados inválidos' }] });
        }
      } catch (error) {
        console.log(error);
        res.render('index', { title: 'Login', error: [{ msg: 'Dados inválidos' }] });
      }
    } else {
      res.render('index', { title: 'Login', error: e.errors });
    }
  },
  
  
  //--------------------------------------------------------------------------------------------
  //Buscar usuário cadastrado por email
  buscarUsuarioPorEmail: async (req, res, next) => {
    try {
      let model = new Usuario();
      let result = await UsuarioDao.buscar(model, 'email', req.body.email, 1);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  },
  
  
  //--------------------------------------------------------------------------------------------
  //Criar um perfil de usuário
  atualizarPerfil: async (req, res, next) => {
    try {
      //A variável recebe o objeto de erros do express validator (Validação na rota)
      let e = validationResult(req);
      let model = new Usuario();
      
      //Verificar se não ocorreram erros de validação de compos
      if (e.isEmpty()) {
        try {
          let { nome } = req.body;
          let { files } = req;
          model.Nome = nome;
          model.Id = req.session.usuario.id; //req.session.usuario.id;
          model.Imagem = req.session.usuario.imagem; //Por padrão o usuário continua com o mesmo avatar
          
          //Verifica usuário inseriu uma imagem
          console.log(files[0] != undefined);
          if (files[0] != undefined) {
            model.Imagem = files[0].originalname;
            //Verifica existe imagem para o usuário na pasta uploads
            if (req.session.usuario.imagem != 'no_image.png') {
              //Apaga imagem
              let promise = await fs.unlinkSync(path.join('public', 'avatares', req.session.usuario.imagem));
            }
          }
          
          let result = await UsuarioDao.atualizarPerfil(model);
          res.redirect('/users');
        } catch (error) {
          console.log(error);
          res.sendStatus(400);
        }
      } else {
        //Caso os inputs tenha error renderizar a página com os erros
        try {
          let usuario = req.session.usuario;
          res.render('usuario/usuario', { title: 'Perfil', usuario, error: e.errors });
        } catch (err) {
          console.log(err);
          res.sendStatus(400);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
  //--------------------------------------------------------------------------------------------
  
  //Realizar o logoff encerrando a sessão do usuário
  sair: async (req, res, next) => {
    req.session.usuario = undefined;
    res.redirect('/login');
  }
};