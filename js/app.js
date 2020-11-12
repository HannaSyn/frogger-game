const cellHeight = 83;
const cellWidth = 101;
const totalRow = 6;
const totalCol = 5;

class Position {
    minY;
    minX;
    maxY;
    maxX;
    initPlayerX;
    initPlayerY;
    x;
    y;
    speed = Math.floor(Math.random(3) * (6 - 3 + 1)) + 3;

    constructor( row, col ) {
        this.initPlayerX = (cellWidth * col) - (cellWidth);
        this.initPlayerY = (cellHeight * row) - (cellHeight / 2);
        this.x = this.initPlayerX;
        this.y = this.initPlayerY;

        this.maxY = cellHeight * (totalRow - 1);
        this.maxX = cellWidth * (totalCol - 1);
        this.minY = -41.5;
        this.minX = 0;
    }

    addRow() {
        let newLocY = this.y - cellHeight;
        if (newLocY >= this.minY) {
            this.y = newLocY; 
        }
    };
    removeRow() {
        let newLocY = this.y + cellHeight;
        if (newLocY <= this.maxY) {
            this.y = newLocY; 
        }
    };
    addCol() {
        let newLocX = this.x + cellWidth;
        if (newLocX <= this.maxX) {
            this.x = newLocX; 
        }
    };
    removeCol() {
        let newLocX = this.x - cellWidth;
        if (newLocX >= this.minX) {
            this.x = newLocX; 
        }
    }
    reset() {
        this.x = this.initPlayerX;
        this.y = this.initPlayerY;
    }
    run(dt) {
        if (this.x <= this.maxX) {
            (this.x += this.speed) * dt ;
        } else {
            this.x = 0;
        }
    }
};

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    sprite = 'images/enemy-bug.png';

    constructor ( Position ) {
        this.position = Position;
    }

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.position.run(dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Player {
    sprite = 'images/char-horn-girl.png';
    position;

    constructor ( Position ) {
        this.position = Position;
    }

    // checkCollisions(enemy) {
    //     if ( this.position.x == enemy.position.x && this.position.y == enemy.position.y ) {
    //         this.position.reset();
    //     }
    // }
    win() {
        if (this.position.y == this.position.minY) {
            setTimeout(() => {
                alert("Congrats! You win!");
                this.position.reset();
            }, 0);
        }
    }
}    

Player.prototype.update = function() {
    this.win();
};

Player.prototype.handleInput = function(keyCode) {

    switch(keyCode) {
        case 'up': 
            this.position.addRow();
            break;
        case 'down': 
            this.position.removeRow();
            break;
        case 'right': 
            this.position.addCol();
            break;
        case 'left': 
            this.position.removeCol();
            break;
        default: 
            break;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    enemy1 = new Enemy (new Position ( 1, 0 )),
    enemy2 = new Enemy (new Position ( 2, 0 )),
    enemy3 = new Enemy (new Position ( 3, 0 )),
];

let player = new Player( new Position( 5, 3 ) );

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.position.x == player.position.x && enemy.position.y == player.position.y) {
            return player.position.reset()
        }
    });
}
checkCollisions();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
