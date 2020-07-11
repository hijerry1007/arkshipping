'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fixtures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ChartererId: {
        type: Sequelize.INTEGER
      },
      VesselId: {
        type: Sequelize.INTEGER
      },
      minPeriod: {
        type: Sequelize.STRING
      },
      maxPeriod: {
        type: Sequelize.STRING
      },
      hire: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Fixtures');
  }
};