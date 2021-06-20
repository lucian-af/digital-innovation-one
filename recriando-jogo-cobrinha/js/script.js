document.addEventListener('keydown', update);
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let interval = 350;
let box = 32;
let eixoX = 32;
let eixoY = 20;
let snake = [];
let direction = 'right';
let right = 37;
let left = 39;
let up = 40;
let down = 38;
snake = [...snake, { x: 0 * box, y: 0 * box }];
let food = {
  x: Math.floor(Math.random() * (eixoX - 1) + 1) * box,
  y: Math.floor(Math.random() * (eixoY - 1) + 1) * box
}
let score = 0;
const factorScore = 1.5;

function criarBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, eixoX * box, eixoY * box);
}

function createSnake() {
  context.fillStyle = 'green';
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function update(event) {
  if (event.keyCode === right && direction !== right) direction = 'left';
  if (event.keyCode === down && direction !== down) direction = 'up';
  if (event.keyCode === left && direction !== left) direction = 'right';
  if (event.keyCode === up && direction !== up) direction = 'down';
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function validateGame() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(run);
  alert(`Game Over :( !!! Pontuação: ${parseInt(score)}`);
  window.location.reload();
}

function hitWall() {
  if (snake[0].x > (eixoX * box) && direction === 'right') gameOver();
  if (snake[0].x < 0 && direction === 'left') gameOver();
  if (snake[0].y > (eixoY * box) && direction === 'down') gameOver();
  if (snake[0].y < 0 && direction === 'up') gameOver();
}

function feed() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food = {
      x: Math.floor(Math.random() * (eixoX - 1) + 1) * box,
      y: Math.floor(Math.random() * (eixoY - 1) + 1) * box
    }
    updateScore();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

function updateScore() {
  elementScore = document.getElementById('score');
  elementScore.innerHTML = parseInt(score += interval === 75 ? interval * factorScore : interval);
}

function startGame() {
  // manter ordem das funções é importante
  hitWall();
  validateGame();
  criarBG();
  createSnake();
  drawFood();
  feed();
}

var run = setInterval(init, interval);

function init() {
  clearInterval(run);

  if (interval <= 75) interval = 75;
  else interval = interval -= 1;

  startGame()
  run = setInterval(init, interval);

}
