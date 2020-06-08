'use strict';
const moment = require('moment');
const date = new Date();
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ocorrencias', [
      {
        id:1,
        imagem:faker.image.imageUrl(),
        descricao:faker.random.words(3),
        endereco:faker.address.streetAddress(),
        bairro:faker.address.secondaryAddress(),
        data_hora:moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id:1,
        status_id:2,
        cidades_id:8
      },
      {
        id: 2,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 15
      },
      {
        id: 3,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 2
      },
      {
        id: 4,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 2,
        status_id: 2,
        cidades_id: 13
      },
      {
        id: 5,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 18
      },
      {
        id: 6,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 1,
        status_id: 2,
        cidades_id: 20
      },
      {
        id: 7,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 1,
        status_id: 1,
        cidades_id: 99
      },
      {
        id: 8,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 1,
        status_id: 2,
        cidades_id: 70
      },
      {
        id: 9,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 2,
        status_id: 1,
        cidades_id: 29
      },
      {
        id: 10,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 2
      },
      {
        id: 11,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 1,
        status_id: 2,
        cidades_id: 77
      },
      {
        id: 12,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 2
      },
      {
        id: 13,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 2
      },
      {
        id: 14,
        imagem: faker.image.imageUrl(),
        descricao: faker.random.words(3),
        endereco: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        data_hora: moment(date).format('YYYY-MM-DD hh:mm:ss'),
        usuarios_id: 3,
        status_id: 1,
        cidades_id: 2
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('ocorrencias', null, {});
  }
};
