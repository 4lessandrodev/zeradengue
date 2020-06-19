/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let Cidade = sequelize.define('Cidade', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'descricao': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null"
    },
    'cep': {
      type: DataTypes.STRING(8),
      allowNull: false,
      comment: "null"
    },
    'estados_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Estado',
        key: 'id'
      }
    }
  }, {
      tableName: 'cidades',
      timestamps: false,
  });

  Cidade.associate = (models) => {
    Cidade.belongsTo(models.Estado, { foreignKey:'estados_id', as:'estados'});
  };

  return Cidade;
};
