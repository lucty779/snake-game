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
snakeImg.src = "./snake.png"; 
const foodImg = new Image();
foodImg.src = "./food.png";

// 创建手机按键
const controls = document.createElement("div");
controls.style.position = "absolute";
controls.style.bottom = "20px";
controls.style.left = "50%";
controls.style.transform = "translateX(-50%)";
controls.style.display = "grid";
controls.style.gridTemplateColumns = "repeat(3, 60px)";
controls.style.gridGap = "10px";
document.body.appendChild(controls);

const buttons = [
    { label: "⏸", action: "pause" },
    { label: "➕", action: "speedUp" },
    { label: "➖", action: "speedDown" },
    { label: "⬆", direction: "up" },
    { label: "🔄", action: "restart" },
    { label: "⬇", direction: "down" },
    { label: "⬅", direction: "left" },
    { label: "➡", direction: "right" }
];

buttons.forEach(({ label, direction, action }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.style.fontSize = "20px";
    btn.style.padding = "10px";
    btn.style.borderRadius = "5px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.textAlign = "center";
    
    btn.onclick = () => {
        if (direction) {
            if ((direction === "left" && direction !== "right") ||
                (direction === "right" && direction !== "left") ||
                (direction === "up" && direction !== "down") ||
                (direction === "down" && direction !== "up")) {
                window.gameDirection = direction;
            }
        }
        if (action === "pause") gamePaused = !gamePaused;
        if (action === "speedUp") speed = Math.max(50, speed - 10);
        if (action === "speedDown") speed = Math.min(200, speed + 10);
        if (action === "restart") restartGame();
    };
    
    controls.appendChild(btn);
});

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    food = { x: 5, y: 5 };
    gameRunning = true;
    gamePaused = false;
    speed = 100;
    gameLoop();
}

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
    if (window.gameDirection) direction = window.gameDirection;
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
    if (e.key === " ") gamePaused = !gamePaused;
    if (e.key === "+") speed = Math.max(50, speed - 10);
    if (e.key === "-") speed = Math.min(200, speed + 10);
    if (e.key === "r") restartGame();
});

function gameLoop() {
    update();
    draw();
    if (gameRunning) {
        setTimeout(gameLoop, speed);
    }
}

gameLoop();
