const Denuncia = require('./../models/Denuncia');
const Usuario = require('./../models/Usuario');
const UsuarioDao = require('./../Dao/UsuarioDao');
const DenunciaDao = require('./../Dao/DenunciaDao');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

module.exports = {
  
  //--------------------------------------------------------------------------------------------
  /* Carregar a página principal */
  index: async (req, res, next) => {
    try {
      let userModel = new Usuario();
      let denuncias = await DenunciaDao.listarDenunciasComRelacionamentos(20);
      let resultado = await UsuarioDao.buscar(userModel, 'id', req.session.usuario.id);
      let usuario = { id: resultado[0].id, imagem: resultado[0].imagem, admin: resultado[0].admin, nome: resultado[0].nome };
      req.session.usuario = usuario;
      console.log(JSON.stringify(denuncias[0]));
      res.render('usuario/index', { title: 'Home', denuncias, usuario});
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
      let resultado = await UsuarioDao.buscar(userModel, 'id', 1);
      let usuario = { imagem: resultado[0].imagem, nome: resultado[0].nome };
      res.render('usuario/usuario', { title: 'Perfil', usuario, error: null });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  
  
  
  //--------------------------------------------------------------------------------------------
  /* Salvar o perfil do usuário */
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
          model.Imagem = files[0].originalname;
          model.Id = 1; //req.session.usuario.id;
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