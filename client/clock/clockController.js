app.controller('ClockController', ['$scope', '$interval', function ($scope, $interval) {

  $scope.time;

  $scope.getCurrentTime = function () {
    var currentTime = moment().utc().subtract(7, 'hour');
    var warning = 'Until Market Opens:  ';
    var hour = currentTime.hour();
    var minute = currentTime.minute();
    var second = currentTime.second();
    second = 60 - second;

    if((hour>6 && hour <13) || (hour===6 && minute>=30)){
      hour = 12 - hour;
      warning = 'Until Market Closes:  ';
      minute = 59 - minute;
      
    } else if(hour >= 13){
      if(minute>=30){ 
        minute = 30-minute+60;
      }else if(minute<30){
        minute = 29 - minute;
      }
      hour = minute > 30 ? hour+1 : hour;
      hour = 30-hour;
    }else{
      if(minute>=30){ 
        minute = 30-minute+60;
      }else if(minute<30){
        minute = 29 - minute;
      }
      hour = minute > 30 ? hour+1 : hour;
      hour = 6-hour;
    }
  
    if(hour < 10){
      hour = '0' + hour;
    }

    if(second < 10){
      second = '0' + second;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    $scope.time = warning + hour + ' : ' + minute + ' : ' + second;
  };
  
  $interval($scope.getCurrentTime, 1000);

}]);
