'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      defaultValue: 'http://lorempixel.com/50/50',
      isUrl: true
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'avatar');
  }
};
