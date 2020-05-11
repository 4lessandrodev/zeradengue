const GenericDao = require('./GenericDao');
const conect = require('./../config/database');

//-------------------------------------------------------------------------------
class DenunciaDao extends GenericDao {
  constructor (model) {
    super(GenericDao);
    this.Model = model;
  }
  //-------------------------------------------------------------------------------
  //Listar cidades via api
  static listarCidades(param, limit = 7) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT cid.id, cid.descricao, uf.sigla 
      FROM cidades cid
      INNER JOIN estados uf ON cid.estados_id = uf.id
      WHERE cid.descricao LIKE '%${param}%'
      ORDER BY cid.descricao ASC
      LIMIT ${limit}
      `, (err, result) => {
        if (err) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    });
  }

  //-------------------------------------------------------------------------------
  //Listar cidades ao carregar a página de denúncias
  static listarCidadesPagina(limit = 7) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT cid.id, cid.descricao, uf.sigla 
      FROM cidades cid
      INNER JOIN estados uf ON cid.estados_id = uf.id
      ORDER BY cid.descricao ASC
      LIMIT ${limit}
      `, (err, result) => {
        if (err) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    });
  }

}

module.exports = DenunciaDao;