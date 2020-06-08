'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
      {
        id: 1,
        descricao: 'Pendente'
      },
      {
        id: 2,
        descricao: 'Atendido'
      },

    ], {});
   
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('status', null, {});
  }
};
