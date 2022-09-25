function init() {

    var canvas = document.getElementById('mycanvas');
    w = h = canvas.width = canvas.height = 480; // board size 
    pen = canvas.getContext('2d'); // to draw object 
    cs = 20; // cell size
    game_over =false; 
    score =0;
    food_img =new Image();
    food_img.src ="material/apple.png"
    
    level_img = new Image();
    level_img.src= "material/trophy.png";
    level_img.height = level_img.width = 500;
   

    food =getRandomFood() // to genrate food in screen
    snake = {
        init_len: 5,
        color: "red",
        cells: [],
        direction: "right",


        // snake size consist of 5 cels
        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 1 });
            }
        },
        drawSnake: function () {

            //snake cell location with cordinates.
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }

        },

        updateSnake: function () {
            console.log("snake is updating");


            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            // updating the size when snake will eat food a
            if(headX==food.x && headY==food.y){
              food= getRandomFood();
               score++;
            }
            else{
                // if not dont increase size
                this.cells.pop();
            }

            //update the direction of snake
            var nextX, nextY;
            // for right direction
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;

            }
            //for left direction
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            // for down direction
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }

            // for up direction
            else {
                nextX = headX;
                nextY = headY - 1;
            }

            if (this.headX == "w") {
                nextX = headX - 1;
                nextY = headY;
            }

            this.cells.unshift({ x: nextX, y: nextY });



            // for the game over 
            // if snake hits the last board edge

            var lastX=Math.round(w/cs); // ( 20,20) cordinates from this formula
            var lastY=Math.round(h/cs); // ( 20,20) cordinates from this formula


            if(this.cells[0].x<0 || this.cells[0].y<0|| this.cells[0].x>lastX || this.cells[0].y>lastY){
                game_over= true;
            }


        }

    };

    snake.createSnake();


    function keypressed(e) {

        // when we press key in the keyboard 
        if (e.key == "ArrowRight") {
            // it will chnage the object direction to key if we will call and this will call update function to change direction 
            snake.direction = "right";

        }
        else if (e.key == "ArrowLeft") {
            // it will chnage the object direction to key if we will call and this will call update function to change direction 
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            // it will chnage the object direction to key if we will call and this will call update function to change direction 
            snake.direction = "down";
        }
        else {
            // it will chnage the object direction to key if we will call and this will call update function to change direction 
            snake.direction = "up";
        }




    }

    document.addEventListener('keydown', keypressed);





}

function draw() {
    //erase the snake
    pen.clearRect(0, 0, w, h);

    //drawn the snake
    snake.drawSnake();
     
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs+5,cs+5)
    
    pen.drawImage(level_img,2,1,cs*4,cs*4);
    
    pen.fillStyle= "blue";
    pen.font="25px Roboto";
    pen.fillText(score,36,50);
    

}

function update() {
    snake.updateSnake();

}

function getRandomFood(){

    var FoodX = Math.round(Math.random()*(w-cs)/cs);
    var FoodY = Math.round(Math.random()*(h-cs)/cs);

    food={
        x:FoodX,
        y:FoodY,
        color:"yellow",
    }
    return food;
}

function gameloop() {
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();

}

init();
var f = setInterval(gameloop, 100);
