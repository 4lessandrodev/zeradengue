const conect = require('./../config/database');

//-------------------------------------------------------------------------------
class GenericDao{
  constructor (model) {
    this.Model = model;
  }
  //-----------------------------------SALVAR--------------------------------------------
  //Salvar um elemento no banco de dados de acordo com as informações passadas 
  static salvar(model) {
    //Salvar a model
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO ${model.tableName} SET ?`, model[model.modelName], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------EDITAR--------------------------------------------
  //Editar um elemento no banco de dados de acordo com o ID informado
  static editar(model) {
    //Editar a model
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE ${model.tableName} SET ? WHERE id = ?`, [model[model.modelName], model.id], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------EXCLUIR--------------------------------------------
  //Excluir um elemento no banco de dados de acordo com o ID informado
  static excluir(model) {
    //Excluir a model
    return new Promise((resolve, reject) => {
      conect.query(`DELETE ${model.tableName} WHERE id = ?`, [model.id], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------LISTAR--------------------------------------------
  //listar por padrão 10 elementos do banco de dados, caso queira mais de 10, 
  //o parâmetro limite deve ser informado
  static listar(model, LIMIT = 10) {
    //Listar a model
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM ${model.tableName} LIMIT ${LIMIT}`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------BUSCAR--------------------------------------------
  //Buscar genérico, recebe o objeto model, a coluna como string a qual será aplicado o filtro de busca, 
  //o valor a ser filtrado, opcional o limite de valores por padrão é 1, e
  //Se desejar colocar o like de 1 a 3 para aplicar o filtro aproximado
  //Exemplo 
  //like = 0: Por Padrão = busca absoluta; (like = america)
  //like = 1: Deve ser informado 1, filtro termina com o valor informado; (like = amer%)
  //like = 2: Deve ser informado 2, filtro começa com o valor informado; (like = %merica)
  //like = 3: Deve ser informado 3, filtro está entre o valor informado; (like = %meri%)
  static buscar(model, dbColumn, filterValue, LIMIT = 1, like ='0') {
    let inicio;
    let fim;
    switch (like) {
      case '0':
      inicio = '';
      fim = '';
      break;
      case '1':
      inicio = '%';
      fim = '';
      break;
      case '2':
      inicio = '';
      fim = '%';
      break;
      case '3':
      inicio = '%';
      fim = '%';
      break;
      default:
      inicio = '';
      fim = '';
      break;
    }
    //Buscar model
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM ${model.tableName} WHERE ${dbColumn} LIKE '${inicio}${filterValue}${fim}' LIMIT ${LIMIT}`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-------------------------------------------------------------------------------
}
module.exports = GenericDao;