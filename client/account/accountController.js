(function(){

  "use strict";

  angular
    .module('app')
    .controller('AccountController', AccountController);
      
    AccountController.$inject = ['$scope', '$window', 'AccountFactory', '$location', '$rootScope']
    
    function AccountController($scope, $window, AccountFactory, $location, $rootScope){
      
      var vm = this;
      
      vm.active = 'accountInfo';
      vm.editMode = false;
      vm.id = $window.localStorage.getItem('com.tp.userId');
      vm.name = $window.localStorage.getItem('com.tp.username');

      vm.cancel = cancel;
      vm.delete = deleteUser;
      vm.deleteLeague = deleteLeague;
      vm.editEmail = editEmail;
      vm.editLeague = editLeague;
      vm.editLeagues = editLeagues;
      vm.editPW = editPW;
      vm.getLeaguesByOwnerId = getLeaguesByOwnerId;
      vm.getUser = getUser;
      vm.selectLeague = selectLeague;
      vm.showAccount = showAccount;
      vm.toggleEditMode = toggleEditMode;
      vm.updateEmail = updateEmail;
      vm.updatePw = updatePW;
      vm.upload = upload;



      //delete user 
      function deleteUser(){
        var userid = vm.id;
        swal({   title: "Are you sure?",
          text: "You will not be able to recover.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false },
          function(isConfirm){
            if (isConfirm) {
              swal("Deleted!",
               "Your account has been deleted.",
                "success");
              AccountFactory.deleteAccount(userid);
              $location.path('/');
              $rootScope.$emit('deleted', {});
            } else {
              swal("Cancelled",
              "Your account is safe :)",
              "error");
            }
          });
      };

      //get leagues by userid
      function getLeaguesByOwnerId(){
        AccountFactory.getLeaguesByOwnerId(vm.id).then(function(data){
          vm.leagues = data;
        });
      };

      vm.getLeaguesByOwnerId();

      function getUser(){
        AccountFactory.getSingleUser($vm.id)
          .then(function(user){
            vm.user = user;
            vm.email = user.email;
            vm.image = user.image;
          });
      };

      vm.getUser();

      vm.newemail = {};
      vm.newemail.userId = vm.id;

      vm.newpw = {};
      vm.newpw.userId = vm.id;

      vm.change = false;

      function editPW(){
        vm.active = 'updatepw';
        resetEditMode();
      };
      function editEmail(){
        vm.active = 'editEmail';
        resetEditMode();
      };
      function editLeagues(){
        vm.active = 'editLeagues';
        resetEditMode();
      };
      function showAccount(){
        vm.active = 'accountInfo';
        resetEditMode();
      };
      function cancel(){
        vm.newlogin = {};
      };

      function toggleEditMode(){
        if (vm.editMode){
          resetEditMode();
        } else {
          vm.editMode = true;
        }
      };

      function resetEditMode(){
        vm.editMode = false;
        vm.currentLeague = {};
      }

      function selectLeague(league){
        vm.toggleEditMode();
        vm.currentLeague = league;
      };

      //edit leagues user created
      function editLeague(){
        var league = vm.currentLeague;

        var start = moment(league.start).utc().hour(13).minute(30);
        var end = moment(league.end).utc().hour(20);
        league.start = start.format();
        league.end = end.format();

        console.log('league being sent', league);

        AccountFactory.editOneLeague(league.id, league).then(function(league){
          console.log('factory callback', league);

          swal('League Updated!', 'Everyone wants to play but nobody wants to organize the game. Good job!');
        });
      };

      //clear out input box
      function clearemailupdate(){
        vm.newemail.email = '';
        vm.newemail.confirmemail = '';
        vm.newemail.password = '';
      };

      //clear out input box
      function clearpwupdate(){
        vm.newpw.newpw = '';
        vm.newpw.oldpw = '';
        vm.newpw.confirmnewpw = '';
      };

      //allow user to update email
      function updateEmail(newemail){
        if(newemail.email !== newemail.confirmemail){
          Materialize.toast('Email did not match.', 2000);
          return;
        }
        AccountFactory.updateEmail(vm.newemail)
          .then(function(user){
            if(user === 'Wrong password' ){
              Materialize.toast('Incorrect Password!.', 2000);
            }else if(user === 'Email taken'){
              Materialize.toast('Email is already taken.', 2000);
            }else if(user === 'Email updated'){
              Materialize.toast('Email updated', 2000);
              clearemailupdate();
            }else{
              Materialize.toast('No user found!', 2000);
            }
          });
      };

      //allow user to update password
      function updatePW(newpw){
        if(newpw.newpw !== newpw.confirmnewpw){
          Materialize.toast('New passwords do not match.', 2000);
          return;
        }
        AccountFactory.updatePW(vm.newpw)
          .then(function(user){
            if(user === 'Wrong password' ){
              Materialize.toast('Incorrect Password!.', 2000);
            }else if(user === 'Password updated'){
              Materialize.toast('Password updated', 2000);
              clearpwupdate();
            }else{
              Materialize.toast('No user found!', 2000);
            }
          });
      };

      //delete leagues user created
      function deleteLeague(){
        swal({title: "Are you sure?",
              text: "All associated portfolios and transactions will also be removed",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false },
              function(){
                swal("Deleted!", "Your league has been deleted!", "success");
                AccountFactory.deleteLeagueById(vm.currentLeague.id)
                  .then(function(data){
                    vm.getLeaguesByOwnerId();
                    vm.toggleEditMode();
                  });
              });
      };

      //update user profile image
      function upload(file) {
        var r = new FileReader();
        r.onload = function(){
          AccountFactory.profileImage({
            image: r.result,
            userId: vm.id
          })
            .then(function (resp) {
                Materialize.toast('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data, 5000);
            }, function (resp) {
                Materialize.toast('Error', 5000);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
        r.readAsDataURL(file);
        vm.file = file;
      };

    };
})();
