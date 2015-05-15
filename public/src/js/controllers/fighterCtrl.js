angular.module('JSFight').controller('fighterCtrl', ['$scope', 'Fight', function($scope, Fight) {

        $scope.player = {
            name: 'Mehdi',
            life: 100,
            posX: 0,
            posY: 0,
            image: 0
        };

        //send to node the key
        /*$(document).ready(function(){
         var user,key;
         $("#submit").click(function(){
         user=this.player1.name;
         key='a';
         $.post("http://localhost:3000/game",{user: user,key: key}, function(data){
         });
         });
         });*/

        $scope.sendPlayer = function() {
            // Use Fight service to send something
        };

    }]);
