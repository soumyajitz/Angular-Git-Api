var app=angular.module("myApp",[]);
app.controller('MainController',function($scope,github,$interval,$log){   

var onUserComplete=function(data){
    $scope.user=data;
    github.getRepos($scope.user).then(onRepos,onError);
};
  
    var onRepos=function(data){
        $scope.repos=data;
    }
    
var onError=function(reason){
    $scope.error="Could not fetch the data";
};
    
    var decrementCountdown=function(){
    $scope.countdown-=1;
    if($scope.countdown<1){
        $scope.search($scope.username);
    }
};
    var countDownInterval=null;
    
    var startCountdown=function(){
    countDownInterval=$interval(decrementCountdown,1000,$scope.countdown);
    }
$scope.search=function(username){
        $log.info("Searching for ... "+username);
        github.getUser(username).then(onUserComplete,onError);
    }
    if(countDownInterval){
        $interval.cancel(countDownInterval);
    }
    $scope.username="angular"
    $scope.message="Github Viewer";
    $scope.repoSortOrder="+stargazers_count";
    $scope.countdown=5;
    startCountdown();
});