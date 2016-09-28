
(function () {

  'use strict';

   angular
    .module('app.watchlist',[])
    .controller('WatchlistController', WatchlistController);

    WatchlistController.$inject = ['$http', 'symbolFactory', 'WatchlistFactory',  '$rootScope', '$location','$window']
    function WatchlistController($http, symbolFactory, WatchlistFactory,  $rootScope, $location, $window) {

      var vm = this;
      var watchlist = [];
      var stock = [];
      vm.results;

      vm.addStock = addStock;
      vm.closeModal = closeModal;
      vm.isPositive = isPositive;
      vm.getStock = getStock;
      vm.getWatchlist = getWatchlist;
      vm.openModal = openModal;
      vm.reload = reload;
      vm.removeFromWatchlist = removeFromWatchlist;
      vm.sendToChart = sendToChart;


      var userid = $window.localStorage.getItem('com.tp.userId');

      //Gives red and green coloring to percentages
      function isPositive(val) {

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


      function openModal(){
        $('#modal1').openModal();
      };

      function closeModal(){
        $('#modal1').closeModal();
      };

      function reload(){
        vm.getWatchlist();
      };


      function getStock(stock) {
        
        vm.symbolResults = [];
        
        var symbol;
        symbolFactory.getCompany(stock)
        .then(function (filter) {

          if(!filter.length) {
            Materialize.toast('Company could not be found on NYSE or NASDAQ! Check for spaces and punctuation', 5000);
          }

          filter.forEach(function(sym){
            vm.symbolResults.push({'symbol' : sym.symbol, 'name': sym.name});
          })
          vm.stockName = '';
        });
      };

      //Get watchlist and filter response
      function getWatchlist() {

          var watchlist = [];
          vm.results = [];
          
          //returns list of stocks in watchlist
          WatchlistFactory.getWatchlist(userid)

          .then(function (list) {
            for(var stock in list.data) {
              watchlist.push(stock);
            }
          
          //retrieves watchlist stock data
          WatchlistFactory.updateWatchlist(watchlist)
          .then(function (results) {
            vm.results = results;
          });
        });
      };

     //remove from watchlist
      function removeFromWatchlist(symbol) {

        var userid = $window.localStorage.getItem('com.tp.userId');

        var data = {
          symbol: symbol,
          userid: userid
        };
        WatchlistFactory.removeFromWatchlist(data)
        .then(function(res){
          Materialize.toast('Removed from Watchlist', 3000);
          vm.getWatchlist();
        });
      };

      //Add to watchlist
      function addStock(symbol) {

        symbol = symbol.toUpperCase();
        vm.userId = $window.localStorage.getItem('com.tp.userId');
        
        WatchlistFactory.getWatchlist(vm.userId)
        .then(function (list) {
          Materialize.toast('Watchlist Updated', 3000);
        });
        var data = {
          userid : vm.userId,
          symbol : symbol
        };
        symbolFactory.addToWatchlist(data)
        .then(function(res) {
          $rootScope.$emit('addedToWatchlist');
          vm.stockSym = '';
        });
      };

      //click to view chart data
      function sendToChart(symbol) {

        $window.sym = symbol;

        $location.path('/analysis');
      };


      $rootScope.$on('addedToWatchlist', function () {
        vm.getWatchlist();
      });
      
      vm.getWatchlist();
    };
})();

