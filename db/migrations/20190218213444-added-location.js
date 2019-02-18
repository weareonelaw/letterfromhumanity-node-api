'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Signatures', 'location', {
      type: Sequelize.STRING(50),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Signatures', 'location');
  }
};
