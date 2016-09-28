describe('app.watchlist', function(){

	var $controller;
	var WatchlistFactory;

  beforeEach(angular.mock.module('app.watchlist'));

  beforeEach(inject(function(_$controller_, _$WatchlistFactory_)){
  	$controller = _$controller_;
    WatchlistFactory = _$WatchlistFactory_;

  });

  describe('WatchlistController', function(){
  	var WatchlistController;

  	WatchlistController = $controller('WatchlistController', {WatchlistFactory: WatchlistFactory});

  	it('should be defined', function(){
  		expect(WatchlistController).toBeDefined();
  	});

  	it('should be defined', function(){
  		expect(WatchlistFactory).toBeDefined();
  	})

  });

  describe('should return watchlist', function(){
  	var WatchlistController;

  	beforeEach(function(){
  		spyOn(WatchlistFactory, 'getWatchlist')
  	})

    WatchlistController = $controller('WatchlistController', {WatchlistFactory: WatchlistFactory});
  });
  


})