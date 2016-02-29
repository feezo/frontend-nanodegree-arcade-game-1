// Game settings for both app.js and engine.js
var settings = {
    width: 505,
    height: 606
};


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the inital position of the enemy
    this.x = Math.floor(Math.random() * settings.width);
    var possibleYPositions = [65, 148, 231];
    this.y = possibleYPositions[Math.floor(Math.random() *
                                           possibleYPositions.length)];

    // Set the speed of the enemy to be a random value between 1 and 400
    this.speed = Math.floor(Math.random() * 400) + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // When the enemy goes off the screen, wrap it back on the other side of the screen
    if (this.x > settings.width) {
        // Start the enemy off the left edge of the canvas so it comes on in motion
        this.x = -Resources.get(this.sprite).width;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set the image to use for the player
    this.sprite = 'images/char-boy.png';

    // Set the inital position of the player
    this.x = 202; // 2 * 101
    this.y = 380;
};

// Handle input from the player
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        // Move player one square left, as long as player is on the screen
        if (this.x > 0) {
            this.x -= 101;
        }
    }
    else if (key === 'right') {
        // Move player one square right, as long as player is on the screen
        if (this.x < 404) {
            this.x += 101;
        }
    }
    else if (key === 'up') {
        if (this.y > 0) {
            this.y -= 83;
        }
    }
    else if (key === 'down') {
        if (this.y < 415) {
            this.y += 83;
        }
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

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
