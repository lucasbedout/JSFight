// public/src/js/controllers/MainCtrl.js
angular.module('JSFight')

    .controller('LetsFight', ['$scope', '$state', '$rootScope', 'Auth', function($scope, $state, $rootScope, Auth) {

        var svg = new SVGLib(document.getElementById("wannaFight"));

        $scope.player = "player1";
        $scope.opponent = "player2";

        $scope.player1 = new Player(svg, "default", 60, 60, $scope);
        $scope.player2 = new Player(svg, "default", 160, 60, $scope);

        $scope[$scope.player].movingLeft = false;
        $scope[$scope.player].movingRight = false;
        $scope[$scope.player].movingTop = false;
        $scope[$scope.player].movingBot = false;
        $scope[$scope.player].crouched = false;
        $scope[$scope.player].attacking = false;
        $scope[$scope.player].direciton = -1;
        $scope[$scope.player].jumping = 0;

        document.addEventListener('keydown', function(event) {
            if (event.keyCode == 37){
                //going left
                $scope[$scope.player].movingLeft = true;
            } if (event.keyCode == 65){
                // A Punch
                if (!$scope[$scope.player].direction){
                    $scope[$scope.player].attacking = true;
                    $scope[$scope.player]
                        .punch(20,
                               $scope,
                               $scope[$scope.player].direction);
                }
            } if (event.keyCode == 90){
                // Z Punch
                if (!$scope[$scope.player].attacking){
                    $scope[$scope.player].attacking = true;
                    $scope[$scope.player]
                        .punch(50,
                               $scope,
                               $scope[$scope.player].direction);
                }
            } if (event.keyCode == 69){
                // E Punch
                if (!$scope[$scope.player].attacking){
                    $scope[$scope.player].attacking = true;
                    $scope[$scope.player]
                        .punch(100,
                               $scope,
                               $scope[$scope.player].direction);
                }
            } if (event.keyCode == 39){
                //moving right
                $scope[$scope.player].movingRight = true;
            } if (event.keyCode == 32 &&
                  !$scope[$scope.player].crouched){
                //jumping !
                if ($scope[$scope.player].jumping === 1){
                    $scope[$scope.player]
                        .jump(60, $scope,
                              $scope[$scope.player].stopJump());
                } else if ($scope[$scope.player].jumping === 0){
                    $scope[$scope.player]
                        .jump(60, $scope,
                             $scope[$scope.player].getY());
                }
            } if (event.keyCode == 40){
                //getting down
                if (!$scope[$scope.player].crouched &&
                    !$scope[$scope.player].jumping)
                    $scope[$scope.player].crouch(30, $scope);
            }
        });

        //handle gaming
        setInterval(function(){
            if ($scope[$scope.player].movingLeft){
                $scope[$scope.player].moveLeft();
            }
            if ($scope[$scope.player].movingRight){
                $scope[$scope.player].moveRight();
            }
            if ($scope[$scope.player].x - $scope[$scope.opponent].x){
                $scope[$scope.player].direction = -1;
                $scope[$scope.opponent].direction = 1;
            } else {
                $scope[$scope.player].direction = 1;
                $scope[$scope.opponent].direction = -1;
            }
            $scope[$scope.player].buildStickmanJSON();
            $scope.$apply();
            console.log($scope[$scope.player].toJSON());
        }, 10);

        document.addEventListener('keyup', function(event) {
            if (event.keyCode == 37){
                $scope[$scope.player].movingLeft = false;
            } if (event.keyCode == 39){
                $scope[$scope.player].movingRight = false;
            } if (event.keyCode == 38){
                $scope[$scope.player].movingTop = false;
            } if (event.keyCode == 40){
                $scope[$scope.player]
                    .up(30, $scope);
            }
        });
    }])
    .directive('playground', function() {
        return {
            templateNamespace: 'svg',
            templateUrl: '/templates/svg.html',
            replace: true
        };
    });