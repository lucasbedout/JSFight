// public/src/js/controllers/MainCtrl.js
angular.module('JSFight')

    .controller('AuthCtrl', ['$scope', '$state', '$rootScope', 'Auth', function($scope, $state, $rootScope, Auth) {

        $scope.login = function() {
            Auth.login($scope.form.username, $scope.form.password)
                .success(function(user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    $rootScope.$broadcast('login', user);
                    $state.transitionTo('home');
                });
        };

        $scope.signup = function() {
            Auth.signup($scope.form.username, $scope.form.password)
                .success(function(user) {
                    localStorage.set('user', JSON.stringify(user));
                    $rootScope.$broadcast('login', user);
                    $state.transitionTo('home');
                });
        };

    }]);