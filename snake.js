/* Funktionalität zum Snake Game */

// Konstanten und Variablen
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// kleinste graphische Einheit = Box (Kasterln)
const box = 32;

// Bilder laden
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Laden der Audio Dateien
let dead  = new Audio();
dead.src = "audio/dead.mp3"; 

let eat  = new Audio();
eat.src = "audio/eat.mp3"; 

let up  = new Audio();
up.src = "audio/up.mp3"; 

let right  = new Audio();
right.src = "audio/right.mp3"; 

let left = new Audio();
left.src = "audio/left.mp3";

let down = new Audio();
down.src = "audio/down.mp3";


// erzeuge die Schlange
let snake = [];
snake[0] = {
    x : 9 * box,
    y: 8 * box
}

// erzeuge das Futter
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// score variable und Cursorsteuerung der Snake
let score = 0;

// control variable für die Richtung
let d; 

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode; // hole mir hier den ASCII Code der Cursor Taste
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT"; 
    } else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play(); 
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT"
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
 } // Ende des Event Listeners

 // überprüfue eine Kollision
function collision (head, array) {
    for (let i = 0; i < array.length; i++) {
         if (head.x == array[i].x && head.y == array[i].y) {
            return true;
         }
    }
    return false;
}

function draw(){

	// Erzeuge Hintergrundbild
    ctx.drawImage(ground,0,0);
    
	// Erzeuge die Schlange
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
	// Erzeuge den Apfel
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}


// Rufe das Spiel auf und setze die Geschwindigkeit des Cursors in ms
let game = setInterval(draw, 300);