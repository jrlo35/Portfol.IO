describe('TickerController', function(){

  var $controller;
  var TickerFactory;
  var TickerController;

  beforeEach(angular.mock.module('app.ticker'));

  beforeEach(inject(function(_$controller_, _TickerFactory_){
  	$controller = _$controller_;
  	TickerFactory = _TickerFactory_;

    TickerController = $controller('TickerController', {TickerFactory: TickerFactory})
  	 
  }));

  it('should exist', function(){
  	expect('TickerController').toBeDefined();
  })

  describe('TickerFactory methods should exist', function(){
  	it('methods should exist', function(){
      expect(TickerFactory.displayTicker).toBeDefined();
      expect(TickerFactory.getAllUserStocks).toBeDefined();
      expect(TickerFactory.getAllPortfolioId).toBeDefined();
      expect(TickerFactory.stocksQuery).toBeDefined();
  	})
  })

})