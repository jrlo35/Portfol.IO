
(function (){
  "use strict";

  angular
    .module('app')
    .factory('AccountFactory', AccountFactory)
    
    AccountFactory.$inject = ['$http'];

    function AccountFactory ($http){
    
      var factory = {
        deleteAccount: deleteAccount,
        getSingleUser: getSingleUser,
        getLeaguesByOwnerId: getLeaguesByOwnerId,
        editOneLeague: editOneLeague,
        deleteLeagueById: deleteLeagueById,
        getSingleUser: getSingleUser,
        profileImage: profileImage,
        updateEmail: updateEmail,
        updatePW: updatePW
      };

      return factory; 
      
      function deleteAccount(userID){
        return $http({
          method: 'DELETE',
          url: 'api/users/',
          data: {id: userID},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        })
        .then(function(user){
          console.log(user + ', successfully deleted');
        });
      };

      function getSingleUser(userID){
        return $http({
          method: 'POST',
          url: 'api/users/getuser',
          data: {id: userID},
        })
        .then(function(user){
          return user.data;
        });
      };


      function getLeaguesByOwnerId(id){
        return $http({
          method: 'GET',
          url: '/api/leagues/owner/'+id
        })
        .then(function(leagues){
          // TODO: Structure this appropriately once you have the exact route
          return leagues.data;
        });
      };

      function editOneLeague(id, data){
        return $http({
          method: 'PUT',
          url: '/api/leagues/'+id,
          data: data
        })
        .then(function(league){

        });
      };

      function deleteLeagueById(id, data){
        return $http({
          method: 'DELETE',
          url: '/api/leagues/'+id
        })
        .then(function(data){
          console.log(data);
        });
      };

      function profileImage(data){
        return $http({
          method: 'POST',
          url: 'api/users/profileimage',
          data: data,
        })
        .then(function(user){
          return user.data;
        });
      };

      function updateEmail(newemail){
        return $http({
          method: 'POST',
          url: 'api/users/updateemail',
          data: newemail
        })
        .then(function(user){
          return user.data;
        })
      };

      function updatePW(newpw){
        return $http({
          method: 'POST',
          url: 'api/users/updatepw',
          data: newpw
        })
        .then(function(user){
          return user.data;
        })
      };

    }}
})();
