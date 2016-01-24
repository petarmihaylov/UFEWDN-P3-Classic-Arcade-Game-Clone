/**
 * GLOBAL CONSTANTS
 *
 */
var TILE_WIDTH = 101,
    TILE_HEIGHT_OFFSET = 83,
    PLAYER_OFFSET_FROM_BOTTOM = 200;

/**
 * GAME CLASS
 *
 */

var Game = function () {
    this.isPaused = true;
    this.isWon = false;
    this.isOver = false;
};
Game.prototype.toggleState =  function() {
    (this.isPaused) ? this.isPaused = false : this.isPaused = true;
};

/**
 * ENEMY CLASS
 *
 */
var Enemy = function() {
    // The enemy is initially not on the board
    this.isOnTheBoard = false;

    // Default game state is paused, so instantiating the enemies off of the screen will make them "invisible"
    this.x = -500;
    this.y = -500;
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

// Moves the enemy across the screen as the game progresses
Enemy.prototype.move = function(dt) {
    this.x = this.x + TILE_WIDTH * this.speed * dt;
};

// Resets the enemy back to a random position off of the screen on the left
Enemy.prototype.reset = function() {
    this.row = getRandomInt(0, 4);
    this.x = TILE_WIDTH * -2; // Spawn a little further away from the page to give the player some breathing room
    this.y = (this.row * TILE_HEIGHT_OFFSET) + 62;
    this.speed = getRandomNumber(1, 3); // generates a random speed factor for the enemy
};

/**
 * PLAYER CLASS
 *
 */
var Player = function() {
    // Default game state is paused, so instantiating the player off of the screen will make them "invisible"
    this.x = -500;
    this.y = -500;
    this.isOnTheBoard = false;
    this.sprite = 'images/char-boy.png'
};

// Update the player's position on the board
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

// Renders the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.putOnTheBoard = function() {
    this.reset();
};

// Resets the player to their original position on the board
Player.prototype.reset = function() {
    this.x = (settings.boardSize.width - TILE_WIDTH) / 2;
    this.y = settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM;
};

Player.prototype.handleInput = function(key) {
    var positionChange,
        changeXBy = 0,
        changeYBy = 0;

    // Toggles paused/running states of the game
    if (key === 'space') game.toggleState();

    // Prevents the player from moving if the game is paused
    if (game.isPaused) return;
    if (key === 'up')       changeYBy -= TILE_HEIGHT_OFFSET;
    if (key === 'down')     changeYBy += TILE_HEIGHT_OFFSET;
    if (key === 'left')     changeXBy -= TILE_WIDTH;
    if (key === 'right')    changeXBy += TILE_WIDTH;

    positionChange = {
        'x': changeXBy,
        'y': changeYBy
    };

    this.move(positionChange);
};

// Moves the player across the screen based on key input
Player.prototype.move = function(positionChange) {
    // Returns from this function if the player has not had a chance to enter any input yet
    if (positionChange === undefined) return;

    // Updates the player position
    this.x += positionChange.x;
    this.y += positionChange.y;

    // Makes sure the player always stays on the board
    if (this.x < 0)
        this.x = 0;

    if (this.x > settings.boardSize.width - TILE_WIDTH)
        this.x = settings.boardSize.width - TILE_WIDTH;

    if (this.y < -9)
        this.y = -9;

    if (this.y > settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM) {
        this.y = settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM;
    }

    // Debug player position
    console.log('Player Position:');
    console.log('X ' + this.x);
    console.log('Y ' + this.y);
};

/**
 * SETTINGS CLASS
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
        'width':    width,
        'height':   height,
        'columns':  width / TILE_WIDTH,
        'rows':     height / TILE_WIDTH
    }
};

/**
 * Collision Detection
 *
 */
function checkCollisions() {

}

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
var game,
    allEnemies = [],
    player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
