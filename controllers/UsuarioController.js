const { Usuario } = require('./../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
  
  save: async (req, res) => {
    try {
      let { email, senha } = req.body;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render('cadastro', { title: 'Cadastro', error: errors.array(), email, senha });
      }
      
      
      senha = bcrypt.hashSync(senha, 10);
      let exist = await Usuario.findOne({ where: { email } });
      if (exist) {
        res.render('cadastro', { title: 'Cadastro', error: [{ msg: 'Usuário já existe' }] , email, senha });
      }
      let user = await Usuario.create({ email, senha });
      user.senha = undefined;

      req.session.USER = user;
      res.redirect('/users/home');
      
    } catch (error) {
      res.render('cadastro', { title: 'Cadastro', error: [{ msg: 'Erro' }], email:'', senha:'' });
    }
  },
  
  edit: async (req, res) => {
    try {
      
      let id = req.session.USER.id;
      let { nome } = req.body;
      let { files } = req;
      
      let result = await Usuario.update(
        { nome, imagem: files[0].filename },
        { where: { id }}
        );
        
      req.session.USER.nome = nome;
      req.session.USER.imagem = files[0].filename;
      res.redirect('/users/home');
        
    } catch (error) {
        console.log(error);
        res.send({ error: [{ msg: 'Erro' }] });
      }
    },
    
    login: async (req, res) => {
      try {
        let { email, senha } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render('index', { title: 'Login', error: errors.array(), email, senha });
        }

        const user = await Usuario.findOne({ where: { email } });
        
        if (!user) {
          res.render('index', { title: 'Login', error: [{ msg: 'Email ou senha inválido' }], email, senha });
        }
        if (!user.ativo) {
          res.render('index', { title: 'Login', error: [{ msg: 'Usuário bloqueado' }], email, senha});
        }
        const matchPassword = bcrypt.compareSync(senha, user.senha);
        if (!matchPassword) {
          res.render('index', { title: 'Login', error: [{ msg: 'Email ou senha inválido' }], email, senha });
        }
        
        user.senha = undefined;
        req.session.USER = user;
        res.redirect('/users/home');

      } catch (error) {
        res.render('index', { title: 'Login', error: [{ msg: 'Erro' }], email:'', senha:'' });
      }
    }
    
  };