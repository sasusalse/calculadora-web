// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = { x: 50, y: 340, width: 50, height: 50, dy: 0, gravity: 0.5, jumpPower: -10, isJumping: false };
let obstacles = [];
let lives = 3;
let score = 0;
let highScore = 0;
let gameOver = false;

document.getElementById("lives").innerText = "❤️❤️❤️";

// Control del salto
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !player.isJumping) {
        player.isJumping = true;
        player.dy = player.jumpPower;
    }
});

function createObstacle() {
    const obstacleHeight = 50;
    const obstacleWidth = 50;
    const obstacle = { x: canvas.width, y: canvas.height - obstacleHeight, width: obstacleWidth, height: obstacleHeight };
    obstacles.push(obstacle);
}

function drawPlayer() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = "#FF0000";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= 5;
    });

    // Eliminar obstáculos fuera del canvas
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function updatePlayer() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y >= canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
    }
}

function detectCollision() {
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            // Colisión detectada
            loseLife();
        }
    });
}

function loseLife() {
    lives -= 1;
    document.getElementById("lives").innerText = "❤️".repeat(lives);
    if (lives === 0) {
        gameOver = true;
        if (score > highScore) {
            highScore = score;
        }
        alert("¡Has perdido! Tu puntuación más alta es: " + highScore);
        resetGame();
    }
}

function resetGame() {
    lives = 3;
    score = 0;
    obstacles = [];
    document.getElementById("lives").innerText = "❤️❤️❤️";
    gameOver = false;
}

function updateScore() {
    score += 1;
    document.getElementById("score").innerText = "Score: " + score;
}

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawObstacles();
        updatePlayer();
        detectCollision();
        updateScore();

        if (Math.random() < 0.01) {
            createObstacle();
        }

        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
