(function () {

  "use strict";

  angular
    .module('app')
    .controller('TickerController', TickerController);
  
  TickerController.$inject = ['$http', 'TickerFactory','SymbolFactory', 'WatchlistFactory',  '$rootScope', '$location','$window', '$timeout', '$interval']
    
    
  function TickerController ($http, TickerFactory, SymbolFactory, WatchlistFactory,  $rootScope, $location, $window, $timeout, $interval) {

      /*jshint validthis: true */
    var vm = this;
    vm.stocks = [];
    vm.allstocks = [];
    vm.finalstocks = [];

    vm.isPositive = isPositive;
    vm.getAllPortfolioId = getAllPortfolioId;
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
    $scope.stocks=[];
    $scope.finalstocks=[];
    $scope.temp = [];

    var userId = $window.localStorage.getItem('com.tp.userId');

    WatchlistFactory.getWatchlist(userId)

    	.then(function (watchlist) {
        vm.stocks = watchlist;
      })

    //get all stock of a user (include both watchlist and every portfolio)
    TickerFactory.getAllPortfolioId(userId)
    .then(function (usersPortfolios) {
      TickerFactory.getAllUserStocks(usersPortfolios)
      .then(function (stocks) {

       	$scope.temp = $scope.temp.concat(stocks.data);
        $scope.temp.forEach(function (stock) {
          vm.stocks.push(stock.toUpperCase())
        })

       	TickerFactory.stocksQuery($scope.stocks)
       	.then(function (stockinfo) {

       		stockinfo.data.pop()
          stockinfo.data.forEach(function (stock) {

            stock.forEach(function (result) {

              var result1 = result.replace(/\"/g,'');
              if(/[\%]/.test(result1)) {

                var res = result1.replace(/\%/,'')
                var sign = res[0];
                var decimal = res.substr(1)
                var ans = parseFloat(decimal).toFixed(2)
                var final = sign + ans.toString()
                result1=final.concat('%')
              }
              $scope.allstocks.push(result1)
         	  })

            $scope.finalstocks.push($scope.allstocks)
            $scope.allstocks = [];
          })

          $scope.boxes = [];

            for(var i = 0; i < $scope.finalstocks.length; i++) {
               $scope.boxes.push($scope.finalstocks[i]);
            }

              //animation for ticker to move
            $scope.moving = false;
            $scope.moveLeft = function () {

              $scope.moving = true;
              $interval(function() {
               
                if ($scope.moving) {
                  $scope.boxes.push($scope.boxes.shift());
                }
                $scope.moving = !$scope.moving;
              }, 2000);
           };
           $scope.moveLeft();
         });
      });
    });
    }
    $scope.getAllPortfolioId();

  }])
})();

