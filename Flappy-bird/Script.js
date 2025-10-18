const bat = document.getElementById('bat');
const obstacleContainer = document.getElementById('obstacle-container');
const scoreDisplay = document.getElementById('score');

let batY = window.innerHeight / 2;
let velocity = 0;
let gravity = 0.5;
let isGameOver = false;
let score = 0;

function flap() {
    velocity = -8;
}

document.addEventListener('keydown', flap);
document.addEventListener('click', flap);

function createObstacle() {
    const gap = 150;
    const topHeight = Math.random() * (window.innerHeight - gap - 200) + 50;
    const bottomHeight = window.innerHeight - topHeight - gap;

    const top = document.createElement('div');
    top.classList.add('obstacle');
    top.style.height = `${topHeight}px`;
    top.style.top = '0';
    top.style.left = '100vw';

    const bottom = document.createElement('div');
    bottom.classList.add('obstacle');
    bottom.style.height = `${bottomHeight}px`;
    bottom.style.bottom = '0';
    bottom.style.left = '100vw';

    obstacleContainer.appendChild(top);
    obstacleContainer.appendChild(bottom);

    let obstacleX = window.innerWidth;
    const moveInterval = setInterval(() => {
        if (isGameOver) return clearInterval(moveInterval);
        obstacleX -= 3;
        top.style.left = `${obstacleX}px`;
        bottom.style.left = `${obstacleX}px`;

        if (obstacleX < 100 && obstacleX > 97) {
            score++;
            scoreDisplay.textContent = score;
        }

        if (
            obstacleX < 140 &&
            obstacleX + 48 > 100 &&
            (batY < topHeight || batY > topHeight + gap)
        ) {
            gameOver();
        }

        if (obstacleX < -60) {
            top.remove();
            bottom.remove();
            clearInterval(moveInterval);
        }
    }, 16);
}

function gameOver() {
    isGameOver = true;
    alert('Game Over! Score: ' + score);
    location.reload();
}

function gameLoop() {
    if (isGameOver) return;
    velocity += gravity;
    batY += velocity;
    bat.style.top = `${batY}px`;

    if (batY > window.innerHeight || batY < 0) {
        gameOver();
    }

    requestAnimationFrame(gameLoop);
}

setInterval(createObstacle, 2000);
gameLoop();