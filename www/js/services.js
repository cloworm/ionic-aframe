angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
 .directive('ngThumb', ['$window', function($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function(item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function(file) {
      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function(scope, element, attributes) {
      if (!helper.support) return;

      var params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
}])
.factory('Users', function($http) {
  return {
    updateUser: function(userId, body) {
      return $http.put('/api/users/' + userId, body)
      .then(function(response) {
        return response.data;
      });
    },

    getUserById: function(userId) {
      return $http.get('/api/users/' + userId)
      .then(function(response) {
        return response.data;
      });
    }
  };
})
.factory('Authentication', function($http) {
  return {
    getLoggedInUser: function() {
      return $http.get('/auth/me')
      .then(function(response) {
        return response.data;
      })
      .then(function(userId) {
        return $http.get('/api/users/' + userId);
      })
      .then(function(response) {
        return response.data;
      });
    },

    logout: function() {
      return $http.delete('/auth/me')
      .then(function(response) {
        return response.data;
      });
    }
  };
})
.factory('Posts', function($http) {
  return {
    createPost: function(body) {
      return $http.post('/api/posts', body)
      .then(function(response) {
        return response.data;
      });
    },

    getPostsByUserId: function(userId) {
      return $http.get('/api/users/' + userId + '/posts')
      .then(function(response) {
        return response.data;
      });
    },

    deletePostById: function(postId) {
      return $http.delete('/api/posts/' + postId)
      .then(function(response) {
        return response.data;
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
      });
    },
    get: function(postId) {
      return $http.get('/api/posts/' + postId)
      .then(function(response) {
        return response.data;
      });
    },
    getPostLikes: function(postId) {
      return $http.get('/api/posts/' + postId + '/likes')
      .then(function(response) {
        return response.data;
      });
    },
    getUserLikes: function(postId, userId) {
      return $http.get('/api/posts/' + postId + '/likes/' + userId)
      .then(function(response) {
        return response.data;
      });
    },
    like: function(postId, body) {
      return $http.post('/api/posts/' + postId + '/likes', body)
      .then(function(response) {
        return response.data;
      });
    },
    unlike: function(postId, userId) {
      return $http.delete('/api/posts/' + postId + '/likes/' + userId)
      .then(function(response) {
        return response.data;
      });
    }
  };
});
