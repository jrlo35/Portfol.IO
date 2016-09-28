describe('symbolController', function(){
	var SymbolController;
	var symbolFactory;

	beforeEach(angular.mock.module('app.symbol'));

	beforeEach(inject(function(_$controller_, _$symbolFactory_){
		SymbolController = _$controller_;
		symbolFactory = _$symbolFactory_;
	}));

	it('should exist', function(){
		expect(symbolController).toBeDefined();
		expect(symbolFactory).toBeDefined();
	});

	it('symbolFactory methods should exist', function(){
		expect(symbolFactory.addToWatchlist).toBeDefined();
		expect(symbolFactory.getCompany).toBeDefined();
	})

	describe('should return a valid symbol', function(){
		var company = 'Ford';
		var result;


    symbolFactory.getCompany(company)
    .then(function(res){
    	result = res;
    });

    expect(symbolFactory.getCompany).toHaveBeenCalledWith(company);
    expect(result.length).toEqual(1);
    expect(result.symbol).toEqual('F');
	});

});