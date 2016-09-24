angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
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

.controller('AccountCtrl', function($scope) {
})

.controller('UploadCtrl', function($scope, Posts, FileUploader) {
  // $scope.submit = function(body) {
  //   console.log($scope.fileName);
  //   console.log('body', body);
    // return Posts.createPost(body)
    // .then(function(response) {
    //   console.log(response);
    // })
  // }
  $scope.uploader = new FileUploader({
    url: '/api/posts'
  });

});
