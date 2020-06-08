'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('estados', [
      { id: 1, sigla: 'AC', descricao: 'ACRE' },
      { id: 2, sigla: 'AL', descricao: 'ALAGOAS' },
      { id: 3, sigla: 'AP', descricao: 'AMAPÁ' },
      { id: 4, sigla: 'AM', descricao: 'AMAZONAS' },
      { id: 5, sigla: 'BA', descricao: 'BAHIA' },
      { id: 6, sigla: 'CE', descricao: 'CEARÁ' },
      { id: 7, sigla: 'DF', descricao: 'DISTRITO FEDERAL' },
      { id: 8, sigla: 'ES', descricao: 'ESPÍRITO SANTO' },
      { id: 9, sigla: 'RR', descricao: 'RORAIMA' },
      { id: 10, sigla: 'GO', descricao: 'GOIÁS' },
      { id: 11, sigla: 'MA', descricao: 'MARANHÃO' },
      { id: 12, sigla: 'MT', descricao: 'MATO GROSSO' },
      { id: 13, sigla: 'MS', descricao: 'MATO GROSSO DO SUL' },
      { id: 14, sigla: 'MG', descricao: 'MINAS GERAIS' },
      { id: 15, sigla: 'PA', descricao: 'PARÁ' },
      { id: 16, sigla: 'PB', descricao: 'PARAÍBA' },
      { id: 17, sigla: 'PR', descricao: 'PARANÁ' },
      { id: 18, sigla: 'PE', descricao: 'PERNAMBUCO' },
      { id: 19, sigla: 'PI', descricao: 'PIAUÍ' },
      { id: 20, sigla: 'RJ', descricao: 'RIO DE JANEIRO' },
      { id: 21, sigla: 'RN', descricao: 'RIO GRANDE DO NORTE' },
      { id: 22, sigla: 'RS', descricao: 'RIO GRANDE DO SUL' },
      { id: 23, sigla: 'RO', descricao: 'RONDÔNIA' },
      { id: 24, sigla: 'TO', descricao: 'TOCANTINS' },
      { id: 25, sigla: 'SC', descricao: 'SANTA CATARINA' },
      { id: 26, sigla: 'SP', descricao: 'SÃO PAULO' },
      { id: 27, sigla: 'SE', descricao: 'SERGIPE' },
    ], {});
  
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('estados', null, {});
  }
};
