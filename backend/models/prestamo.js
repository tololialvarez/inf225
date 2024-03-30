'use strict';
const {
  Model
} = require('sequelize');
const usuario = require('../models/usuario');
module.exports = (sequelize, DataTypes) => {
  class prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      prestamo.belongsTo(models.Usuario,{
        foreignKey:"rut_cliente"})
    }
  }
  prestamo.init({
    tasa: DataTypes.DECIMAL,
    valor_uf: DataTypes.DECIMAL,
    plazo: DataTypes.INTEGER,
    cuota_uf: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    valor_credito: DataTypes.DECIMAL,
    rut_cliente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'prestamo',
  });
  return prestamo;
};