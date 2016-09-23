angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  Friends.all()
  .then(function(friends) {
    $scope.friends = friends;
  });

  $scope.liked = false;

  $scope.toggleLike = function(postId, userId) {
    if ($scope.liked) {
      return Friends.unlike(postId, userId)
      .then(function() {
        $scope.liked = false;
      })
      .catch(function(err) {
        console.log(err);
      });
    } else {
      return Friends.like(postId, {userId: userId})
      .then(function() {
        $scope.liked = true;
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
});
