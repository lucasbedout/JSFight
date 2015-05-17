// public/src/js/services/TestService.js
angular.module('JSFight')

    .factory('Auth', ['$http', 'API', function($http, API) {

        return {

            signup: function(username, password) {
                return $http.post(API.url + 'signup', {username: username, password: password});
            },

            login: function(username, password) {
                return $http.post(API.url + 'login', {username: username, password: password});
            },

            logout: function() {
                return $http.get(API.url + 'logout');
            }
        };

    }]);