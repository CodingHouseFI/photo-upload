'use strict';

var app = angular.module('APP_NAME', ['ui.router', 'ui.bootstrap']);

app.constant('tokenStorageKey', 'my-token');

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/general/home.html', controller: 'homeCtrl' })
    .state('upload', { url: '/upload', templateUrl: '/html/photos/upload.html', controller: 'uploadCtrl' })
    .state('photos', { url: '/photos', templateUrl: '/html/photos/photos.html', controller: 'photoCtrl' })

    .state('users', { abstract: true, templateUrl: '/html/users/users.html'})
    .state('users.login', { url: '/login', templateUrl: '/html/users/form.html', controller: 'usersCtrl'})
    .state('users.register', { url: '/register', templateUrl: '/html/users/form.html', controller: 'usersCtrl'});

  $urlRouterProvider.otherwise('/');
});
