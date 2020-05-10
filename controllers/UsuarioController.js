const DenunciaDao = require('./../models/Denuncia');
const UsuarioDao = require('./../models/Usuario');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

module.exports = {

  /* Carregar a página principal */
  index: async (req, res, next) => {
    try {
      let denuncias = await DenunciaDao.listar();
      let usuario = await UsuarioDao.buscar();
      res.render('usuario/index', { title: 'Home', denuncias, usuario});
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },

  /* Carregar a página de nova denúncia */
  novaDenuncia: async (req, res, next) => {

  },

  /* Salvar uma nova denúncia */
  denunciar: async (req, res, next) => {

  },

  /* Ver uma denúncia selecionada */
  verDenuncia: async (req, res, next) => {

  },

  /* Exibir perfil do usuário */
  verUsuario: async (req, res, next) => {

  },

  /* Salvar o perfil do usuário */
  salvarUsuario: async (req, res, next) => {
    let e = validationResult(req);
  
    if (e.isEmpty()) {
      try {
        let { email, senha, admin, data_cadastro, ativo, nome, imagem } = req.body;
        let usuario = new UsuarioDao(email, senha, admin, data_cadastro, ativo, nome, imagem);
        usuario.Senha = bcrypt.hashSync(senha, 10);
        res.redirect('/users');
        //UsuarioDao.excluir();
        res.send("Salvou");
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    } else {
      res.render('cadastro', { title: 'Login', error:e.errors});
    }
  },

  //Buscar usuário cadastrado por email
  buscarUsuarioPorEmail: async (req, res, next) => {
    try {
      let usuario = await UsuarioDao.buscar();
      return usuario;
    } catch (error) {
      console.log(error);
    }
  }
};