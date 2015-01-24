angular.module('flapperNews', ['ui.router'])
// route configuration------------------------------------
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { // home view (or posts index)
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', { // post view (or post show)
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}])
// a factory posing as a service--------------------------
.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}])
// main controller----------------------------------------
.controller('MainCtrl', [

  '$scope', // scope is injected into the main controller
  'posts',  // the posts 'service' is injected into the main controller
  function($scope, posts){
    $scope.test= 'Hello world!';
    $scope.posts= posts.posts; // this will display the array of posts from the posts factory.
    // Now any change or modification made to $scope.posts will be stored in the service
    //and immediately accessible by any other module that injects the posts service.
    $scope.addPost= function(){
      if (!$scope.title || $scope.title === ''){
        return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title= '';
      $scope.link= '';
    };
    $scope.incrementUpvotes= function(post){
      post.upvotes += 1;
    };
}])
// posts controller---------------------------------------
.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    $scope.post= posts.posts[$stateParams.id];
}]);
