// public/src/js/controllers/MainCtrl.js
angular.module('JSFight')

    .controller('HomeCtrl', ['$scope', '$state', '$rootScope', 'Auth', function($scope, $state, $rootScope, Auth) {

        $scope.user = JSON.parse(localStorage.getItem('user')).user;

        // Rootscope broadcast for user
        $rootScope.$on('login', function(user) {
            $scope.user = user;
        });

        $rootScope.$on('logout', function() {
            $scope.user = null;
        });

        $scope.logout = function() {
            Auth.logout()
                .success(function(data) {
                    localStorage.removeItem('user');
                    $rootScope.$broadcast('logout');
                    $state.transitionTo('home');
                });
        };
    }]);
