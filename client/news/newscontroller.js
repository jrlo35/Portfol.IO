(function(){

  "use strict";

  angular
    .module('app.news', [])
    .controller('NewsController', NewsController);
      
    NewsController.$inject = ['$window', '$stateParams', 'News'];

    function NewsController($window, $stateParams, News){
      var vm = this;
      vm.tweets;
      vm.getTweets = getTweets;

      //fetch tweets based on stocks in users portfolio
      function getTweets(){
        var leagueId = $stateParams.leagueId;
        var userId = $window.localStorage.getItem('com.tp.userId');
        vm.tweets = [];
        News.getNews(userId, leagueId)
        .then(function (res){
          vm.tweets = res;
        });
      };
      vm.getTweets();
    };
})();