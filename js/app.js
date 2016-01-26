/**
 * GLOBAL CONSTANTS
 *
 */
var TILE_WIDTH = 101,
    TILE_HEIGHT = 171,
    TILE_HEIGHT_OFFSET = 83,
    PLAYER_OFFSET_FROM_BOTTOM = 200;

/**
 * GAME CLASS
 *
 */

var Game = function () {
    this.isStarted = false;
    this.isPaused = true;
    this.isWon = false;
    this.isLost = false;
    // 1 - easy, 2 - normal, 3 - hard --- default is normal
    this.difficulty = 3;
};
Game.prototype.togglePauseResume =  function() {
    (this.isPaused) ? this.isPaused = false : this.isPaused = true;

    // Debug
    //if (this.isPaused) {
    //
    //    // Debug player position
    //    console.log('Player Position:');
    //    console.log('x: ' + player.x);
    //    console.log('y: ' + player.y);
    //    console.log('row: ' + player.row);
    //    console.log('col: ' + player.column);
    //
    //    //Debug enemy position
    //    console.log('Enemy[0] Position:');
    //    console.log('x: ' + allEnemies[0].x);
    //    console.log('y: ' + allEnemies[0].y);
    //    console.log('row: ' + allEnemies[0].row);
    //    console.log('col: ' + allEnemies[0].column);
    //    console.log(Math.ceil((allEnemies[0]  .x + TILE_WIDTH) / TILE_WIDTH));
    //}
};

Game.prototype.render = function() {
    if (!game.isStarted && game.isPaused && !game.isLost) {
        // These are the only Text objects that will need to have their properties changed so all other text ca be a simple function call
        var easy = new Text('28pt Impact', 'center', settings.boardSize.width / 5, (settings.boardSize.width / 2) + 83, 'Easy');
        var normal = new Text('28pt Impact', 'center', settings.boardSize.width / 2, (settings.boardSize.width / 2) + 83, 'Normal');
        var hard = new Text('28pt Impact', 'center', settings.boardSize.width * 4 / 5, (settings.boardSize.width / 2) + 83, 'Hard');

        var titleGame = new Text('40pt Impact', 'center', settings.boardSize.width / 2, 43, 'Classic Frogger Remake');
        var rules = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 106, 'The Rules');
        var controlsRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 179, 'Use the arrow keys to move');
        var enemiesRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 228, 'Avoid the bugs');
        var winRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 272, 'Get to the water to win!');
        var selectDifficulty = new Text('36pt Impact', 'center', settings.boardSize.width / 2, settings.boardSize.width / 2, 'Select Difficulty');

        // Highlight the text for the game difficulty chosen
        if (game.difficulty === 1) {
            easy.changeFillStyle('yellow');
            console.log('Easy fillStyle: ' + easy.fillStyle);
        } else if (game.difficulty === 2) {
            normal.changeFillStyle('yellow');
            console.log('Normal fillStyle: ' + normal.fillStyle);
        } else {
            hard.changeFillStyle('yellow');
            console.log('Hard fillStyle: ' + hard.fillStyle);
        }

        // Render the objects
        titleGame.render();
        rules.render();
        controlsRule.render();
        enemiesRule.render();
        winRule.render();
        selectDifficulty.render();

        easy.render();
        normal.render();
        hard.render();

        Text('36pt Impact', 'center', settings.boardSize.width / 2, 530, 'Press Space to Play');
    } else if (game.isPaused && !game.isLost) {
        Text('36pt Impact', 'center', settings.boardSize.width / 2, 272, 'Press Space to Resume');
    } else if (game.isLost) {
        Text('36pt Impact', 'center', settings.boardSize.width / 2, 272, 'Sorry! You lost.');
        Text('36pt Impact', 'center', settings.boardSize.width / 2, settings.boardSize.width / 2, 'Press Space to Play Again');
    } else if (game.isWon) {

    } else {
        game.isStarted = true;
    }
};

Game.prototype.reset = function () {
    this.isStarted = false;
    this.isPaused = true;
    this.isWon = false;
    this.isLost = false;
    for (var enemy = 0; enemy < settings.numEnemies; enemy++) {
        allEnemies[enemy].reset();
    }
    player.reset();
    console.log('game reset triggered');
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
    this.row = 0;
    this.column = 0;
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
        this.column = Math.ceil((this.x + TILE_WIDTH) / TILE_WIDTH);
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

// Resets the enemy back to a random row position off of the screen on the left
Enemy.prototype.reset = function() {
    this.row = getRandomInt(2, 6);
    this.column = 0;
    this.x = TILE_WIDTH * -2; // Spawn a little further away from the page to give the player some breathing room
    this.y = (this.row * TILE_HEIGHT_OFFSET) + 65 - TILE_HEIGHT;
    this.speed = getRandomNumber(1, 3); // generates a random speed factor for the enemy
};

/**
 * PLAYER CLASS
 *
 */
var Player = function() {
    // The player is initially not on the board
    this.isOnTheBoard = false;

    // Default game state is paused, so instantiating the player off of the screen will make them "invisible"
    this.x = (settings.boardSize.width - TILE_WIDTH) / 2;
    this.y = settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM;
    this.row = settings.boardSize.rows;
    this.column = Math.ceil((settings.boardSize.columns / 2));
    this.sprite = 'images/char-boy.png'
};

// Update the player's position on the board
Player.prototype.update = function(dt) {
    if (!this.isOnTheBoard) {
        this.putOnTheBoard();
        this.isOnTheBoard = true;
    } else {
        this.move(dt);
        // Makes sure the player always stays on the board
        if (this.x < 0) {
            this.x = 0;
            this.column = 1;
        }

        if (this.x > settings.boardSize.width - TILE_WIDTH) {
            this.x = settings.boardSize.width - TILE_WIDTH;
            this.column = settings.boardSize.columns;
        }

        if (this.y < -9) {
            this.y = -9;
            this.row = 1;
        }

        if (this.y > settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM) {
            this.y = settings.boardSize.height - PLAYER_OFFSET_FROM_BOTTOM;
            this.row = settings.boardSize.rows;
        }
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

    // Use rows for simpler collision detection
    this.row = settings.boardSize.rows;
    this.column = Math.ceil(settings.boardSize.columns / 2);
};

Player.prototype.handleInput = function(key) {
    var positionChange,
        changeXBy = 0,
        changeYBy = 0,
        changeRowBy = 0,
        changeColumnBy = 0;

    // Toggles paused/running states of the game
    if (key === 'space' || key === 'enter') game.togglePauseResume();
    if ( (key === 'space' || key === 'enter') && (game.isLost || game.isWon) ) {
        game.isLost = false;
        game.isWon = false;
        game.reset();
    }

    // Choose the game difficulty
    if ( (key === 'left') && (!game.isStarted) ) {
        if (game.difficulty > 1 ) game.difficulty -= 1;
        console.log('Left Arrow pressed - Difficulty: ' + game.difficulty);
    }
    if ( (key === 'right') && (!game.isStarted) ) {
        if (game.difficulty < 3 ) game.difficulty += 1;
        console.log('Right Arrow pressed - Difficulty: ' + game.difficulty);
    }

    // Prevents the player from moving if the game is paused
    if (game.isPaused) return;

    if (key === 'up') {
        changeYBy -= TILE_HEIGHT_OFFSET;
        changeRowBy -= 1;
    }

    if (key === 'down') {
        changeYBy += TILE_HEIGHT_OFFSET;
        changeRowBy += 1;
    }

    if (key === 'left') {
        changeXBy -= TILE_WIDTH;
        changeColumnBy -= 1;
    }

    if (key === 'right') {
        changeXBy += TILE_WIDTH;
        changeColumnBy += 1;
    }

    positionChange = {
        'x':        changeXBy,
        'y':        changeYBy,
        'row':      changeRowBy,
        'column':   changeColumnBy
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
    this.row += positionChange.row;
    this.column += positionChange.column;
};

//TODO: Refactor the Settings to part of the Game class
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
 * TEXT CLASS
 *
 */

var Text = function (font, alignment, x, y, text, fillStyle) {
    this.font = font;
    this.alignment = alignment;
    this.x = x;
    this.y = y;
    this.text = text;
    this.fillStyle = fillStyle;
};

Text.prototype.changeFillStyle = function(newColor) {
    this.fillStyle = newColor
    ctx.fillStyle = this.fillStyle;
};

Text.prototype.render = function() {
    ctx.font = this.font;
    ctx.textAlign = this.alignment;

    // Press Space to Play
    ctx.fillStyle = this.fillStyle || 'white';
    ctx.fillText(this.text, this.x, this.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(this.text, this.x, this.y);
};

/**
 * Collision Detection
 *
 */
function checkCollisions() {
    for (var enemy = 0; enemy < settings.numEnemies; enemy++) {
        if (allEnemies[enemy].row === player.row && (((allEnemies[enemy].x + 70) >= (player.x)) && allEnemies[enemy].x < player.x + 70))
        {
            game.isPaused = true;
            game.isLost = true;
            console.log('Game is Starter: ' + game.isStarted);
            console.log('Game is Paused: ' + game.isPaused);
            console.log('Game is Over: ' + game.isLost);
            Text('36pt Impact', 'center', settings.boardSize.width / 2, settings.boardSize.width / 2, 'Game Over');
            Text('28pt Impact', 'center', settings.boardSize.width / 2, (settings.boardSize.width / 2) + 83, 'Press Space to try again');
            console.log('Game is about to reset');
        }
        if (player.row === 1) game.isWon = true;
    }
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
        13: 'enter',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
