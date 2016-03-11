app.controller('LeaderBoardController', function($scope, leaderBoardFactory){

  // members will be an object of each member in the league
  // containing name, portfolio value, and other stats
  // desired to go on the leaderboard
  $scope.members = [
    {
      username: 'Sonny',
      value: 15000,
      return: '10%',
      transactions: 25
    },
    {
      username: 'Ted',
      value: 9000,
      return: '20%',
      transactions: 45
    },
    {
      username: 'Devonte',
      value: 3567,
      return: '6%',
      transactions: 5
    }
  ];

  $scope.leagueId;

  $scope.getLeaderBoard = function(leagueId){
    // this will call a factory function to grab http data from server and assign returned data to $scope.members;
    leaderBoardFactory.getMembers(leagueId).then(function(members){
      $scope.members = members;
    })
  };

  // once we have league ID, call to initialize leaderboard
  //$scope.getLeaderBoard(leagueId);

});