(function(){

  "use strict";

  angular
    .module('app')
    .factory('AnalysisFactory', AnalysisFactory);
    
    AnalysisFactory.$inject = ['$http'];

    function AnalysisFactory($http){

      var factory = {
        getChart: getChart,
        getInfo: getInfo,
      };

      return factory;

      function getChart(stock) {
        
        return $http({
          method: 'POST',
          url: '/api/analysis',
          data: stock
        })
        .then(function(data){
        });
      };

      function getInfo(stock) {

        return $http({
          method: 'POST',
          url: '/api/analysis/getinfo',
          data: stock
        })
        .then(function (stock) {
          return stock.data;
        });
      };
    };
})();