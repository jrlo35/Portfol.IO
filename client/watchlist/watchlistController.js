
(function () {

  'use strict';

  angular
    .module('app')
    .controller('WatchlistController', WatchlistController);

  WatchlistController.$inject = ['$scope', '$http', 'symbolFactory', 'WatchlistFactory',  '$rootScope', '$location','$window']
  function WatchlistController($scope, $http, symbolFactory, WatchlistFactory,  $rootScope, $location, $window) {


    } 
  $scope.watchlist = [];
  $scope.results =[];
  $scope.stock=[];

var userid = $window.localStorage.getItem('com.tp.userId');

//Gives red and green coloring to percentages
$scope.isPositive = function (val) {

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


$scope.openModal = function(){
  $('#modal1').openModal();
};

$scope.closeModal = function(){
  $('#modal1').closeModal();
};

$scope.reload = function(){
  $scope.getWatchlist();
};


$scope.getStock = function (stock) {
  
 $scope.symbolResults = [];
  var filter =[];
  var symbol;
  symbolFactory.getCompany(stock).then(function (data) {

    var sym = data.data.ResultSet.Result;
    for(var j=0;j<sym.length;j++){
       if(sym[j].exchDisp === 'NYSE' || sym[j].exchDisp === 'NASDAQ'){
         filter.push(sym[j]);
       }
    }
    if(!filter.length) {
      Materialize.toast('Company could not be found on NYSE or NASDAQ! Check for spaces and punctuation', 5000);
    }

    for(var i=0;i<filter.length;i++){
      $scope.symbolResults.push({'symbol' : filter[i].symbol, 'name': filter[i].name});
      }
    $scope.stockName = '';
  });

};

//Get watchlist and filter response
$scope.getWatchlist = function () {

    $scope.watchlist =[];
    $scope.results=[];

    WatchlistFactory.getWatchlist(userid)

    .then(function (list) {
      for(var stock in list.data) {
        $scope.watchlist.push(stock);
      }

    WatchlistFactory.updateWatchlist($scope.watchlist)
    .then(function (stocks) {

      stocks.data.pop();
      stocks.data.forEach(function (stock) {
 
        stock.forEach(function (result) {

          var result1 = result.replace(/\"/g,'');
          if(/[\%]/.test(result1)) {

            var res = result1.replace(/\%/,'');
            var sign = res[0];
            var decimal = res.substr(1);
            var ans = parseFloat(decimal).toFixed(2);
            var final = sign + ans.toString();
            result1 = final.concat('%');

          }
          else if(/[\-]/.test(result1)) {
            var range = [];
            result1 = result1.split('-');
            result1.forEach(function (num) {
              result1 = parseFloat(num).toFixed(2);
              range.push(result1);
            })
            result1 = range.join('-');
          }
          $scope.stock.push(result1);
        })

        $scope.results.push($scope.stock);
        $scope.stock=[];
      });
    });
  });
};

 //remove from watchlist
  $scope.removeFromWatchlist = function (symbol) {

    var userid = $window.localStorage.getItem('com.tp.userId');

    var data = {
      symbol: symbol,
      userid: userid
    };
    WatchlistFactory.removeFromWatchlist(data)
    .then(function(yo){
      Materialize.toast('Removed from Watchlist', 3000);
      $scope.getWatchlist();
    });
  };

$scope.stockSym = '';


//Add to watchlist
  $scope.addStock = function (symbol) {

    symbol = symbol.toUpperCase();
    $scope.userId = $window.localStorage.getItem('com.tp.userId');

    Materialize.toast('Watchlist Updated', 3000);
    WatchlistFactory.getWatchlist($scope.userId)
    .then(function (list) {
    });
    var data = {
      userid : $scope.userId,
      symbol : symbol
    };
  symbolFactory.addToWatchlist(data)
  .then(function () {
    $rootScope.$emit('addedToWatchlist');
    $scope.stockSym = '';
  });
};

//click to view chart data
  $scope.sendToChart = function (symbol) {

    $window.sym = symbol;

    $location.path('/analysis');
  };


  $rootScope.$on('addedToWatchlist', function () {

    $scope.getWatchlist();
  });
  function activate() {
    return WatchlistFactory.getWatchlist().then(function(data) {

      return 
    })
  }
  $scope.getWatchlist();
}]);
})()

