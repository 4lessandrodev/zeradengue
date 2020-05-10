const conect = require('./../config/database');
const fs = require('fs');
const path = require('path');

class Usuario{
  constructor (email, senha, admin, data_cadastro, ativo, nome, imagem) {
    this.Usuario = {
      email,
      senha,
      admin,
      data_cadastro,
      ativo,
      nome,
      imagem
    };
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
    this.Usuario.nome = value.toLowerCase();
  }
  set Imagem(value) {
    this.Usuario.imagem = value;
  }
  
  static buscar(email) {
    let users = fs.readFileSync(path.join('arquivos', 'usuarios.json'), { encoding: 'utf-8' });
    users = JSON.parse(users);
    return users[0];
  }
  
  static editar() {
    
  }
  
  static salvar(model) {
    let users;
    let existe = fs.existsSync(path.join('arquivos', 'usuarios.json'));
    console.log(existe);
    if (existe) {
      users = fs.readFileSync(path.join('arquivos', 'usuarios.json'), {encoding:'utf-8'});
      users = JSON.parse(users);
    } else {
      users = [];
    }
    users.push(model.Usuario);
    fs.writeFileSync(path.join('arquivos', 'usuarios.json'), JSON.stringify(users));
  }
  
  
  static excluir() {
    let existe = fs.existsSync(path.join('arquivos', 'usuarios.json'));
    if (existe) {
      fs.unlinkSync(path.join('arquivos', 'usuarios.json'));
    }
  }
}

module.exports = Usuario;