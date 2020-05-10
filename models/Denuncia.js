class Denuncia {

  //O construtor recebe parâmetros default de acordo com as colunas do banco de dados
  //Se a coluna do BD não aceita valores nulos a variável deve ter um valor default
  constructor (descricao, endereco, bairro, cidades_id, usuarios_id, status_id = 1, imagem = 'no_image.png', data_hora = new Date()) {
    this.id = null; //Para aplicar filtros e buscas da model em GenericDao
    this.tableName = 'ocorrencias'; //Para saber qual tabela manipular no banco de dados através da GenericDao
    this.modelName = 'Denuncia'; //Para saber qual atributo selecionar na classe GenericDao
    this.Denuncia = { //Objeto a ser informado como json na GenericDao para salvar sem ter que informar colunas
      descricao,
      endereco,
      bairro,
      cidades_id,
      data_hora,
      usuarios_id,
      status_id,
      imagem
    };
  }


  //Getters AND Setters tem como objetivo proteger o objeto da model para não incluir atributos que não 
  //existem no banco de dados 
  get Id() {
    return this.id;
  }
  get Descricao() {
    return this.Denuncia.descricao;
  }
  get Endereco() {
    return this.Denuncia.endereco;
  }
  get Bairro() {
    return this.Denuncia.bairro;
  }
  get Cidades_id() {
    return this.Denuncia.cidades_id;
  }
  get Usuarios_id() {
    return this.Denuncia.usuarios_id;
  }
  get Data_hora() {
    return this.Denuncia.data_hora;
  }
  get Imagem() {
    return this.Denuncia.imagem;
  }
 
  get Status_id() {
    return this.Denuncia.status_id;
  }

  set Descricao(value) {
    this.Denuncia.descricao = value;
  }
  set Endereco(value) {
    this.Denuncia.endereco = value;
  }
  set Bairro(value) {
    this.Denuncia.bairro = value;
  }
  set Cidades_id(value) {
    this.Denuncia.cidades_id = value;
  }
  set Usuarios_id(value) {
    this.Denuncia.usuarios_id = value;
  }
  set Data_hora(value) {
    this.Denuncia.data_hora = value;
  }
  set Imagem(value) {
    this.Denuncia.imagem = value;
  }
  set Id(value) {
    this.id = value;
  }
  set Status_id(value) {
    this.Denuncia.status_id = value;
  }
}

module.exports = Denuncia;