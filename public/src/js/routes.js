angular.module('JSFight')

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            // Login
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'HomeCtrl'
            })


            // Login
            .state('login', {
                url: '/login',
                templateUrl: '../views/auth/login.html',
                controller: 'AuthCtrl'
            })

            // Signup
            .state('signup', {
                url: '/signup',
                templateUrl: '../views/auth/signup.html',
                controller: 'AuthCtrl'
            })

            // Game
            .state('game', {
                url: '/game',
                templateUrl: '../views/core_game/core_game_client.html',
                controller: 'fighterCtrl'
            });

        // Interceptor
        /*var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
         function success(response) {
         return response;
         }

         function error(response) {

         if(response.status === 401) {
         $injector.get('$state').transitionTo('login');
         return $q.reject(response);
         }
         else {
         return $q.reject(response);
         }
         }

         return function(promise) {
         return promise.then(success, error);
         };
         }];

         $httpProvider.responseInterceptors.push(interceptor);*/

}]);