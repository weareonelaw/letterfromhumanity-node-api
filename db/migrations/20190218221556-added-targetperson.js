'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Signatures', 'targetPerson', {
      type: Sequelize.STRING(50),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Signatures', 'targetPerson');
  }
};
