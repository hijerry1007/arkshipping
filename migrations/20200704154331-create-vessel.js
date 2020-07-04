'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vessels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      IMONumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      blt: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      teu: {
        type: Sequelize.STRING
      },
      homo: {
        type: Sequelize.STRING
      },
      reefer: {
        type: Sequelize.STRING
      },
      dwt: {
        type: Sequelize.STRING
      },
      draft: {
        type: Sequelize.STRING
      },
      gear: {
        type: Sequelize.STRING
      },
      loa: {
        type: Sequelize.STRING
      },
      beam: {
        type: Sequelize.STRING
      },
      spdcon: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      opendate: {
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
    await queryInterface.dropTable('Vessels');
  }
};