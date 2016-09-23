'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'googleId', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
   queryInterface.removeColumn('Users', 'googleId');
  }
};
