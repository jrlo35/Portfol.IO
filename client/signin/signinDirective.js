(function () {

"use strict";

angular
  .module('app')

	//modal for signup
	.directive('signupDirective', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '='
	    },
	    replace: true,
	    link: function (scope, element, attrs) {

	      scope.dialogStyle = {};
	      if (attrs.width) {
	        scope.dialogStyle.width = attrs.width;
	      }
	      if (attrs.height) {
	        scope.dialogStyle.height = attrs.height;
	      }
	      scope.hidesignup = function() {
	        scope.show = false;
	      };
	    },
	    //
	    transclude: true,
	    //template that replaces element ng-show = $scope.show is truthy binds to show variable and show attribute ng-style =object to inline style
	    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hidesignup()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	  };
	})

	//modal for login
	.directive('loginDirective', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '='
	    },
	    replace: true,
	    link: function(scope, element, attrs) {
	      scope.dialogStyle = {};
	      if (attrs.width) {
	        scope.dialogStyle.width = attrs.width;
	      }
	      if (attrs.height) {
	        scope.dialogStyle.height = attrs.height;
	      }
	      scope.hidelogin = function() {
	        scope.show = false;
	      };
	    },
	    transclude: true,
	    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hidelogin()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	  };
	})

	//modal for forgot password
	.directive('forgotDirective', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      //object passed to directive
	      show: '='
	    },
	    replace: true,
	    link: function(scope, element, attrs) {
	      scope.dialogStyle = {};
	      if (attrs.width) {
	        scope.dialogStyle.width = attrs.width;
	      }
	      if (attrs.height) {
	        scope.dialogStyle.height = attrs.height;
	      }
	      scope.hideforgot = function() {
	        scope.show = false;
	      };
	    },
	    transclude: true,
	    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideforgot()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	  };
	})

})()