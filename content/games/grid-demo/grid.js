
    var canvas = document.getElementById("canv");
    var context = canvas.getContext('2d');
    var cursorX;
    var cursorY;
    var maxSpeed = 400;
    var gridSize = 75;
    var frameCount = 0;


    function Character (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 40;
        this.angle = 0;
    }

    Character.prototype.move = function(){
        var angle = getDirection(this.x, this.y, cursorX, cursorY);
        if (angle !== NaN){
            this.angle = angle;
        }

        var l = getDistance(this.x, this.y, cursorX, cursorY);

        if (l > maxSpeed){
            l = maxSpeed;//do not exceed max speed
        }
        // player is never directly at cursor!
        if (l > 1){
            this.x = this.x + Math.cos(this.angle) * (l/25);
            this.y = this.y + Math.sin(this.angle) * (l/25);
        //if player is within 1 px of cursor, stop.
        }
    };

    Character.prototype.draw = function(){
        context.beginPath();
        context.fillStyle = "rgba(200,0,200,.85)";
        context.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        context.fill();
    };

    function Coord(x, y){
        this.x = x;
        this.y = y;
        this.centerX = x + (gridSize/2);
        this.centerY = y + (gridSize/2);
        this.angles = [];
        this.avgAngle = 0;
    }

    Coord.prototype.drawAngle = function(){
        // console.log('drawing angle');
        // console.log(this.avgAngle);
        context.beginPath();
        context.moveTo(this.centerX,this.centerY);
        context.lineTo((this.centerX+Math.cos(this.avgAngle)*this.angles.length*20),(this.centerY+Math.sin(this.avgAngle)*this.angles.length*20));
        context.strokeStyle="#00ff00";
        context.stroke();
        this.angles = [];

    };


    Coord.prototype.updateAngle = function(character){
        //give an x and y (will also need velocity)
        console.log(this.avgAngle);
        var sumAngle = 0;
        // console.log(sumX);
        
        if (this.angles.length>100){
            this.angles.shift();
        }
        this.angles.push(character.angle);
        console.log(character.angle);
        if (this.angles.length > 1){
            for (var i = 0; i < this.angles.length; i++){
                sumAngle += this.angles[i];

            }

            if (this.avgAngle){
                this.avgAngle += (sumAngle / this.angles.length)/2;
            }
            else {
                this.avgAngle = sumAngle / this.angles.length;
            }
            

        }
    };

    Coord.prototype.drawSquare = function(){
        context.fillStyle="rgba(200,50,0,.5)";
        context.fillRect(this.x,this.y,gridSize,gridSize);
    };

    //get cursor's x and y all the time
    this.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };

    function prepCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getDistance(x1, y1, x2, y2)
    {
        squareX = Math.pow((x1-x2),2);
        squareY = Math.pow((y1-y2),2);
        return Math.sqrt(squareX + squareY);
    }

    function getDirection(x1, y1, x2, y2)
    {
        deltaY = y2 - y1;
        deltaX = x2 - x1;
        return Math.atan2(deltaY,deltaX);
    }

    function initCoordPlane(){
        var coordPlane = [];
        for (var i = 0; i < window.innerWidth/gridSize; i ++){
            coordPlane.push([]);
            for (var j = 0; j < window.innerHeight/gridSize; j ++){
                coord = new Coord(i*gridSize,j*gridSize);
                coordPlane[i].push(coord);
                // coord.drawAngle();
            }
        }
        return coordPlane;
    }


    function drawGrid(gridSize){
        for (var i = 1; i < window.innerWidth; i += gridSize){
            context.beginPath();
            context.moveTo(i,0);
            context.lineTo(i,window.innerHeight);
            context.stroke();
        }
        for (var j = 1; j < window.innerHeight; j += gridSize){
            context.beginPath();
            context.moveTo(0,j);
            context.lineTo(window.innerWidth, j);
            context.stroke();
        }
    }


    function animate(){
        char1.move();

        coordX = Math.floor(char1.x/gridSize);
        coordY = Math.floor(char1.y/gridSize);
        if(coordPlane[coordX][coordY] != currentCoord){
            currentCoord.angles = [];
            currentCoord = coordPlane[coordX][coordY];
        }
        if (frameCount % 50 === 0){
            currentCoord.updateAngle(char1);        
        }

    }

    function render(){
        for (var i = 0; i < coordPlane.length; i ++){
            for (var j = 0; j < coordPlane[i].length; j ++){
                coordPlane[i][j].drawAngle();
            }
        }
        drawGrid(gridSize);
        char1.draw();
        currentCoord.drawSquare();
    }

    function loop(){
        prepCanvas();
        animate();
        render();
        frameCount++;
        requestAnimationFrame(loop);
    }

    char1 = new Character(10,10);

    var coordPlane = initCoordPlane();
    console.log(coordPlane);

    var currentCoord = coordPlane[4][5];
    console.log(currentCoord);

    loop();


