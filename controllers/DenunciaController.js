const { Cidade, Ocorrencia, Estado } = require('./../models');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  
  save: async (req, res) => {
    try {

      let id = req.session.USER.id;
      let {
        descricao,
        endereco,
        bairro,
        cidades_id
      } = req.body;

      let { files } = req;

      let result = await Ocorrencia.create(
        {
          usuarios_id:id,
          descricao,
          endereco,
          bairro,
          cidades_id,
          imagem:files[0].filename
        }
      );

      res.redirect('/users/home');

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },

  list: async (req, res) => {
    try {
      //Id do usuário conectado
      let id = 1;

      const currentDate = new Date();
      let dateStart = moment(currentDate).subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss');
      let dateEnd = moment(currentDate).add(1, 'day').format('YYYY-MM-DD hh:mm:ss');

      let { limit = 20, status = 1, start = dateStart, end = dateEnd, page=1 } = req.query;
      limit = parseInt(limit);
      page = parseInt(page - 1);
      let { count: size, rows: ocorrencias } = await Ocorrencia.findAndCountAll(
        {
          where: {
            usuarios_id: id,
            status_id: status,
            data_hora: { [Op.between]: [start, end] },
          },
          limit,
          offset:page * limit
        }
      );

      res.send({ size, ocorrencias });

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },

  find: async (req, res) => {
    try {
      
      let userId = 1;
      let { id } = req.params;
      let ocorrencia = await Ocorrencia.findOne(
        {
          where: {
            id,
            usuarios_id: userId
          }
        });

      if (!ocorrencia) {
        return res.send({ ocorrencia:{} });
      }
      res.send({ ocorrencia });

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });  
    }
  },

  renderizarDenuncia: async (req, res) => {
    try {
      const user = req.session.USER;

      const cidades = await Cidade.findAll(
        {
          limit: 50,
          include: [{
            model: Estado,
            as: 'estados',
            required:true
          }]
        }
      );

      //res.send(cidades);
      res.render('usuario/denuncia', { title: 'Denúncia', user, cidades });

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  }
  
};