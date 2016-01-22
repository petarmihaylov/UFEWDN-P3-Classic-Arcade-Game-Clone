// Enemies our player must avoid
var Enemy = function() {
    // The enemy is initially not on the board
    this.isOnTheBoard = false;
    this.x = null;
    this.y = null;
    this.speed = null;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!this.isOnTheBoard) {
        this.putOnTheBoard();
        this.isOnTheBoard = true;
    } else if (this.x > getCanvasSize().width) {
        this.reset();
    } else {
        this.move(dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.putOnTheBoard = function() {
    // Reset is the same as putOnTheBoard, but making it it's own function makes the code more readable
    this.reset();
};

Enemy.prototype.move = function(dt) {
    this.x = this.x + 101 * dt * this.speed;
};

Enemy.prototype.reset = function() {
    this.row = getRandomInt(0, 4);
    this.x = -202; // Spawn a little further away from the page to give the player some breathing room
    this.y = (this.row * 83) + 62;
    this.speed = getRandomNumber(1, 3);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = null;
    this.y = null;
    this.isOnTheBoard = false;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {
    if (!this.isOnTheBoard) {
        this.putOnTheBoard();
        this.isOnTheBoard = true;
    } else if (this.x > getCanvasSize().width) {
        this.reset();
    } else {
        this.move(dt);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.putOnTheBoard = function() {
    this.reset();
};

Player.prototype.move = function() {

};

Player.prototype.reset = function() {
    this.x = (getCanvasSize().width - 101)/ 2;
    this.y = getCanvasSize().height - 200;
};

Player.prototype.handleInput = function() {

};

// Helper Functions
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCanvasSize() {
    var width = ctx.canvas.width,
        height = ctx.canvas.height;
    return {
        "width": width,
        "height":height
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player;
for (var enemies = 0; enemies < 5; enemies++) {
    allEnemies.push(new Enemy);
}
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
