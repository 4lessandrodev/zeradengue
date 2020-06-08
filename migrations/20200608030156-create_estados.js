'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('estados', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      sigla: {
        type: Sequelize.STRING(2),
        allowNull: false,
        comment: "null"
      },
      descricao: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: "null"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('estados');
  }
};
