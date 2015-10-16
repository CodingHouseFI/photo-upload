'use strict';

var app = angular.module('APP_NAME');

app.controller('photoCtrl', function($scope, $http) {
  $http.get('/files')
  .then(function(res){
    $scope.photos = res.data;
  });
});
