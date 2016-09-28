(function () {

angular
  .module('app')
  .controller('SigninController', SigninController);

SigninController.$inject = ['$scope', '$window', 'Auth', 'DirectMessage', '$rootScope', 'DashboardFactory', 'LeagueInvite'];

function SigninController ($scope, $window, Auth, DirectMessage, $rootScope, DashboardFactory, LeagueInvite) {

  vm = this;
  vm.authorize = authorize;
  vm.forgot = forgot;
  vm.forgotpassword = forgotpassword;
  vm.signup = signup;
  vm.toggleForgot = toggleForgot;
  vm.toggleLogin = toggleLogin;
  vm.toggleSignup = toggleSignup;


  vm.user = {};
  vm.id = $window.localStorage.getItem('com.tp.userId') || undefined;

  vm.username;
  //toggle signup modal directive
  vm.showsignup = false;
  function toggleSignup () {
    vm.showsignup = !vm.showsignup;
  };

  vm.showlogin = false;
  function toggleLogin () {
    vm.showlogin = !vm.showlogin;
  };

  vm.showforgot = false;
  function toggleForgot () {
    vm.showforgot = !vm.showforgot;
    vm.emailsent = false;
  };

  
    //new user signup
  function signup (user) {
    Auth.createuser(user)
      .then(function(data) {
        if(data === 'Email already in use'){
          Materialize.toast('Email already in use.', 2000);
          $scope.clearsignup();
        }else if(data === 'Username already exist'){
          Materialize.toast('Username is taken.', 2000);
          $scope.clearsignup();
        }else if(data.token){
          $window.localStorage.setItem('com.tp', data.token);
          $window.localStorage.setItem('com.tp.userId', data.userId);
          $window.localStorage.setItem('com.tp.username', data.username);
          $scope.username = $window.localStorage.getItem('com.tp.username');
          $scope.id = $window.localStorage.getItem('com.tp.userId');
          $scope.toggleSignup();
          $scope.loggedin = true;
          $window.location.href = '/#/dashboard';
        }
      });
  };


  


  function authorize (){
    if(Auth.isAuth()){
      $scope.loggedin = true;
      $scope.username = $window.localStorage.getItem('com.tp.username');
    }else{
      $scope.loggedin = false;
    }
  };

  $scope.authorize();

  $rootScope.$on('deleted', function(){
    $scope.loggedin = false;
  });

  function forgot (){
    $scope.toggleLogin();
    $scope.toggleForgot();
  };

  $scope.emailsent = false;
  function forgotpassword (email){
    if(email) $window.localStorage.setItem('email', email);
    if(!email) email = $window.localStorage.getItem('email');
    Auth.forgotpw(email)
      .then(function(data){
        if(data === 'User not found'){
          Materialize.toast('Cannot find the email you entered', 1000);
        }else{
          $scope.emailsent = true;
        }
      });
  };

  //clear out input fields
  function clearsignup (){
    $scope.user.username = '';
    $scope.user.password = '';
    $scope.user.email = '';
  };

  

  //user login
  function signin (user){
    Auth.loginuser(user).then(function(data){
      if(data === 'User not found'){
        Materialize.toast('No user found.', 2000);
        $scope.clearsignup();
      }else if(data === 'Wrong password'){
        Materialize.toast('Incorrect password.', 2000);
        $scope.clearsignup();
      }else if(data.token){
        $window.localStorage.setItem('com.tp', data.token);
        $window.localStorage.setItem('com.tp.userId', data.userId);
        $window.localStorage.setItem('com.tp.username', data.username);
        $scope.username = $window.localStorage.getItem('com.tp.username');
        $scope.id = $window.localStorage.getItem('com.tp.userId');
        $scope.toggleLogin();
        $scope.loggedin = true;
        $window.location.href = '/#/dashboard';
        $rootScope.$emit('userSignedIn');
      }else{
        $window.location.href = '/#/';
      }
    });
  };

  //remove everything from localstorage
  function logout (user){
    $scope.loggedin = false;
    $window.localStorage.removeItem('com.tp');
    $window.localStorage.removeItem('com.tp.userId');
    $window.localStorage.removeItem('com.tp.username');
    $window.location.href = '/#/';
  };

  //get all user's leagues
  function getUserLeagues () {
    var userId = $window.localStorage.getItem('com.tp.userId');
    DashboardFactory.getUserLeagues(userId)
      .then(function(userLeagues){
        $scope.userLeagues = userLeagues;
      });
  };


  $window.onload = function (e) {
    $scope.getUserLeagues();
  };

  $rootScope.$on('userSignedIn', function(){
     $scope.getUserLeagues();
   });

  $rootScope.$on('newleague', function(){
    $scope.getUserLeagues();
  });

  // Handle's Messages Notifications
  function getOpenAndUnreadMessages (){
    counter = 0;
    DirectMessage.getOpenAndUnreadMessages($scope.id).then(function(data){
      //if current user was last person to send message, set message thread status to be read
      data = data.map(function(message){
        if ($scope.id == message.UserId){
          message.read = true;
          return message;
        } else if (!!!message.read){
          //if a message is unread, adds it to the counter
          counter++;
        }
        return message;
      });

      // only update it ng-model if value changes
      if (counter !== $scope.unreadMessages){
        $scope.unreadMessages = counter;
      }

    });
  }

  function getInvitesByUserId () {
    LeagueInvite.getInvitesByUserId($scope.id).then(function(data){
      $scope.invites = data;

      // updating counter
      var counter = 0;
      $scope.invites.forEach(function(invite){
        if (!invite.read) {
          counter++;
        }
      });
      $scope.unreadInvites = counter;
    });
  }

  function updateMessageCenter () {
    getOpenAndUnreadMessages();
    getInvitesByUserId();
  }

  if ($scope.id){
    setInterval(updateMessageCenter, 3000);
  }

  function notdone (league) {
    return !league.leagueEnded;
  };

}]);
})()