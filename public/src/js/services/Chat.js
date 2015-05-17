angular.module('JSFight')
    .factory('Chat', ['socketFactory', function (socketFactory) {
        var socket = socketFactory();
        socket.forward('broadcast');
        return socket;
    }]);
