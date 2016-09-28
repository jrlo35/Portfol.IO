(function(){
 
  "use strict";

  angular
    .module('app')
    .factory('DashboardFactory', DashboardFactory);

    DashboardFactory.$inject = ['http'];

    function DashboardFactory($http){

      var factory = {
        addLeague: addLeague,
        getUserLeagues: getUserLeagues,
        getAvailLeagues: getAvailLeagues,
        joinLeague: joinLeague,
        getLeagueById: getLeagueById,
        getPortfolios: getPortfolios
      };

      return factory;

      function addLeague(league){
        return $http({
          method: 'POST',
          url: '/api/leagues',
          data: league
        })
        .then( function(league){
          return league.data;
        });
      };

      function joinleague(leagueId, userId){
        return $http({
          method: 'POST',
          url: '/api/leagues/joinleague',
          data: { leagueId: leagueId,
                  userId: userId }
        })
        .then( function(data){
          return data;
        });
      };

      function getUserLeagues(userId){
        return $http({
          method: 'POST',
          url: '/api/leagues/userleague',
          data: {userId: userId}
        })
        .then( function (portfolios) {

          return portfolios.data;
        }
        );
      };

      function getAvailLeagues(){
        return $http({
          method: 'GET',
          url: '/api/leagues/'
        })
        .then(function(leagues){

          return leagues.data;
        });
      };

      function getLeagueById(id){
        return $http({
          method: 'GET',
          url: '/api/leagues/'+id
        })
        .then(function(leagues){

          return leagues.data;
        });
      }

      function getPortfolios(leagueID){
        return $http({
          method: 'POST',
          url: '/api/leagues/getusers',
          data: {leagueId: leagueID}
        })
        .then(function(portfolios){
          return portfolios.data;
        });
      };

      
    }
})();