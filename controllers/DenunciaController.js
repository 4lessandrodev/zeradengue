const { Ocorrencia } = require('./../models');
module.exports = {
  
  save: async (req, res) => {
    try {
      
      //Usuário conectado
      let id = 1;
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

      res.send(result);

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  }
  
};