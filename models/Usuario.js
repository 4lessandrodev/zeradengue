/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'email': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'senha': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'data_cadastro': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'ativo': {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1',
      comment: "null"
    },
    'nome': {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'Anônimo',
      comment: "null"
    },
    'imagem': {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 'avatar.png',
      comment: "null"
    }
  }, {
      tableName: 'usuarios',
      timestamps:false,
  });
};
