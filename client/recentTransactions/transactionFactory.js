(function(){
  
  "use strict";

  angular
    .module('app.recentTransactions')  
    .factory('transactionFactory', transactionFactory);

    transactionFactory.$inject = ['$http'];

    function transactionFactory($http){
      
      var factory = {
        getleagueTransactions: getleagueTransactions
      };

      return factory;

      function getleagueTransactions(arr) {
        return $http({
          method: 'Post',
          url: '/api/recentTransactions/',
          data: {'data':arr}
        });
      };
      
    };

})();