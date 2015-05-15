// public/src/js/app.js
angular.module('JSFight', ['ui.router'])

    .constant('API', {
        url: 'http://localhost:3000/api/'
    })

    .run(['$rootScope', '$state', '$stateParams', '$location', function ($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


        // Auth interceptor on route change, to make better
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            // We set the user in the rootScope
            $rootScope.user = JSON.parse(localStorage.getItem('user'));

        });
    }]);
