(function () {

  "use strict";

  angular
    .module('app.watchlist')
    .factory('WatchlistFactory', WatchlistFactory);

    WatchlistFactory.$inject = ['$http'];

    function WatchlistFactory($http) {

      var factory = {
        getWatchlist: getWatchlist,
        updateWatchlist: updateWatchlist,
        removeFromWatchlist: removeFromWatchlist
      };

      return factory;

      function getWatchlist(userid) {
        return $http.get('/api/watchlist/' + userid)
          .then(getWatchlistComplete)
          .catch(getWatchlistFailed);

        function getWatchlistComplete(data) {
          var watchlist = [];
          for(var stock in data.data) {
            watchlist.push(stock);
          }
          return watchlist;
        }
      
        function getWatchlistFailed(err) {
          console.error(err);
        }
      }

      function updateWatchlist(array) {
        return $http.post('/api/watchlist/array', array)
        .then(function(stocks){
          
          var stock = [];
          var results = [];
          //removes unwanted last member of response array
          stocks.data.pop();
          stocks.data.forEach(function (stock) {

            //checks each attribute of stock for percentage or range
            stock.forEach(function (attr) {
              var newAttr = attr.replace(/\"/g,'');
              if(/[\%]/.test(newAttr)) {
                var percent = newAttr.replace(/\%/,'');
                var sign = percent[0];
                var decimal = percent.substr(1);

                //round to two for percent day change
                var ans = parseFloat(decimal).toFixed(2);
                var final = sign + ans.toString();
                newAttr = final.concat('%');
              }
              
              else if(/[\-]/.test(newAttr)) {
                var range = [];
                newAttr = newAttr.split('-');

                //round to two decimal places for day and week range
                newAttr.forEach(function (num) {
                  newAttr = parseFloat(num).toFixed(2);
                  range.push(newAttr);
                })
                newAttr = range.join('-');
              }
              stock.push(newAttr);
            })
            results.push(stock);
            stock = [];
          })
          return results;
        
      }
        function getWatchlistFailed(err) {
          console.error(err);
        }

      function removeFromWatchlist(data) {
        return $http.post('/api/watchlist/remove', data)
          
      }
      function getWatchlistFailed(err) {
        console.error(err);
      }
    }
})()