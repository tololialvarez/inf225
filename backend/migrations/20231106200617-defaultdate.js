'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('prestamos', 'createdAt', {
      type: Sequelize.DATE, // Mantén el tipo de datos original
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Agrega el valor predeterminado 'activo'
    });

    await queryInterface.changeColumn('prestamos', 'updatedAt', {
      type: Sequelize.DATE, // Mantén el tipo de datos original
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Agrega el valor predeterminado 'activo'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // En la operación de reversión, puedes dejar la columna como estaba antes
    await queryInterface.changeColumn('Usuarios', 'estado', {
      type: Sequelize.DATE // Mantén el tipo de datos original
    });
  }
};
