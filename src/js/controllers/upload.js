'use strict';

var app = angular.module('APP_NAME');

app.controller('uploadCtrl', function($scope, $http) {
  $scope.uploadFile = function(files) {
    console.log('files:', files);
    var fd = new FormData();
  //   //Take the first selected file
    fd.append("file", files[0]);

    $http.post('/files', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    })
    .success(function(res){
      console.log(res);
    }).error(function(res){
      console.log(res);
    });
  };
});
