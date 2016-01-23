/**
 * GLOBAL CONSTANTS
 *
 */
var TILE_WIDTH = 101,
    TILE_HEIGHT_OFFSET = 83;

/**
 * ENEMY CLASS
 *
 */
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
    } else if (this.x > settings.boardSize.width) {
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
    this.x = this.x + TILE_WIDTH * this.speed * dt;
};

Enemy.prototype.reset = function() {
    this.row = getRandomInt(0, 4);
    this.x = TILE_WIDTH * -2; // Spawn a little further away from the page to give the player some breathing room
    this.y = (this.row * TILE_HEIGHT_OFFSET) + 62;
    this.speed = getRandomNumber(1, 3);
};

/**
 * PLAYER CLASS
 *
 */
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
    } else if (this.x > settings.boardSize.width) {
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
    this.x = (settings.boardSize.width - TILE_WIDTH) / 2;
    this.y = settings.boardSize.height - 200;
};

Player.prototype.handleInput = function() {

};

/**
 * Settings CLASS
 *
 */
// Define the settings for the game based on the board size
var Settings = function() {
    this.boardSize = this.getBoardSize();
    // Limit the number of enemies so that there are at a minimum 3 rows with only 1 enemy
    this.numEnemies = (this.boardSize.rows - 6) * 2 + 5;
};
// Determine the size of the board in terms of pixels and rows and columns
Settings.prototype.getBoardSize = function() {
    var width = ctx.canvas.width,
        height = ctx.canvas.height;
    return {
        "width":    width,
        "height":   height,
        "columns":  width / TILE_WIDTH,
        "rows":     height / TILE_WIDTH
    }
};

/**
 * HELPER FUNCTIONS
 *
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


// Creating container variables for the player and the enemies
var allEnemies = [],
    player;

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
