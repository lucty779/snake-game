// 贪吃蛇H5游戏 - 可在微信中直接玩
// 使用HTML5 Canvas + JavaScript

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
canvas.style.position = "absolute";
canvas.style.top = "50%";
canvas.style.left = "50%";
canvas.style.transform = "translate(-50%, -50%)";
document.body.appendChild(canvas);

let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = { x: 5, y: 5 };
let gameRunning = true;
let gamePaused = false;
let speed = 100;

const snakeImg = new Image();
snakeImg.src = "./snake.png"; // 图片路径与js路径一致
const foodImg = new Image();
foodImg.src = "./food.png"; // 图片路径与js路径一致

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (foodImg.complete) {
        ctx.drawImage(foodImg, food.x * 20, food.y * 20, 20, 20);
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    }

    snake.forEach(segment => {
        if (snakeImg.complete) {
            ctx.drawImage(snakeImg, segment.x * 20, segment.y * 20, 20, 20);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        }
    });
}

function update() {
    if (!gameRunning || gamePaused) return;
    let head = { ...snake[0] };
    if (direction === "right") head.x++;
    if (direction === "left") head.x--;
    if (direction === "up") head.y--;
    if (direction === "down") head.y++;
    
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }
    
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        alert("游戏结束!");
        gameRunning = false;
        return;
    }
    
    snake.unshift(head);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
    if (e.key === " ") gamePaused = !gamePaused; // 空格键暂停或继续
    if (e.key === "+") speed = Math.max(50, speed - 10); // 加快速度
    if (e.key === "-") speed = Math.min(200, speed + 10); // 减慢速度
});

function gameLoop() {
    update();
    draw();
    if (gameRunning) {
        setTimeout(gameLoop, speed);
    }
}

gameLoop();
