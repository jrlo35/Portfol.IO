(function (){

  "use strict";

  angular
    .module('app')
    .factory('BadgeFactory', BadgeFactory);

    BadgeFactory.$inject = ['$http'];

    function BadgeFactory($http) {

      var factory = {
        getBadges: getBadges,
        getPossibleBadges: getPossibleBadges,
        postBadge: postBadge
      };

      return factory;

      function getBadges(userId){
        return $http({
          method: 'POST',
          url: '/api/badges/getBadges',
          data: {userId: userId}
        })
        .then(function(badges){
          return badges;
        });
      };
      function getPossibleBadges(userId){
        return $http({
          method: 'POST',
          url: '/api/badges/possibleBadges',
          data: {userId: userId}
        })
        .then(function(badges){
          return badges;
        });
      };

      function postBadge(userId, badge){
        return $http({
          method: 'POST',
          url: '/api/badges',
          data: {badge: badge, userId: userId}
        })
        .then(function(badges){
          return badges;
        });
      };
    };
})();
