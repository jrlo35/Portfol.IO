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

  describe('WatchlistFactory methods should exist', function(){
    it('methods should exist', function(){
      expect(WatchlistFactory.getWatchlist).toBeDefined();
      expect(WatchlistFactory.updateWatchlist).toBeDefined();
      expect(WatchlistFactory.removeFromWatchlist).toBeDefined();
    })
  })

})