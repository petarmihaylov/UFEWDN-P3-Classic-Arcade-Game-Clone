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

    // Define all the menu text
    this.titleGame = new Text('40pt Impact', 'center', settings.boardSize.width / 2, 43, 'Classic Frogger Remake', 'Lime');
    this.rules = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 106, 'The Rules', 'DodgerBlue');
    this.controlsRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 179, 'Use the arrow keys to move', 'Lime');
    this.enemiesRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 228, 'Avoid the bugs', 'Lime');
    this.winRule = new Text('28pt Impact', 'center', settings.boardSize.width / 2, 272, 'Get to the water to win!', 'Lime');
    this.selectDifficulty = new Text('36pt Impact', 'center', settings.boardSize.width / 2, settings.boardSize.width / 2, 'Select Difficulty', 'DodgerBlue');

    this.easy = new Text('28pt Impact', 'center', settings.boardSize.width * 1 / 5, (settings.boardSize.height / 2) + 133, 'Easy');
    this.normal = new Text('28pt Impact', 'center', settings.boardSize.width * 2 / 5, (settings.boardSize.height / 2) + 133, 'Normal');
    this.hard = new Text('28pt Impact', 'center', settings.boardSize.width * 3 / 5, (settings.boardSize.height / 2) + 133, 'Hard');
    this.insane = new Text('28pt Impact', 'center', settings.boardSize.width * 4 / 5, (settings.boardSize.height / 2) + 133, 'Insane!');

    this.startGameRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 530, 'Press Space to Play', 'DodgerBlue');

    // Displays this message when the game is paused
    this.resumeRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 272, 'Press Space to Resume', 'DodgerBlue');

    // Displays these messages when the player looses
    this.lossRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 272, 'Sorry! You lost.', 'DodgerBlue');
    this.tryAgainRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, (settings.boardSize.height / 2) + 133, 'Press Space to Play Again', 'DodgerBlue');

    // Displays these messages when the player wins
    this.congratulationsRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, 272, 'Congratulations!', 'DodgerBlue');
    this.youWonRule = new Text('80pt Impact', 'center', settings.boardSize.width / 2, (settings.boardSize.height / 2) + 133, 'You Won!', 'Lime');
    this.tryAgainAfterWinningRule = new Text('36pt Impact', 'center', settings.boardSize.width / 2, (settings.boardSize.height / 2) + 233, 'Press Space to Play Again', 'DodgerBlue');
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

Game.prototype.update = function () {
    // Highlight the text for the game difficulty chosen
    if (settings.difficulty === 1) {
        this.easy.changeFillStyle('lime');
        this.normal.changeFillStyle('white');
        this.hard.changeFillStyle('white');
        this.insane.changeFillStyle('white');
    } else if (settings.difficulty === 2) {
        this.easy.changeFillStyle('white');
        this.normal.changeFillStyle('lime');
        this.hard.changeFillStyle('white');
        this.insane.changeFillStyle('white');
    } else if (settings.difficulty === 3) {
        this.easy.changeFillStyle('white');
        this.normal.changeFillStyle('white');
        this.hard.changeFillStyle('lime');
        this.insane.changeFillStyle('white');
    } else {
        this.easy.changeFillStyle('white');
        this.normal.changeFillStyle('white');
        this.hard.changeFillStyle('white');
        this.insane.changeFillStyle('lime');
    }

    // Animate the Press Space to Play text
    this.startGameRule.animate(36, 30, 0.2);

    // Animate the Press Space to Resume text (when the game is paused)
    this.resumeRule.animate(36, 30, 0.2);

    // Animate the Try again rule
    this.tryAgainRule.animate(36, 30, 0.2);

    // Animate the You Won rule
    this.youWonRule.animate(80, 60, 0.4);
};

Game.prototype.render = function() {
    if (!game.isStarted && game.isPaused && !game.isLost) {

        // Render the objects
        this.titleGame.render();
        this.rules.render();
        this.controlsRule.render();
        this.enemiesRule.render();
        this.winRule.render();
        this.selectDifficulty.render();

        this.easy.render();
        this.normal.render();
        this.hard.render();
        this.insane.render();

        this.startGameRule.render();

    } else if (game.isPaused && !(game.isWon || game.isLost))  {
        this.resumeRule.render();
    } else if (game.isLost) {
        this.lossRule.render();
        this.tryAgainRule.render();
    } else if ( game.isWon) {
        // TODO: Define what happens when the game is won!
        this.congratulationsRule.render();
        this.youWonRule.render();
        this.tryAgainAfterWinningRule.render();
        game.isPaused = true;
    } else {
        game.isStarted = true;
    }
};

Game.prototype.reset = function () {
    this.isStarted = false;
    this.isPaused = true;
    this.isWon = false;
    this.isLost = false;
    for (var enemy = 0, enemies = allEnemies.length; enemy < enemies; enemy++) {
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
        if (settings.difficulty > 1 ) settings.difficulty -= 1;
        //console.log('Left Arrow pressed - Difficulty: ' + settings.difficulty);
        //game.reset();
    }
    if ( (key === 'right') && (!game.isStarted) ) {
        if (settings.difficulty < 4 ) settings.difficulty += 1;
        //game.reset();
        //console.log('Right Arrow pressed - Difficulty: ' + settings.difficulty);
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

// TODO: Refactor the Settings to be part of the Game class
/**
 * SETTINGS CLASS
 *
 */
// Define the settings for the game based on the board size
var Settings = function() {
    /** 1 - easy, 2 - normal, 3 - hard, 4 - insane --- default is normal
     * Easy:
     * There are always AT LEAST 3 rows that have AT MOST 1 enemy
     *
     * Normal:
     * There are always AT LEAST 1 rows that have AT MOST 1 enemy
     *
     * Hard:
     * No guarantee that a row will have only 1 enemy
     *
     * Insane:
     * Many, many enemies!
     *
     */
    this.difficulty = 2;

    this.boardSize = this.getBoardSize();
    // Limit the number of enemies so that there are at a minimum 3 rows with only 1 enemy - EASY difficulty
    //this.numEnemies = (this.boardSize.rows - 6) * 2 + 5;
    if (this.difficulty === 1) {
        // Ensures there are always at least 5 enemies
        this.numEnemies = 5;
    } else {
        this.numEnemies = this.difficulty * 4 - 1;
    }
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

Settings.prototype.update = function (){
    if (this.difficulty === 1) {
        // Ensures there are always at least 5 enemies
        this.numEnemies = 5;
    } else {
        this.numEnemies = this.difficulty * 4 - 1;
    }
};

/**
 * TEXT CLASS
 *
 */

var Text = function (font, alignment, x, y, text, fillStyle) {
    // TODO: Refactor this to use a separate value for the font size, unit of measure, and font
    this.font = font;

    // Returns whatever is in front of 'pt Impact' for easier font size manipulation
    this.fontSize = font.slice(0,2);
    this.alignment = alignment;
    this.x = x;
    this.y = y;
    this.text = text;
    this.fillStyle = fillStyle;
    this.isGettingSmaller = true;
};

Text.prototype.changeFillStyle = function(newColor) {
    this.fillStyle = newColor;
    ctx.fillStyle = this.fillStyle;
};

Text.prototype.changeSize = function(changeSize) {
    // Converts the new font size to a string and prepends it to a sliced 'pt Impact'
    //console.log('Old Font Size: ' + this.fontSize)
    this.fontSize = parseFloat(this.fontSize) + changeSize;
    //console.log('New Font Size: ' + this.fontSize);
    // TODO: Refactor this to use a variable as the units of measure and the font
    this.font = this.fontSize.toString() + this.font.slice(-9);
    //console.log('New Font (and size): ' + this.font);
};

Text.prototype.animate = function(biggestSize, smallestSize, stepChange) {
    if (this.fontSize <= biggestSize && this.fontSize > smallestSize && this.isGettingSmaller) {
        this.changeSize(stepChange * (-1));
    } else {
        this.isGettingSmaller = false;
    }

    if (this.fontSize >= (smallestSize - 1) && this.fontSize < biggestSize && !this.isGettingSmaller) {
        this.changeSize(stepChange);
    } else {
        this.isGettingSmaller = true;
    }
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
    for (var enemy = 0, enemies = allEnemies.length; enemy < enemies; enemy++) {
        if (allEnemies[enemy].row === player.row && (((allEnemies[enemy].x + 70) >= (player.x)) && allEnemies[enemy].x < player.x + 70))
        {
            game.isPaused = true;
            game.isLost = true;
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
