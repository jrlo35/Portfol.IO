(function(){

  "use strict";

  angular
    .module('app');
    .controller('MainForumController', MainForumController);

    MainForumController.$inject = ['$scope', '$window', 'forumFactory', '$rootScope', '$location', '$anchorScroll','topicFactory'];
     
    function($scope, $window, forumFactory, $rootScope, $location, $anchorScroll, topicFactory){

      // these filters are to show the newest topics first
      vm.allTopics;

      vm.sortLatest = 'createdAt';
      vm.sortReverse = true;
      vm.topic = {};
      vm.topic.username = $window.localStorage.getItem('com.tp.username');
      vm.topic.userId = $window.localStorage.getItem('com.tp.userId');
      
      vm.createTopic = createTopic;
      vm.goToTop = goToTop;
      vm.oneTopic = oneTopic;
      vm.openModal = openModal;
      vm.showAllTopics = showAllTopics;
      

      //modal when create new forum
      function openModal(){
        $('#createForumPost').openModal();
      };

      //add new topic
      function createTopic(topic){
        forumFactory.addNewTopic(topic).then(function(err, res){
          if (err) {
            console.log(err);
            return;
          }
        }).then(function(){
          vm.topic.title = '';
          vm.topic.description = '';
          $('#createForumPost').closeModal();
          vm.showAllTopics();
          vm.goToTop();
        });
      };

      //retrieve all topics in forum
      function showAllTopics(){
        forumFactory.showAllTopics().then(function(data){
          vm.allTopics = data.data;

          for(var i = 0; i < vm.allTopics.length; i++){
            // an IIFE is required here bc of async issues
            (function(index){
              vm.allTopics[index].replies = 0;
              topicFactory.showAllReplies(vm.allTopics[index].id)
                .then(function(replies){
                  vm.allTopics[index].replies = replies.data.length;
                });
            })(i);
          }

        });
      };

      function oneTopic(){
        if(vm.allTopics.length > 0){
          return true;
        }
      };

      //automatically go to top of the page
      function goToTop(){
        $location.hash('top');
        $anchorScroll();
      };

      vm.showAllTopics();

    };
})();
