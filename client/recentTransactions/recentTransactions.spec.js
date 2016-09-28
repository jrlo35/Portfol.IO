describe('app.recentTransactions', function(){
    
  var $controller;
	var recentTransactionsController;
	var transactionFactory;

	beforeEach(angular.mock.module('app.recentTransactions'));

	beforeEach(inject(function(_$controller_,_transactionFactory_){
    $controller = _$controller_;
    transactionFactory = _transactionFactory_;
	}));

	recentTransactionsController = $controller('recentTransactionsController', {transactionFactory: transactionFactory});

	it('should be defined', function(){
		expect(recentTransactionsController).toBeDefined();
		expect(transactionFactory).toBeDefined();
	});
  it('.getleagueTransactions() should exist', function(){
  	expect(transactionFactory.getleagueTransactions).toBeDefined();
  })
})