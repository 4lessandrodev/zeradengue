class Usuario{

  //O construtor recebe parâmetros default de acordo com as colunas do banco de dados
  //Se a coluna do BD não aceita valores nulos a variável deve ter um valor default
  constructor (email, senha, data_cadastro=new Date(), admin=0, ativo=1, nome='Anônimo', imagem='no_image.png') {
    this.id = null; //Para aplicar filtros e buscas da model em GenericDao
    this.tableName = 'usuarios'; //Para saber qual tabela manipular no banco de dados através da GenericDao
    this.modelName = 'Usuario'; //Para saber qual atributo selecionar na classe GenericDao
    this.Usuario = { //Objeto a ser informado como json na GenericDao para salvar sem ter que informar colunas
      email,
      senha,
      admin,
      data_cadastro,
      ativo,
      nome,
      imagem
    };
  }
  

  //Getters AND Setters tem como objetivo proteger o objeto da model para não incluir atributos que não 
  //existem no banco de dados 
  get Id() {
    return this.id;
  }
  get Email() {
    return this.Usuario.email;
  }
  get Senha() {
    return this.Usuario.senha;
  }
  get Admin() {
    return this.Usuario.admin;
  } 
  get Data_cadastro() {
    return this.Usuario.data_cadastro;
  }
  get Ativo() {
    return this.Usuario.ativo;
  }
  get Nome() {
    return this.Usuario.nome;
  }
  get Imagem() {
    return this.Usuario.imagem;
  }
  
  set Email(value) {
    this.Usuario.email = value;
  }
  set Senha(value) {
    this.Usuario.senha = value;
  }
  set Admin(value) {
    this.Usuario.admin = value;
  }
  set Data_cadastro(value) {
    this.Usuario.data_cadastro = value;
  }
  set Ativo(value) {
    this.Usuario.ativo = value;
  }
  set Nome(value) {
    this.Usuario.nome = value[0].toLocaleUpperCase() + value.slice(1, value.length).toLowerCase();
  }
  set Imagem(value) {
    this.Usuario.imagem = value;
  }
  set Id(value) {
    this.id = value;
  }
}

module.exports = Usuario;