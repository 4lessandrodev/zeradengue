const { Usuario } = require('./../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {

  save: async (req, res) => {
    try {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let { email, senha } = req.body;

      senha = bcrypt.hashSync(senha, 10);
      let exist = await Usuario.findOne({ where: { email } });
      if (exist) {
        return res.send({ error: [{ msg: 'Usuário já existe' }] });
      }
      let result = await Usuario.create({ email, senha });
      result.senha = undefined;
      res.send(result);

    } catch (error) {

      res.send({ error: [{ msg: 'Erro' }] });

    }
  },

  edit: async (req, res) => {
    try {
      
      //Substituir esse id pelo id do usuário conectado
      let id = 1;
      let { nome } = req.body;
      let { files } = req;

      let result = await Usuario.update(
        { nome, imagem: files[0].filename },
        { where: { id }}
      );

      result.senha = undefined;
      res.send(result);

    } catch (error) {
      console.log(error);
      res.send({ error: [{ msg: 'Erro' }] });
    }
  }

};