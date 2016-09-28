(function () {

  "use strict";

  angular
    .module('app.ticker',[])
    .controller('TickerController', TickerController);
  
  TickerController.$inject = ['$http', 'TickerFactory','SymbolFactory', 'WatchlistFactory',  '$rootScope', '$location','$window', '$timeout', '$interval'];
    
  function TickerController ($http, TickerFactory, SymbolFactory, WatchlistFactory,  $rootScope, $location, $window, $timeout, $interval) {
    var vm = this;

    vm.boxes = [];
    vm.isPositive = isPositive;
    vm.moveLeft = moveLeft;
    vm.stocks = [];
    vm.ticker = true;
    
    activate();

    function activate () {
      return getAllPortfolioId();
    }

    function getAllPortfolioId () {
      var userId = $window.localStorage.getItem('com.tp.userId');

      //watchlist stocks
      WatchlistFactory
        .getWatchlist(userId)
    	  .then(function (watchlist) {
          vm.stocks = watchlist;
        })
        .catch(showError);

      //get all users stocks in all portfolios
      TickerFactory
        .getAllPortfolioId(userId)
        .then(function (usersPortfolios) {
          TickerFactory
            .getAllUserStocks(usersPortfolios)
            .then(function (stocks) {
              vm.stocks.concat(stocks);
            })
            .catch(showError);

          //returns array
          TickerFactory
            .stocksQuery(vm.stocks)
           	.then(function (finalStocks) {
              TickerFactory
                .displayTicker(finalStocks)
                .then(function (boxes) {
                  vm.boxes = boxes;
                
                  //animation for ticker to move
                  vm.moving = false;

                  function moveLeft() {
                    vm.moving = true;
                    $interval(function () {
                      if (vm.moving) {
                        vm.boxes.push(vm.boxes.shift());
                      }
                      vm.moving = !vm.moving;
                    }, 2000);
                  }
                  vm.moveLeft();
                })
                .catch(showError);
            })
            .catch(showError);
        });
    }

    //chage color base on positive or negative price change
    function isPositive (val) {
      if (!val) {
        return;
      }
      val = val.slice(0,-1);
      var result = parseFloat(val);
      if (result > 0) {
        return 'positive';
      }
      else {
        return 'negative';
      }
    }

    $rootScope.$on('search', function () {
      vm.ticker = false;
      $timeout(function () {
        vm.ticker = true;
        $rootScope.$emit('off');
      }, 15000);
    });

    function showError (err) {
      console.error(err);
    }
  }
})();
