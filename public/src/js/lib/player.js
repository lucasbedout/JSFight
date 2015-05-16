var Player = function(SVG, type, x, y, $scope, player){
    var $$ = this;
    $$.SVG = null;

    $$.init = function(SVG, type, x, y, $scope, player){
        $$.SVG = SVG;
        $$.x = x;
        $$.id = player;
        $$.y = y;
        $$.buildStickmanJSON();
        $$.armx = $$.x;
        $$.height = 100;
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
            } else if (!endJump){
                goingUp = false;
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
        }, 5);
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
        if ($$.punching)
            $$.armx -= 2;
    };

    $$.moveRight = function(){
        if ($$.crouched)
            return 0;
        $$.x++;
        $$.x++;
        if ($$.punching)
            $$.armx += 2;
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

    $$.punch = function(width, $generalScope, direction){
        var punching = true,
            endPunch = false;
        $$.punching = true;
        console.log("coucou");
        $$.punchInterval = setInterval(function(){
            if ($$.armx - width < $$.x && !endPunch && punching){
                $$.arm += direction;
            } else if (!endPunch){
                punching = false;
                $$.armx -= direction;
                if ($$.x == $$.armx)
                    endPunch = true;
            }
            $$.buildStickmanJSON();
            $generalScope.$apply();
            if (endPunch){
                $$.attacking = false;
                $$.punching = false;
                clearInterval($$.punchInterval);
            }
        }, 5);
    };

    $$.buildStickmanJSON = function(){
        if (!$$.punching)
            $$.armx = $$.x;
        if (!$$.crouched)
            $$.bodyy1 = $$.y;
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
            "y1" : $$.y + 20,
            "x2" : $$.armx,
            "y2" : $$.y + 20,
            "stroke" : "black",
            "strokeWidth" : 7
        };
        $$.leg = {
            "x1" : $$.x,
            "y1" : $$.y + 60,
            "x2" : $$.x,
            "y2" : $$.y + 60,
            "stroke" : "black",
            "strokeWidth" : 7
        };
        $$.block = {
            "x1" : $$.x,
            "y1" : $$.y - $$.height,
            "x2" : $$.x,
            "y2" : $$.y - $$.height,
            "stroke" : "blue",
            "strokeWidth" : 4
        };
    };

    $$.init(SVG, type, x, y, $scope, player);
};
