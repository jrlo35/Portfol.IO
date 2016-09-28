(function(){

  "use strict";

  angular
    .module('app')
    .factory('messageBoardFactory', messageBoardFactory);

    messageBoardFactory.$inject = ['http'];

    function messageBoardFactory($http){

      var factory = {
        showPosts: showPosts,
        submitPost: submitPost,
      };

      return factory;

      function showPosts(id){
          return $http({
            method: 'POST',
            url: '/api/messages/leagues',
            data: {id: id}
          })
          .then(function(posts){
            return posts;
          });
      };

      function submitPost(post){
          return $http({
            method: 'POST',
            url: '/api/messages',
            data: post
          })
          .then(function(members){
            return members;
          });
      };
    }
})();
