angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function($http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return $http.get('/api/posts')
      .then(function(response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    get: function(postId) {
      return $http.get('/api/posts/' + postId)
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  };
});
