'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ocorrencias', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      imagem: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: 'no_image.png',
        comment: "null"
      },
      descricao: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "null"
      },
      endereco: {
        type: Sequelize.STRING(80),
        allowNull: false,
        comment: "null"
      },
      bairro: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "null"
      },
      data_hora: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      usuarios_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '1',
        comment: "null",
        references: {
          model: 'Status',
          key: 'id'
        }
      },
      cidades_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        comment: "null",
        references: {
          model: 'cidades',
          key: 'id'
        }
      }
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ocorrencias');
  }
};
