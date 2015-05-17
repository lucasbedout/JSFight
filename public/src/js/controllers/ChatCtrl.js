// public/src/js/controllers/MainCtrl.js
angular.module('JSFight')

    .controller('ChatCtrl', ['$scope', '$http', '$log', 'Chat', 'API', 'Formatter', function($scope, $http, $log, Chat, API, Formatter) {

        $scope.user = JSON.parse(localStorage.getItem('user')).user;
        $scope.messageLog = 'Ready to chat!';

        $scope.load = function() {
            $http.get(API.url + '/messages').success(function(messages) {
                messages.forEach(function(msg) {
                    $scope.messageLog = Formatter(msg.sender, msg.content) + $scope.messageLog;
                });
            });
        };

        $scope.sendMessage = function() {
            Chat.emit('message', $scope.user.local.username, $scope.message);
            $scope.message = '';
        };

        $scope.$on('socket:broadcast', function(event, data) {
            $scope.$apply(function() {
                $scope.messageLog = Formatter(
                    data.sender,
                    data.content) + $scope.messageLog;
            });
        });

        $scope.load();
}]);