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

let update = () => {};

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
    this.radius = 5;
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



// class Paddle {
//     constructor(x, y, width, height) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.x_speed = 0;
//         this.y_speed = 0
//     }
//     render ()  {
//         context.fillStyle = "#0000FF";
//         context.fillRect(this.x, this.width, this.height);
//     }
// }
//
//
// class Player{
//     constructor(paddle){
//         this.paddle = new Paddle(175, 580, 50, 10);
//     }
// }
//
//
// class Computer{
//     constructor(paddle){
//         this.paddle = new Paddle(175, 10, 50, 10);
//     }
// }
//
// Player.render = () => this.paddle.render();
// Computer.render = () => this.paddle.render();
//
//
// class Ball {
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.x_speed = 0;
//         this.y_speed = 3;
//         this.radius = 5;
//     }
//     render() {
//         context.beginPath();
//         context.arc(this.x, this.y, this.radius, 2 *  Math.PI, false);
//         context.fillStyle = "#000000";
//         context.fill()
//     };
// };
//
//
// let player = new Player();
// let computer = new Computer();
// let ball = new Ball(200, 300);
//
//
// var render = () => {
//     context.fillStyle = "#FF00FF";
//     context.fillRect(0, 0, width, height)
//     player.render();
//     computer.render();
//     ball.render()
// };
