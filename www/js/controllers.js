angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, Authentication) {
  $scope.user = null;
  console.log('user', $scope.user);
  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
  });
})

.controller('DashCtrl', function($scope, Authentication) {
  $scope.user = null;
  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
  });
})

.controller('FriendsCtrl', function($scope, Friends) {
  Friends.all()
  .then(function(friends) {
    $scope.friends = friends;
  })
  .then(function() {
    $scope.friends.forEach(function(post) {
      return Friends.getUserLikes(post.id, 1)
      .then(function(response) {
        post.liked = response;
      });
    });
  })
  .then(function() {
    $scope.friends.forEach(function(post) {
      return Friends.getPostLikes(post.id)
      .then(function(response) {
        post.likes = response;
      });
    });
  });

  $scope.toggleLike = function(postId, userId) {
    var post = $scope.friends.filter(function(singlePost) {
      return singlePost.id === postId;
    })[0];

    if (post.liked) {
      return Friends.unlike(postId, userId)
      .then(function() {
        post.liked = false;
      })
      .catch(function(err) {
        console.log(err);
      });
    } else {
      return Friends.like(postId, {userId: userId})
      .then(function() {
        post.liked = true;
      })
      .catch(function(err) {
        console.log(err);
      });
    }

  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, $sce) {
  Friends.get($stateParams.friendId)
  .then(function(friend) {
    $scope.friend = friend;
    $scope.url = friend.url;
  });

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
})

.controller('AccountCtrl', function($scope, Authentication, Users) {
  Authentication.getLoggedInUser()
  .then(function(user) {
    $scope.user = user;
  });

  $scope.updateUser = function(user) {
    Users.updateUser(user.id, user)
    .then(function(updatedUser) {
      $scope.user = updatedUser;
      console.log('updated user', $scope.user);
    });
  };
})

.controller('UploadCtrl', function($scope, Posts, FileUploader, $state) {
  $scope.uploaded = false;

  $scope.submit = function(body) {
    body.url = $scope.filePath;
    console.log('body', body);
    return Posts.createPost(body)
    .then(function() {
      $scope.uploader.queue = null;
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
      $scope.filePath = 'https://s3-us-west-2.amazonaws.com/ionic-aframe-development/' + response;

      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

});
