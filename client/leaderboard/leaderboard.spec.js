describe('app.leaderboard', function(){
    
  var $controller;
	var leaderboardController;
	var leaderboardFactory;

	beforeEach(angular.mock.module('app.leaderboard'));

	beforeEach(inject(function(_$controller_,_leaderBoardFactory_){
    $controller = _$controller_;
    leaderboardFactory = _leaderBoardFactory_;
	}));

	leaderboardController = $controller('leaderboardController', {leaderboardFactory: leaderboardFactory});

	it('should be defined', function(){
		expect(leaderboardController).toBeDefined();
		expect(leaderboardFactory).toBeDefined();
	});

  it('.getPortfolios should exist', function(){
  	expect(leaderboardFactory.getPortfolios).toBeDefined();
  })
})