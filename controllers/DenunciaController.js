const { Cidade, Ocorrencia, Estado, Status } = require('./../models');
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
          usuarios_id: id,
          descricao,
          endereco,
          bairro,
          cidades_id,
          imagem: files[0].filename
        }
      );
        
      res.redirect('/users/home');
        
    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },
    
  list: async (req, res) => {
    try {
      
      const user = req.session.USER;
      const currentDate = new Date();
      let dateStart = moment(currentDate).subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss');
      let dateEnd = moment(currentDate).add(1, 'day').format('YYYY-MM-DD hh:mm:ss');
        
      let { limit = 20, status = 1, start = dateStart, end = dateEnd, page = 1 } = req.query;

      start = moment(start).format('YYYY-MM-DD hh:mm:ss');
      end = moment(end).format('YYYY-MM-DD hh:mm:ss');

      limit = parseInt(limit);
      page = parseInt(page - 1);
      let { count: size, rows: ocorrencias } = await Ocorrencia.findAndCountAll(
        {
          where: {
            usuarios_id: user.id,
            status_id: status,
            data_hora: { [Op.between]: [start, end] },
          },
          include: [
            {
              model: Status,
              as: 'status',
              required: true
            }
          ],
          limit,
          offset: page * limit
        }
      );
        
      //res.send(ocorrencias);
      res.render('usuario/index', { title: 'Home', user, size, ocorrencias, start, end, status, moment });
          
    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },
      
  find: async (req, res) => {
    try {
      const user = req.session.USER;
      let { id } = req.params;
      let ocorrencia = await Ocorrencia.findOne(
        {
          where: {
            id,
            usuarios_id: user.id
          },
          include: [
            {
              model: Cidade,
              as: 'cidade',
              required: true,
              include: [
                {
                  model: Estado,
                  as: 'estados',
                  required: true
                }
              ],
            },
            {
              model: Status,
              as: 'status',
              required: true
            }
          ]
        });
      
      if (!ocorrencia) {
        res.redirect('/users/home');
      }
            
      res.render('usuario/denuncia-selecionada', { title: 'Denúncia Selecionada', user, ocorrencia });
            
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
            required: true
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