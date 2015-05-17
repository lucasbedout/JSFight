var Player = function(SVG, type, x, y, $scope, player){
    var $$ = this;
    $$.SVG = null;

    $$.init = function(SVG, type, x, y, $scope, player){
        $$.health = 100;
        $$.SVG = SVG;
        $$.x = x;
        $$.id = player;
        $$.y = y;
        $$.height = 100;
        $$.buildStickmanJSON();
        $$.armx = $$.x;
        $$.legx = $$.x;
        $$.blockx = $$.x;
        $$.blocky = $$.y + $$.height;
        $$.bodyy2 = $$.y + $$.height;
    };

    $$.drawStickman = function(){
        console.log($scope);
        $$.SVG.drawLine("body", $scope.body, $$.id, $scope);
    };

    $$.jump = function(height, $generalScope, _initialHeight){
        $$.initialHeight = $$.y;
        var endJump = false,
            goingUp = true;
        $$.jumping++;
        $$.jumpInterval = setInterval(function(){
            if ($$.initialHeight - height < $$.y && !endJump && goingUp){
                $$.y--;
                $$.y--;
            } else if (!endJump){
                goingUp = false;
                $$.y++;
                $$.y++;
                if ($$.y == _initialHeight)
                    endJump = true;
            }
            $$.buildStickmanJSON();
            $generalScope.$apply();
            if (endJump){
                $$.jumping = 0;
                clearInterval($$.jumpInterval);
            }
        }, 1);
    };

    $$.stopJump = function(){
        clearInterval($$.jumpInterval);
        return $$.initialHeight;
    };

    $$.getY = function(){
        return $$.y;
    };

    $$.getX = function(){
        return $$.x;
    };

    $$.moveLeft = function(){
        if ($$.crouched)
            return 0;
        $$.x--;
        $$.x--;
        $$.x--;
        if ($$.punching)
            $$.armx -= 3;
        if ($$.kicking)
            $$.legx -= 3;
    };

    $$.moveRight = function(){
        if ($$.crouched)
            return 0;
        $$.x++;
        $$.x++;
        $$.x++;
        if ($$.punching)
            $$.armx += 3;
        if ($$.kicking)
            $$.legx += 3;
    };

    $$.crouch = function(height, $generalScope){
        $$.crouched = true;
        $$.bodyy1 += height;
        $$.buildStickmanJSON();
        $generalScope.$apply();
    };

    $$.up = function(height, $generalScope){
        $$.crouched = false;
        $$.bodyy1 -= height;
        $$.buildStickmanJSON();
        $generalScope.$apply();
    };

    $$.blockUp = function(from, $generalScope, direction){
        $$.blocking = true;
        $$.blockx = $$.x + (from * direction);
        $$.blocky = $$.y + $$.height;
        $$.buildStickmanJSON();
        $generalScope.$apply();
    };

    $$.unblock = function($generalScope){
        $$.blocking = false;
        $$.blockx = $$.x;
        $$.blocky = $$.y;
        $$.buildStickmanJSON();
        $generalScope.$apply();
    };

    $$.punch = function(width, $generalScope, direction){
        var punching = true,
            endPunch = false;
        $$.punching = true;
        console.log(direction);
        $$.punchInterval = setInterval(function(){
            if ($$.armx != ($$.x + (width * direction)) &&
                !endPunch && punching){
                $$.armx += direction;
                $$.armx += direction;
            } else if (!endPunch){
                punching = false;
                $$.armx -= direction;
                $$.armx -= direction;
                if ($$.x == $$.armx)
                    endPunch = true;
            }
            if (punching){
                if ((($generalScope[$generalScope.opponent].x < $$.armx &&
                      direction > 0 &&
                     $generalScope[$generalScope.opponent].x > $$.x) ||
                     ($generalScope[$generalScope.opponent].x > $$.armx &&
                      direction < 0 &&
                      $generalScope[$generalScope.opponent].x < $$.x)) &&
                    !$generalScope[$generalScope.opponent].blocking){
                    $generalScope[$generalScope.opponent].health -= width/5;
                    console.log($generalScope[$generalScope.opponent].health);
                    punching = false;
                }
            }
            $$.buildStickmanJSON();
            $generalScope.$apply();
            if (endPunch){
                $$.attacking = false;
                $$.punching = false;
                clearInterval($$.punchInterval);
            }
        }, 1);
    };

    $$.kick = function(width, $generalScope, direction){
        var kicking = true,
            endKick = false;
        $$.kicking = true;
        $$.kickInterval = setInterval(function(){
            if ($$.legx != ($$.x + (width * direction)) &&
                !endKick && kicking){
                $$.legx += direction;
            } else if (!endKick){
                kicking = false;
                $$.legx -= direction;
                if ($$.x == $$.legx)
                    endKick = true;
            }
            if (kicking){
                if ((($generalScope[$generalScope.opponent].x < $$.legx &&
                      direction > 0 &&
                     $generalScope[$generalScope.opponent].x > $$.x) ||
                     ($generalScope[$generalScope.opponent].x > $$.legx &&
                      direction < 0 &&
                      $generalScope[$generalScope.opponent].x < $$.x)) &&
                    !$generalScope[$generalScope.opponent].blocking){
                    $generalScope[$generalScope.opponent].health -= width/5;
                    console.log($generalScope[$generalScope.opponent].health);
                    kicking = false;
                }
            }
            $$.buildStickmanJSON();
            $generalScope.$apply();
            if (endKick){
                $$.attacking = false;
                $$.kicking = false;
                clearInterval($$.kickInterval);
            }
        }, 1);
    };

    $$.buildStickmanJSON = function(){
        if (!$$.punching)
            $$.armx = $$.x;
        if (!$$.kicking)
            $$.legx = $$.x;
        if (!$$.crouched)
            $$.bodyy1 = $$.y;
        if (!$$.blocking){
            $$.blocky = $$.y;
            $$.blockx = $$.x;
        }
        if ($$.health > 75){
            $$.healthColor = "green";
        } else if ($$.health > 50){
            $$.healthColor = "yellow";
        } else if ($$.health > 25){
            $$.healthColor = "orange";
        } else {
            $$.healthColor = "red";
        }
        if ($$.health < 0)
            $$.health = 0;
        $$.body = {
            "x1" : $$.x,
            "y1" : $$.bodyy1,
            "x2" : $$.x,
            "y2" : $$.y + $$.height,
            "stroke" : "black",
            "strokeWidth" : 7
        };
        $$.head  = {
            "cx" : $$.x,
            "cy" : $$.bodyy1,
            "r" : 10,
            "stroke" : "black",
            "strokeWidth" : 7,
            "fill" : "black"
        };
        $$.arm = {
            "x1" : $$.x,
            "y1" : $$.bodyy1 + 20,
            "x2" : $$.armx,
            "y2" : $$.bodyy1 + 20,
            "stroke" : "black",
            "strokeWidth" : 7
        };
        $$.leg = {
            "x1" : $$.x,
            "y1" : $$.bodyy1 + 60,
            "x2" : $$.legx,
            "y2" : $$.y + $$.height,
            "stroke" : "black",
            "strokeWidth" : 7
        };
        $$.block = {
            "x1" : $$.blockx,
            "y1" : $$.blocky,
            "x2" : $$.blockx,
            "y2" : $$.y,
            "stroke" : "blue",
            "strokeWidth" : 4
        };
        $$.lifeBar = {
            "x1" : ($$.x - $$.health/2),
            "y1" : $$.bodyy1 - 50,
            "x2" : ($$.x + $$.health/2),
            "y2" : $$.bodyy1 - 50,
            "stroke" : $$.healthColor,
            "strokeWidth" : 6
        };
    };

    $$.init(SVG, type, x, y, $scope, player);
};
