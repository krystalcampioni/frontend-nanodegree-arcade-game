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
      this.x = Math.floor(Math.random()*((-350) - (-150) + 1)+ -150); //loops enemies offscreen
  }

  checkCollision(this);
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
  if (key == 'left') {
      player.x -= player.speed + 52;
  }
  if (key == 'up') {
      player.y -= player.speed + 30;
  }
  if (key == 'right') {
      player.x += player.speed + 52;
  }
  if (key == 'down') {
      player.y += player.speed + 30;
  }
};

var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 25 >= anEnemy.y && player.y - 25 <= anEnemy.y &&
        player.x + 60 >= anEnemy.x && player.x - 60 <= anEnemy.x ) {

        if (score >= 5) {
          score -= 5;
        }

        player.x = 200;
        player.y = 380;
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    else if (player.y + 60 <= 0) {
        player.x = 200;
        player.y = 380;
        console.log('you win');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 10;
        gameLevel += 1;

        increaseDifficulty(gameLevel - 1);

    }

    // creates invisible walls to prevent player from moving off canvas
    if (player.y > 380 ) {
        player.y = 380;
    }
    else if (player.x > 400) {
        player.x = 400;
    }
    else if (player.x < 2.5) {
        player.x = 2.5;
    }
};

var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        initialPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];

        enemy = new Enemy(
          Math.floor(Math.random()*((-350) - (-150) + 1)+ -150), // generates a random X position off screen
          initialPosition, // generates a random y position from the possiblePositions
          (Math.random() * (250 - 100) + 100)
        );

        allEnemies.push(enemy);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var possiblePositions = [50, 140, 225];
var initialPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
var enemy = new Enemy(-150, initialPosition, (Math.random() * (250 - 100) + 100));
var player = new Player(200, 380, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
scoreLevelDiv.className = "score";

allEnemies.push(enemy);

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
