    
(function(){

    angular
      .module('app');
      .factory('forumFactory', forumFactory);

      forumFactory.$inject = ['$http'];

      function forumFactory($http){

        var factory = {
          addNewTopic: addNewTopic,
          showAllTopics: showAllTopics,
          getOneTopic: getOneTopic
        };

        return factory;

        function addNewTopic(topic){
          return $http({
            method: 'POST',
            url: '/api/forum',
            data: topic
          })
          .then(function(err, res){
            if(err){console.log(err);}
          });
        };

        function showAllTopics(){
          return $http({
            method: 'GET',
            url: '/api/forum',
          })
          .then(function(topics){
            return topics;
          });
        }

        function getOneTopic(id){
          return $http({
            method: 'POST',
            url: '/api/forum/topic',
            data: {id: id}
          })
        }
    }
})();