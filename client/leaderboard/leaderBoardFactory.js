(function(){

  "use strict";

    angular
      .module('app')
      .factory('leaderBoardFactory', leaderBoardFactory);

      leaderBoardFactory.$inject = ['$http'];
      
      function leaderBoardFactory ($http){
        
        var factory = {
          getPortfolios: getPortfolios
        };

        return factory;

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