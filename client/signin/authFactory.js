app.factory('Auth', function($http, $location, $window){

  var createuser = function(user){
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
    .then(function(data){
      return data.data;
    });
  };

  var loginuser = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(data){
      console.log("data", data)
      return data.data;
    })
  };

  var forgotpw = function(email){
    return $http({
      method: 'POST',
      url: '/api/users/forgotpw',
      data: {
          email: email
      }
    })
    .then(function(data){
      return data.data;
    })
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.tp');
  };

  return {
    isAuth: isAuth,
    createuser: createuser,
    forgotpw: forgotpw,
    loginuser: loginuser
  };
    app.factory('AttachTokens', function ($window) {
      // this is an $httpInterceptor
      // its job is to stop all out going request
      // then look in local storage and find the user's token
      // then add it to the header so the server can validate the request
      "use strict";

      var attach = {
        request: function (object) {

          var jwt = $window.localStorage.getItem('com.tp');
              if (jwt) {
                  object.headers['x-access-token'] = jwt;
              }
              object.headers['Allow-Control-Allow-Origin'] = '*';
              return object;
          }
      };
      return attach;
  })
  .run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
      "use strict";

      $rootScope.$on('$stateChangeStart', function (evt, next, current) {
    // if (next.$$state && next.$$state.authenticate && !Auth.isAuth()) {
          if (!Auth.isAuth()) {
              $location.path('/');
          }
      });
  });
  $httpProvider.interceptors.push('AttachTokens');

});