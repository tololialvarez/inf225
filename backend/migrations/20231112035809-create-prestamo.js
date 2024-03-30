'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tasa: {
        type: Sequelize.DECIMAL
      },
      valor_uf: {
        type: Sequelize.DECIMAL
      },
      plazo: {
        type: Sequelize.INTEGER
      },
      cuota_uf: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      valor_credito: {
        type: Sequelize.DECIMAL
      },
      rut_cliente: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Usuarios",
          key:"rut",
          as:"rut_cliente",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prestamos');
  }
};