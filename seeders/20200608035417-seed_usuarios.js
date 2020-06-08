'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');
const moment = require('moment');
const date = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
      {
        id:1,
        email: faker.internet.exampleEmail(),
        senha: bcrypt.hashSync('abc132', 10),
        data_cadastro:moment(date).format('YYYY-MM-DD hh:mm:ss'),
        ativo:1,
        nome: faker.name.findName(),
        imagem:faker.internet.avatar()
      },
      {
        id: 2,
        email: faker.internet.exampleEmail(),
        senha: bcrypt.hashSync('acb312', 10),
        data_cadastro: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        ativo: 1,
        nome: faker.name.findName(),
        imagem: faker.internet.avatar()
      },
      {
        id: 3,
        email: faker.internet.exampleEmail(),
        senha: bcrypt.hashSync('cba321', 10),
        data_cadastro: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        ativo: 1,
        nome: faker.name.findName(),
        imagem: faker.internet.avatar()
      },
      {
        id: 4,
        email: faker.internet.exampleEmail(),
        senha: bcrypt.hashSync('abc321', 10),
        data_cadastro: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        ativo:1,
        nome: faker.name.findName(),
        imagem: faker.internet.avatar()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('usuarios', null, {});
  }
};
