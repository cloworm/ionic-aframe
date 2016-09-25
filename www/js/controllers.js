angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $rootScope, Authentication) {
  $scope.user = null;

  $rootScope.$on('loggedOut', function() {
    $scope.user = null;
  });

  function getUser() {
    Authentication.getLoggedInUser()
    .then(function(user) {
      $scope.user = user;
    });
  }
  getUser();
})

.controller('DashCtrl', function($scope, $rootScope, Authentication, $state) {

  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
    if (user && !user.username) {
      $state.go('tab.account');
    } else {
      $state.go('tab.friends');
    }
  });
})

.controller('FriendsCtrl', function($scope, Friends, Authentication) {
  $scope.user = null;

  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
  });

  function getAllPosts() {
    Friends.all()
    .then(function(posts) {
      $scope.posts = posts;
      getAllPostLikes($scope.posts);

      if ($scope.user) {
        getAllUserLikes($scope.posts);
      }
    });
  }

  function getAllUserLikes(posts) {
    posts.forEach(function(post) {
      return Friends.getUserLikes(post.id, $scope.user.id)
      .then(function(response) {
        post.liked = response;
      });
    });
  }

  function getAllPostLikes(posts) {
    posts.forEach(function(post) {
      return Friends.getPostLikes(post.id)
      .then(function(response) {
        post.likes = response;
      });
    });
  }

  getAllPosts();

  $scope.toggleLike = function(postId) {
    var post = $scope.posts.filter(function(singlePost) {
      return singlePost.id === postId;
    })[0];

    if (post.liked) {
      return Friends.unlike(postId, $scope.user.id)
      .then(function() {
        post.liked = false;
        --post.likes.length;
      })
      .catch(function(err) {
        console.log(err);
      });
    } else {
      return Friends.like(postId, {userId: $scope.user.id})
      .then(function() {
        post.liked = true;
        ++post.likes.length;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, $sce) {
  Friends.get($stateParams.friendId)
  .then(function(post) {
    $scope.post = post;
    $scope.url = post.url;
  });

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
})

.controller('UserProfileCtrl', function($scope, $stateParams, Posts, Users, Authentication) {
  $scope.sameUser = false;

  Posts.getPostsByUserId($stateParams.userId)
  .then(function(posts) {
    $scope.posts = posts;
  });

  Users.getUserById($stateParams.userId)
  .then(function(user) {
    $scope.user = user;
  });

  Authentication.getLoggedInUser()
  .then(function(user) {
    if (user && user.id === $scope.user.id) {
      $scope.sameUser = true;
    }
  });

  $scope.deletePost = function(id) {
    return Posts.deletePostById(id)
    .then(function() {
      $scope.posts = $scope.posts.filter(function(post) {
        return post.id !== id;
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  };
})

.controller('AccountCtrl', function($scope, $rootScope, $state, Authentication, Users) {

  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
  });

  $scope.updateUser = function(user) {
    Users.updateUser(user.id, user)
    .then(function(updatedUser) {
      $scope.user = updatedUser;
      $scope.updated = true;
    });
  };

  $scope.logout = function() {
    return Authentication.logout()
    .then(function() {
      $scope.user = null;
      $rootScope.$broadcast('loggedOut');
      $state.go('tab.dash');
    })
    .catch(function(err) {
      console.log(err);
    });
  };
})

.controller('UploadCtrl', function($scope, Posts, FileUploader, $state) {
  $scope.uploaded = false;

  $scope.submit = function(body) {
    body.url = $scope.filePath;
    return Posts.createPost(body)
    .then(function(post) {
      console.log('POSTED', post);
      $scope.uploader.queue = [];
      $scope.uploaded = false;
      $state.go('tab.friends');
    });
  };

  var uploader = $scope.uploader = new FileUploader({
    queueLimit: 1,
    url: '/api/posts/image'
  });

  // FILTERS

  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    $scope.uploaded = true;
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      $scope.uploaded = true;
      $scope.filePath = 'http://s3-us-west-2.amazonaws.com/ionic-aframe-development/' + response;

      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

});
