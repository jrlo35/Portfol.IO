(function(){

  "use strict";

	angular
	  .module('app.portfolio', [])
		.controller('PortfolioController', PortfolioController);
			
		PortfolioController.$inject = ['$scope', '$window', '$stateParams', 'Portfolio', '$rootScope'];

		function($scope, $window, $stateParams, Portfolio, $rootScope){

			var vm = this;

			vm.leagueId = $stateParams.leagueId;
			vm.userId = $window.localStorage.getItem('com.tp.userId');
			vm.fees = 10;
			vm.estPrice = 0;
			vm.action = false;
			vm.singlePrice = 0;
			$rootScope.$on('symbolRetrieved', function(event, data){
				return vm.chooseStock(data);
			});
      
      vm.chooseStock = chooseStock;
      vm.performAction = performAction;
			vm.resetFields = resetFields;
			vm.sellStock = sellStock;
			vm.updateAmounts = updateAmounts;
			vm.updateMarketPrice = updateMarketPrice;
			vm.updatePortfolio = updatePortfolio;
			vm.twoDecimal = twoDecimal;

			//clear all inputs;
			function resetFields(){
				vm.stock = undefined;
				vm.stockAmount = '';
				vm.stockInput = '';
				vm.estPrice = '';
				vm.singlePrice = '';
				vm.total = '';
				vm.action = false;
			};

			function chooseStock(stockName){
				stockName = stockName.toLowerCase();
				Portfolio.getStock(stockName).then(function(stock){
					stock = stock.data;
					if(stock.Ask === 'N/A'){
						Materialize.toast('Please enter a valid symbol!',3000);
					}
					else {
					vm.stock = stock;
					vm.estPrice = stock.Ask;
					vm.singlePrice = stock.Ask;
				}
				});
				vm.resetFields();
			};

			// Either buys a stock or sells it depending on selection
			function performAction(){
				var leagueId = $stateParams.leagueId;
				var userId = $window.localStorage.getItem('com.tp.userId');
				var options = {
					symbol: vm.stock.symbol,
					company: vm.stock.Name,
					leagueId: leagueId,
					userId:  userId,
					shares: vm.stockAmount,
					price: vm.stock.Ask,
					marketPrice: vm.stock.Ask,
					buysell: !vm.action,
					dayorder: !vm.duration
				};
				// if selling stock, must own it and enough shares
				if (!options.buysell && !ableToSell()){
					return false;
				} else if (options.buysell && vm.total > vm.balance){
					Materialize.toast("Your balance isn't high enough to make this trade", 3000, 'rounded');
					return false;
				} else if (options.buysell && Number(vm.singlePrice) < Number(vm.stock.Ask)){
					options.price = vm.singlePrice;
					options.executed = false;
					Portfolio.limitOrder(options).then(function(data){
					});
					Materialize.toast("Your limit order has been placed", 3000, 'rounded');
					vm.resetFields();
					return false;
				} else {
					options.executed = true;
					Portfolio.limitOrder(options).then(function(data){
					});
					Portfolio.buySell(options).then(function(data){
						Materialize.toast('You traded '+options.shares+' shares in '+options.company, 3000, 'rounded');
						vm.resetFields();

					}).then(function(){
						$rootScope.$emit('bought');
						$rootScope.$emit('recentTrxn');
						vm.updateMarketPrice();
						updatePortfolio();
					});
				}
			};

			//update portfolio stock prices
			$rootScope.$on('update', function(){
				vm.updateMarketPrice();
				updatePortfolio();
			});

			//check if user selling stocks within what he owns
			function ableToSell(){
				for (var i = 0; i < vm.stocks.length; i++){
					if (vm.stocks[i].symbol === vm.stock.symbol){
						if (vm.stockAmount <= vm.stocks[i].shares){
							return true;
						} else {
							Materialize.toast('You are selling more shares in this company than you own', 3000, 'rounded');
							return false;
						}
					}
				}
				Materialize.toast('You do not own this share to sell', 3000, 'rounded');
				return false;
			}

			//on click sell stock symbol in portofolio component
			function sellStock(stock){
		    vm.chooseStock(stock.symbol);
		    vm.action = true;

				//animation to scroll
				$('html, body').animate({
		        scrollTop: $(".make-trades").offset().top
		    }, 1500);
			};

			//on change - calculate total cost amount
			function updateAmounts(){
				vm.estPrice = vm.stockAmount * vm.singlePrice;
				vm.total = vm.estPrice + vm.fees;
			};

			//update market price for portfolio
			function updateMarketPrice(){
					updatePortfolio();
					if (vm.stocks.length > 0){
						Portfolio.updateUserStocks(vm.leagueId, vm.userId).then(function(stocks){

						  if (stocks.error){
						  	Materialize.toast('Error updating market prices. Try again in a 30 seconds.', 5000, 'rounded');
						  } else {
						  	Materialize.toast('Market Price Updated', 3000, 'rounded');
						  	updatePortfolio();
						  }
						});
					}
				};

			function updatePortfolio(){
				var leagueId = $stateParams.leagueId;
				var userId = $window.localStorage.getItem('com.tp.userId');


				//updating user balance
				Portfolio.getPortfolio(leagueId, userId).then(function(portfolio){
					vm.balance = portfolio.balance;
					vm.portfolioValue = portfolio.portfolioValue;

				});

				//updating users purchased stocks
				Portfolio.getUserStocks(leagueId, userId).then(function(transactions){
					vm.stocks = transactions;

		      transactions.forEach(function(transaction){
		        transaction.percentage = (transaction.marketPrice*transaction.shares)/(vm.portfolioValue)*100;
		      });

					vm.stocks = transactions;
				});

		    $rootScope.$emit("PortfolioUpdate", {});
			}

			function twoDecimal(val){
					return val.toFixed(2);
			};

			vm.updatePortfolio();

		};

})();