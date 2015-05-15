var player = { name: 'Mehdi', life: 100, posX: 0, posY: 0, image: 0 };

angular.module('JSFight').controller('initiateGameCtrl', function(){
		this.player1 = player;
		player.name = 'Lucas';
		this.player2 = player;
    });

angular.module('JSFight').controller('actionGameCtrl', function(){
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
    });

angular.module('JSFight').controller('refreshGameCtrl', function(){
		//receive the instruction by json
		//print the stickman
    });