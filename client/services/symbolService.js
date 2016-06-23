var app = angular.module('app');

app.factory('symbolFactory', function ($http) {

  var getCompany = function (company) {
    return $http({
      method: 'GET',
      url: '/api/symbols/'+company,
    })
    .then( function (data) {
      return data;
    });
  }

  var addToWatchlist = function (data) {
    return $http ({
      method: 'POST',
      url:'/api/watchlist',
      data: data
    })
  }

  return {
    addToWatchlist:addToWatchlist,
    getCompany: getCompany
  }

})