// public/src/js/app.js
angular.module('JSFight', ['ui.router'])

    .constant('API', {
        url: 'http://localhost:3000/api/'
    })

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        //$urlRouterProvider.otherwise('/');

        $stateProvider

            // Login
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html'
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
            });

    }]);