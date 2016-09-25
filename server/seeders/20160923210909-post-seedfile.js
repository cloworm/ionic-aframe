'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [{
      title: 'Porch',
      UserId: 1,
      description: 'Look at my porch my porch is amazing.',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/10320117256_a9da392287_k+(1).jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Maze',
      UserId: 2,
      description: 'A maze ing',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/3538046700_31bb9614db_b.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'City',
      UserId: 2,
      description: 'A nice evening',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/5097827282_2f7d27c37c_b.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Night Park',
      UserId: 1,
      description: 'A Park at night',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/6876258662_11dd769c95_h.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Street',
      UserId: 1,
      description: 'A Street at night',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/6979883093_7f0680e9b8_h.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Subway',
      UserId: 1,
      description: 'Graffiti at the subway',
      url: 'http://s3-us-west-2.amazonaws.com/ionic-aframe/6979891545_8196a04ac8_h.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
