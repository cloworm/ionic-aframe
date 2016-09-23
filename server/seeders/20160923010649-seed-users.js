'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Mary',
      email: 'mary@example.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Bob',
      email: 'bob@example.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
