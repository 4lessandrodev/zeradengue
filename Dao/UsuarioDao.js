const conect = require('./../config/database');

const GenericDao = require('./GenericDao');
class UsuarioDao extends GenericDao{
  constructor (model) {
    super(GenericDao);
    this.Model = model;
  }

  //Salvar o perfil do usuário (nome e imagem)
  static atualizarPerfil(model) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE ${model.tableName} SET nome = ?, imagem = ? WHERE id = ?`,
        [model[model.modelName].nome, model[model.modelName].imagem, model.id], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = UsuarioDao;