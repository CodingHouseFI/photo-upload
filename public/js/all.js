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

'use strict';

var app = angular.module('APP_NAME');

app.controller('homeCtrl', function($scope) {
});

'use strict';

var app = angular.module('APP_NAME');

app.controller('navCtrl', function($scope, $state, auth) {
  $scope.logout = function() {
    auth.logout();
    $state.go('home');
  };
});

'use strict';

var app = angular.module('APP_NAME');

app.controller('photoCtrl', function($scope, $http) {
  $http.get('/files')
  .then(function(res){
    $scope.photos = res.data;
  });
});

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

'use strict';

var app = angular.module('APP_NAME');

app.factory('auth', function($window, $http, tokenStorageKey) {
  var auth = {};

  auth.saveToken = function(token) {
    $window.localStorage[tokenStorageKey] = token;
  };

  auth.getToken = function() {
    return $window.localStorage[tokenStorageKey];
  };

  auth.isLoggedIn = function(){
    var token = auth.getToken();
    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  };

  auth.register = function(user){
    return $http.post('/users/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.login = function(user){
    return $http.post('/users/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logout = function(){
    $window.localStorage.removeItem(tokenStorageKey);
  };

  return auth;
});
