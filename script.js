const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // Размер блока змейки
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let playing = true;

// Генерация еды
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// Основной игровой цикл
function gameLoop() {
    if (!playing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
    setTimeout(gameLoop, 100);
}

// Рисуем змейку
function drawSnake() {
    for (let segment of snake) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, box, box);
    }
}

// Рисуем еду
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

// Движение змейки
function moveSnake() {
    const head = { x: snake[0].x + direction.x * box, y: snake[0].y + direction.y * box };
    snake.unshift(head);

    // Если еда съедена
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Проверка столкновений
function checkCollision() {
    const head = snake[0];

    // Столкновение со стеной
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Столкновение с самим собой
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// Завершение игры
function endGame() {
    playing = false;
    document.getElementById('gameOverModal').style.display = 'flex';
}

// Обработчики событий для управления
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Обработчики кнопок джойстика
document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById('down').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
document.getElementById('left').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById('right').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Кнопка «Начать заново»
document.getElementById('restartButton').addEventListener('click', () => {
    resetGame();
});

// Кнопка «Закрыть»
document.getElementById('closeButton').addEventListener('click', () => {
    window.close();
});

// Сброс игры
function resetGame() {
    direction = { x: 0, y: 0 };
    snake = [{ x: 9 * box, y: 9 * box }];
    food = generateFood();
    playing = true;
    document.getElementById('gameOverModal').style.display = 'none';
    gameLoop();
}

// Запуск игры
gameLoop();