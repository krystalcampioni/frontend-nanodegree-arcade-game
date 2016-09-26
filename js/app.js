'use strict';

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Creates the dialog boxes when the player wins or loses the game
var CustomAlert = function() {

    this.render = function(title, dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * 0.5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxtitle').innerHTML = title;
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="dialog__button" onclick="alert.ok()">OK</button>';
    };

    this.ok = function() {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    };

};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = Math.floor(Math.random() * ((-350) - (-150) + 1) + -150); //loops enemies offscreen
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    displayScoreLevel(score, gameLevel);
};

Player.prototype.render = function() {
    ctx.fillStyle = 'white'; // fixes the bug of the player leaving a trail behing when he reached the top
    ctx.fillRect(0, 0, 505, 51);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= TILE_WIDTH;
    } else if (key == 'up') {
        this.y -= TILE_HEIGHT;
    } else if (key == 'right') {
        this.x += TILE_WIDTH;
    } else if (key == 'down') {
        this.y += TILE_HEIGHT;
    } else if (key == 'enter') { // if the player presses enter, close the win/lose modal
        alert.ok();
    }
};

var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreDiv.innerHTML = 'Score: ' + aScore;
    levelDiv.innerHTML = 'Level: ' + aLevel;
};
//
// var checkCollisions = function(anEnemy)

var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        initialPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]; // generates a random y position from the possiblePositions

        enemy = new Enemy(
            Math.floor(Math.random() * ((-350) - (-150) + 1) + -150), // generates a random X position off screen
            initialPosition,
            (Math.random() * (250 - 100) + 100) // generates a random sppeed and adds 100 to it
        );

        allEnemies.push(enemy);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var alert = new CustomAlert();
var allEnemies = [];
var possiblePositions = [50, 140, 225]; // Possible Y coordinates that assure the enemy stays aligned to one of the 3 floor rows
var initialPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]; // Picks one of the possiblePositions randomly
var enemy = new Enemy(-150, initialPosition, (Math.random() * (250 - 100) + 100));
var player = new Player(200, 380, 50);
var score = 0;
var gameLevel = 1;
var scoreDiv = document.getElementById('score');
var levelDiv = document.getElementById('level');

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter' // included this key to allow the player to close the modals by pressing enter
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
