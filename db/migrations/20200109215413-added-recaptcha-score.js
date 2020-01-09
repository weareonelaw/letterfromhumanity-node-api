'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Signatures', 'recaptchaScore', {
      type: Sequelize.FLOAT
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Signatures', 'recaptchaScore');
  }
};
