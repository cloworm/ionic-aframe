angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Lake', url: '/img/lake.jpg' },
    { id: 1, name: 'Porch', url: '/img/porch.jpg'},
    { id: 2, name: 'Night', url: '/img/night.jpg'},
    { id: 3, name: 'Maze', url: '/img/maze.jpg'}
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
