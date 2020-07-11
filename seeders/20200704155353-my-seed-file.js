'use strict';
const vesselData = require('../public/data/vesselData.json');
const { query } = require('express');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('Charterers', [{
      name: 'Ever Green',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Wan Hai Lines',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Yang Ming Lines',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    let seederData = []
    for (let i = 0; i < vesselData.data.length; i++) {
      vesselData.data[i].createdAt = new Date()
      vesselData.data[i].updatedAt = new Date()
      seederData.push(vesselData.data[i])
    }


    return queryInterface.bulkInsert('Vessels', seederData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Charterers', null, {})
    return queryInterface.bulkDelete('Vessels', null, {})

  }
};
