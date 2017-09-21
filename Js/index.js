
angular.module('try', [
'angularUtils.directives.dirPagination',
'ngResource',
'ngRoute'

]);

angular.module('Services', [])
.factory('githubService', function ($http) {
  var runUserRequest = function (repository) {
  return  $http ({

      url: ('https://api.github.com/search/repositories?q=' + '{' + repository + '}'+ '{&page,per_page,sort,order}')

    })
  }
    return {
       event: function (repository) {
         return runUserRequest(repository);
       }
    }
});

var app = new angular.module('myApp', ['Services','try']);

app.controller('Controller', function($scope, $timeout , githubService) {

    var timeout;
    $scope.$watch('repository', function(findRepo){
        if (findRepo) {
          if(timeout) $timeout.cancel(timeout);

          timeout = $timeout(function() {
              githubService.event(findRepo).success(function(data, status){
              console.log('success');
              console.log(data);
              $scope.events = data.items;
              $scope.total = "Search results :  " + data.items.length + " repositories retrieved";
              $scope.homepage = "Visit the Homepage";
              $scope.results = "alert alert-success";
            });
          }, 350)
        }
    });
    $scope.title = "GitHub";
    $scope.searchTitle = "Search for a repository from GitHub";
    $scope.webname = "GitHub-Api";

})
