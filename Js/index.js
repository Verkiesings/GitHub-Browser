
angular.module('Services', [])
.factory('githubService', function ($http) {
  var runUserRequest = function (repository) {
  return  $http ({

      url: ("https://api.github.com/users/" + repository + "/repos")
    })
  }
    return {
       event: function (repository) {
         return runUserRequest(repository);
       }
    }
});

var app = new angular.module('myApp', ['Services']);

app.controller('Controller', function($scope, $timeout , githubService) {

    var timeout;

    $scope.$watch('repository', function(findRepo){
        if (findRepo) {
          if(timeout) $timeout.cancel(timeout);

          timeout = $timeout(function() {

            githubService.event(findRepo).success(function(data, status){
              console.log('success');
              console.log(data);
              $scope.events = data;
            });
          }, 350)
        }
    });
    $scope.title = "GitHub";
    $scope.searchTitle = "Search for a repository on GitHub";
    $scope.webname = "GitHub-Api";
  

})
