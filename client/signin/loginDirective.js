
	.directive('loginDirective', loginDirective)
	.directive('forgotDirective', forgotDirective);

	//modal for login
	function loginDirective() {
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
	}

	//modal for forgot password
	function forgotDirective() {
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
	}