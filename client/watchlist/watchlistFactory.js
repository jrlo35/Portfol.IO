(function () {

  "use strict";

  angular
    .module('app')
    .factory('WatchlistFactory', WatchlistFactory);

  WatchlistFactory.$inject = ['$http'];

  function WatchlistFactory($http) {

    return {
      getWatchlist: getWatchlist,
      updateWatchlist: updateWatchlist,
      removeFromWatchlist: removeFromWatchlist
    };

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