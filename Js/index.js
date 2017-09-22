
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
              $scope.total = "Number of repositories retrieved : " + data.items.length;
              $scope.homepage = "Visit the Homepage";
              $scope.results = "alert alert-success";
              $scope.style = "background:#DFF2BF; color: #4F8A10; border:none; box-shadow: 1px 3px 5px rgba(0,0,0,.3);" +
              "-webkit-box-shadow: 1px 3px 5px rgba(0,0,0,.3); -moz-box-shadow: 1px 3px 5px rgba(0,0,0,.3); ms-box-shadow: 1px 3px 5px rgba(0,0,0,.3); -o-box-shadow: 1px 3px 5px rgba(0,0,0,.3)"
            });
          }, 350)
        }
    });
    $scope.title = "GitHub";
    $scope.searchTitle = "Search for a repository from GitHub";
    $scope.webname = "GitHub-Api";

})
