'use strict';

var app = angular.module('APP_NAME');

app.controller('usersCtrl', function($scope, $window, $state, auth){
  $scope.currentState = $state.current.name.split('.')[1].toUpperCase();
  $scope.submit = function(user) {
    var submitFunc = $scope.currentState === 'LOGIN' ? auth.login : auth.register;
    submitFunc(user).success(function(res){
      $state.go('home');
    }).error(function(res){
      $scope.user = {};
      $window.alert(res.message);
    });
  };
});
