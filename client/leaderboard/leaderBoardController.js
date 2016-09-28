(function(){
  
  "use strict";

  angular
    .module('app.leaderboard', [])
    .controller('LeaderBoardController', LeaderBoardController);

    LeaderBoardController.$inject = ['$window', '$stateParams', 'DashboardFactory', 'leaderBoardFactory', '$location', '$rootScope']

    function LeaderBoardController($window, $stateParams, DashboardFactory, leaderBoardFactory, $location, $rootScope){
      
      var vm = this;

      vm.leagueId = $stateParams.leagueId;
      vm.portfolios;
      vm.leagueName;
      vm.userId = $window.localStorage.getItem('com.tp.userId');
      vm.getLeaderBoard = getLeaderBoard;
      vm.getLeagueById = getLeagueById;

      //get all portfolios in certain league
      function getLeaderBoard(){
        leaderBoardFactory.getPortfolios(vm.leagueId)
          .then(function(portfolios){

            var joined = false;
            for(var i=0; i<portfolios.length; i++){
              if(portfolios[i].UserId === Number(vm.userId)) joined = true;
            }
            if(!joined) {
              $window.location.href = '/#/dashboard';
              Materialize.toast('You are not in the league.',1000);
            }

            vm.portfolios = portfolios;
            vm.leagueName = portfolios[0].leaguename;
            vm.code = portfolios[0].code;
          });
      };

      //get private league code
      function getLeagueById(){
        DashboardFactory.getLeagueById(vm.leagueId).then(function(data){
          vm.secretCode = data.code;
        });
      };

      // once we have league ID, call to initialize leaderboard
      vm.getLeagueById();
      vm.getLeaderBoard();

      // to update the leaderboard when users makes portfolio trxn
      $rootScope.$on("PortfolioUpdate", function(){
        vm.getLeaderBoard();
      });
    };
})();
