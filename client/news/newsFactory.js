
(function(){

  "use strict";

  angular
    .module('app.news')
		.factory('News', News)

		News.$inject = ['$http'];

		function News($http) {

			var factory = {
		    getNews: getNews
		  };

		  return factory;

		  function getNews(userId, leagueId) {
		  	var tweets = [];
		    return $http({
		      method: 'Get',
		      url: '/api/tweets/'+leagueId+'/'+userId
		    })
		    .then(function(res){
		      res.data.forEach(function(tweet){
            tweets.push({text: tweet.text, user: tweet.user, time: tweet.created_at});
          });
          return tweets;
		    })
		  };
		  
		};
})();