let animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };


let canvas = document.createElement('canvas');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let context = canvas.getContext('2d');

window.onload = () => {
    document.body.appendChild(canvas);
    animate(step);
};

let step = () => {
    update();
    render();
    animate(step);
};

var update = () => {
    player.update();
    computer.update(ball)
    ball.update(player.paddle, computer.paddle);


};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width/.3;
    this.height = height/.6;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
    this.paddle = new Paddle(width/2.5, height-50, 50, 10);
}

function Computer() {
    this.paddle = new Paddle(width/2.5, height-(height-50), 50, 10);
}

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 7;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(width/2, height/2);

var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};

// AMIMATION

Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    let top_x = this.x - 5;
    let top_y = this.y - 5;
    let bottom_x = this.x + 5;
    let bottom_y = this.y + 5;

    if (this.x - 5 < 0) {
        //    hitting left wall
        this.x = 5;
        this.x_speed = -this.x_speed
    } else if (this.x + 5 > width) {
        //    hitting the right wall
        this.x = (width - 5);
        this.x_speed = -this.x_speed
    }

    if (this.y < 0 || this.y > height) {
        //    score
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = width;
        this.y = height;
    }

    if (top_y > 300) {
        if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x){
        //        hit the players paddle
        this.y_speed = -3
        this.x_speed += (paddle1.x_speed / 2)
        this.y += this.y_speed;
        }
} else {
        if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            //hit computer paddle
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2)
            this.y += this.y_speed
        }
    }
};

//CONTROLS

let keysDown = {};

window.addEventListener('keydown', function (event){
    keysDown[event.keyCode] = true
});

window.addEventListener("keyup", function(event){
    delete keysDown[event.keyCode];
});

Player.prototype.update = function () {
    for(let key in keysDown) {
        let value = Number(key);
        if(value == 37) {
            // left arrow
            this.paddle.move(-4, 0);
        } else if (value == 39) {
            //right arrorw
            this.paddle.move(4, 0);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) {
        //all the way left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > width) {
        //all the way right
        this.x = width - this.width;
        this.x_speed = 0
    }
}

//Computer AI

Computer.prototype.update = function (ball) {
    let x_pos = ball.x
    let diff = -((this.paddle.x +(this.paddle.width / 2)) - x_pos);
    if(diff < 0 && diff < -4){
    //    max speed left
        diff = -5;
    } else if(diff > 0 && diff > 4) {
    //    max speed right
        diff = 5;
    }
    this.paddle.move(diff, 0)
    if(this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > width) {
        this.paddle.x = width - this. paddle.width;
    }
};



