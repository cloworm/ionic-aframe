angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Posts', function($http) {
  return {
    createPost: function(body) {
      return $http.post('/api/posts', body)
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  };
})
.factory('Friends', function($http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return $http.get('/api/posts')
      .then(function(response) {
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
    },
    getPostLikes: function(postId) {
      return $http.get('/api/posts/' + postId + '/likes')
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    getUserLikes: function(postId, userId) {
      return $http.get('/api/posts/' + postId + '/likes/' + userId)
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    like: function(postId, body) {
      return $http.post('/api/posts/' + postId + '/likes', body)
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    unlike: function(postId, userId) {
      return $http.delete('/api/posts/' + postId + '/likes/' + userId)
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  };
});
