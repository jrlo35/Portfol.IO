(function(){

  "use strict";

  angular
    .module('app.symbol');
    .factory('symbolFactory', symbolFactory);
    
    symbolFactory.$inject = ['http'];

    function symbolFactory($http) {

      var factory = {
        addToWatchlist:addToWatchlist,
        getCompany: getCompany
      };
      
      return factory;

      function getCompany(company) {
        return $http({
          method: 'GET',
          url: '/api/symbols/'+ company
        })
        .then( function (data) {
          var filter = [];
          var sym = data.data.ResultSet.Result;
          for(var j=0;j<sym.length;j++){
            if(sym[j].exchDisp === 'NYSE' || sym[j].exchDisp === 'NASDAQ'){
              filter.push(sym[j]);
            }
          }
          return filter;
        });
      }

      function addToWatchlist(data) {
        return $http ({
          method: 'POST',
          url:'/api/watchlist',
          data: data
        })
      }
  }
})();