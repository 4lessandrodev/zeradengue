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
  
  //-------------------------------------------------------------------------------
   //Listar Denúncias com o relacionamento de status, cidades, estados
  static listarDenunciasComRelacionamentos(limite = 20) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT oc.id, oc.imagem, oc.descricao, oc.endereco, oc.bairro, 
      DATE_FORMAT(oc.data_hora, '%d/%m/%Y') AS data, 
      st.descricao AS status, cid.descricao AS cidade, uf.sigla AS estado
      FROM ocorrencias oc
      INNER JOIN status st ON oc.status_id = st.id
      INNER JOIN cidades cid ON cid.id = oc.cidades_id
      INNER JOIN estados uf ON uf.id = cid.estados_id
      LIMIT ${limite}
      `, (err, result) => {
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

module.exports = DenunciaDao;