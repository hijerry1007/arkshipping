'use strict';

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
    return queryInterface.bulkInsert('Vessels', [{
      name: 'Bien Dong Navigator',
      IMONumber: '9279226',
      blt: '2004',
      type: 'CV Neptune 1500',
      teu: '1,028',
      homo: '711',
      reefer: '200',
      dwt: '13,479',
      draft: '8.3',
      gear: 'Yes',
      loa: '150.7',
      beam: '22.9',
      spdcon: '19.25/41',
      place: 'EX DD Ho Chi Ming',
      opendate: '7/25-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Vessels', null, {})

  }
};
