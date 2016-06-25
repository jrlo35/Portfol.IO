(function () {

  "use strict";

  angular
    .module('app')
    .factory('WatchlistFactory', WatchlistFactory);

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
      return $http({
        method: 'POST',
        url:'/api/watchlist/array',
        data: array
      });
    }

    function removeFromWatchlist(data) {
      return $http({
        method:'POST',
        url: '/api/watchlist/remove',
        data: data
       });
    }
  }
})()