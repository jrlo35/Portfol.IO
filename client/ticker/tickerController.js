(function () {

  "use strict";

  angular
    .module('app')
    .controller('TickerController', TickerController);
  
  TickerController.$inject = ['$http', 'TickerFactory','SymbolFactory', 'WatchlistFactory',  '$rootScope', '$location','$window', '$timeout', '$interval'];
    
    
  function TickerController($http, TickerFactory, SymbolFactory, WatchlistFactory,  $rootScope, $location, $window, $timeout, $interval) {

      /*jshint validthis: true */
    var vm = this;
    vm.stocks = [];

    vm.isPositive = isPositive;
    vm.getAllPortfolioId = getAllPortfolioId;
    activate();

    function activate() {
      return TickerFactory.getAllPortfolioId()
    }
  }

  vm.boxes = [];
  vm.ticker = true;

  $rootScope.$on('search', function () {
    vm.ticker = false;
    setTimeout(function () {
      vm.ticker = true;
      $rootScope.$emit('off');
    }, 15000);
  });

  function getAllPortfolioId () {

    var userId = $window.localStorage.getItem('com.tp.userId');

    //watchlist stocks
    WatchlistFactory.getWatchlist(userId)

    	.then(function (watchlist) {
        vm.stocks = watchlist;
      })

    //get all users stocks in all portfolios
    TickerFactory.getAllPortfolioId(userId)
    .then(function (usersPortfolios) {

      TickerFactory.getAllUserStocks(usersPortfolios)
      .then(function (stocks) {
        vm.stocks.concat(stocks);
      })
      //returns array
      TickerFactory.stocksQuery(vm.stocks)
       	.then(function (finalStocks) {
          vm.boxes = [];
          for(var i = 0; i < finalstocks.length; i++) {
            vm.boxes.push(finalstocks[i]);
          }
          //animation for ticker to move
          vm.moving = false;
          vm.moveLeft = function () {
            vm.moving = true;
            $interval(function() {

              if (vm.moving) {
                vm.boxes.push(vm.boxes.shift());
              }
              vm.moving = !vm.moving;
            }, 2000);
          };
          vm.moveLeft();
        });
      });
  }

  //chage color base on positive or negative price change
  function isPositive (val) {
    if (!val) {
      return;
    }
    val = val.slice(0,-1);
    var result = parseFloat(val);
    if(result > 0) {
      return 'positive';
      }
      else {
        return 'negative';
      }
  };
})();

