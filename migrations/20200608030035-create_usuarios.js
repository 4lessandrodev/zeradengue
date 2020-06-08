'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "null",
        unique: true
      },
      senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "null"
      },
      data_cadastro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      ativo: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: '1',
        comment: "null"
      },
      nome: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: 'Anônimo',
        comment: "null"
      },
      imagem: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: 'avatar.png',
        comment: "null"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
