(function(){

  "use strict";

  angular
  .module('app.symbol', [])
  .controller('SymbolController', SymbolController);
    
  SymbolController.$inject = ['$http', 'WatchlistFactory','symbolFactory', 'Portfolio', '$rootScope', '$window'];

  function ($http, WatchlistFactory, symbolFactory, Portfolio, $rootScope, $window) {

    var vm = this;
    
    vm.results = [];
    vm.stockName;
     
    vm.closeModal = closeModal;
    vm.addToWatchlist = addToWatchlist;
    vm.getStock = getStock;
    vm.openModal = openModal;
    vm.populate = populate;

    

    // function to find stock symbol by stock name
    function getStock(stock) {

      vm.results = [];
      symbolFactory.getCompany(stock).then(function(filter){
        
        if(!filter.length){
          Materialize.toast('Company could not be found on NYSE or NASDAQ! Check for spaces and punctuation', 5000);
        }
        filter.forEach(function(stock){
          vm.results.push({'symbol' : stock.symbol, 'name': stock.name});
        })
        
        vm.stockName = '';
      });

    };
    //once symbol retrieved, this function can add it directly to watchlist
    function addToWatchlist(symbol) {

      vm.userId = $window.localStorage.getItem('com.tp.userId');

      
      
      var data = {
        userid : vm.userId,
        symbol : symbol
      };

      symbolFactory.addToWatchlist(data)
      .then(function(success){
        Materialize.toast('Watchlist Updated', 3000);
      });
      
    };
    // MODAL FUNCTIONALITY OPEN AND CLOSE
    function openModal(){
      $('#modal1').openModal();
    };

    function closeModal(){
      $('#modal1').closeModal();
    };
    // functionality to populate buy/sell symbol field with symbol
    function populate(symbol) {
      $rootScope.$emit('symbolRetrieved', symbol);
      vm.closeModal();
    };


  };

})();
