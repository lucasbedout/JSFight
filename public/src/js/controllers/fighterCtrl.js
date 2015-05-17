angular.module('JSFight').controller('fighterCtrl', ['$scope', '$rootScope', 'Fight', function($scope, $rootScope, Fight) {

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

		$rootScope.$on('keypress', function (evt, obj, key) {
			$scope.$apply(function () {
				$scope.key = key;
			});
		});

        $scope.sendPlayer = function() {
            // Use Fight service to send something
            // Fight.doSomething(toto)
        };

    }]);

