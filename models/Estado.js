/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Estado', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'sigla': {
      type: DataTypes.STRING(2),
      allowNull: false,
      comment: "null"
    },
    'descricao': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
      tableName: 'estados',
      timestamps: false,
  });
};
