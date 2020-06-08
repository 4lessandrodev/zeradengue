'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      descricao: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "null"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('status');
  }
};
