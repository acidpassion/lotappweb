angular.module('starter.controllers', ["starter.services"])

.controller('DashCtrl', function($scope) {




})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope, $http, API_ENDPOINT,  filters, $ionicLoading) {
  $scope.submit = function(){
    $scope.show();
     $http({
          method: 'PUT',
          url: API_ENDPOINT.host + ':' + API_ENDPOINT.port + '/api/filters/59aacc5a1aeb20026da68700',
          data: $scope.data,
          headers: {'Content-Type': 'application/json'}
      })
      .success(function(response) {
          // handle success things
          $scope.hide();
          console.log(response);
      })
      .error(function(data, status, headers, config) {
          $scope.hide();
          console.log(response);
          // handle error things
      })



  }
  $scope.data = filters;
  $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
  $scope.hide = function(){
      $ionicLoading.hide();
    };




});
