var SVGLib = function(){

    var $$ = this;

    $$.createWorkspace = function(){
        $$.workspace = document.createElementNS("http://www.w3.org/2000/svg",
                                                "svg");
    };

    $$.addSVG = function(tag){
        // $$.workspace = document.getElementById("workspace");
        // $$.workspace.appendChild(tag);
        // document.getElementById("workspace").innerHTML = $$.workspace.innerHTML;
        console.log(tag);
    };

    $$.testJSON = function(str){
            try {
                JSON.parse(str);
            } catch (e) {
                console.log(e);
                return false;
            }
            return true;
    };

    $$.draw = function(tag){
        $$.addSVG(tag);
    };

    $$.init = function(args){
        for (var i = 0; i < args.length; i++){
            if (args[i] && args[i].nodeType === 1){
                $$.targetDiv = args[i];
            }
        }
        if (!$$.targetDiv){
            console.log("Error, enter a valid div");
            return 1;
        }
        $$.createWorkspace();
    };

    $$.createTag = function(tagName){
        return document.createElement(tagName);
    };

    $$.drawCircle = function(name, JSONHead){
        var currentHead = $$.createTag("circle");
        currentHead.setAttribute("id", name);
        for (var attr in JSONHead){
            currentHead.setAttribute(attr, JSONHead[attr]);
        }
        $$.draw(currentHead);
    };

    $$.drawLine = function(name, JSONBody, id){
        var line = $$.createTag("line");
        line.setAttribute("id", name + id);
        line.setAttribute("stroke-linecap", "round");
        for (var attr in JSONBody){
            if (typeof JSONBody[attr] === "number" ||
                typeof JSONBody[attr] === "string")
                line.setAttribute(attr, "{{" + "player" + id + "." +
                                  name + "." + attr + "}}");
            else if (typeof JSONBody[attr] === "object"){
                var transformString = "";
                for (var transform in JSONBody[attr]){
                    transformString += transform + "(" +
                        JSONBody[attr][transform] + ") ";
                }
                line.setAttribute(attr,transformString);
            }
        }
        $$.draw(line);
    };

    $$.getPlayerJSON = function(name,$$$){
        var r = new XMLHttpRequest();
        r.open("GET", "ressources/" + name + ".json", true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200){
                return;
            }
            $$$.desc = {"json" : r.responseText};
            $$$.buildData();
            return 0;
        };
        r.send();
    };

    $$.init(arguments);
};
