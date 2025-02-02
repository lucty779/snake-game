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

// 左上角的暂停和重开按钮
const topControls = document.createElement("div");
topControls.style.position = "absolute";
topControls.style.top = "10px";
topControls.style.left = "10px";
topControls.style.display = "flex";
topControls.style.gap = "10px";
document.body.appendChild(topControls);

const topButtons = [
    { label: "⏸", action: "pause" },
    { label: "🔄", action: "restart" }
];

topButtons.forEach(({ label, action }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.style.fontSize = "20px";
    btn.style.padding = "10px";
    btn.style.borderRadius = "5px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    
    btn.onclick = () => {
        if (action === "pause") gamePaused = !gamePaused;
        if (action === "restart") restartGame();
    };
    
    topControls.appendChild(btn);
});

// 正下方的方向控制按钮（十字布局）
const moveControls = document.createElement("div");
moveControls.style.position = "absolute";
moveControls.style.bottom = "80px";
moveControls.style.left = "50%";
moveControls.style.transform = "translateX(-50%)";
moveControls.style.display = "grid";
moveControls.style.gridTemplateColumns = "60px 60px 60px";
moveControls.style.gridGap = "10px";
document.body.appendChild(moveControls);

const moveButtons = [
    { label: "⬆", direction: "up" },
    { label: "⬅", direction: "left" },
    { label: "➡", direction: "right" },
    { label: "⬇", direction: "down" }
];

moveButtons.forEach(({ label, direction }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.style.fontSize = "20px";
    btn.style.padding = "10px";
    btn.style.borderRadius = "5px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.width = "60px";
    btn.style.height = "60px";
    
    btn.onclick = () => {
        if ((direction === "left" && direction !== "right") ||
            (direction === "right" && direction !== "left") ||
            (direction === "up" && direction !== "down") ||
            (direction === "down" && direction !== "up")) {
            window.gameDirection = direction;
        }
    };
    
    moveControls.appendChild(btn);
});

// 右下角的加速和减速按钮
const speedControls = document.createElement("div");
speedControls.style.position = "absolute";
speedControls.style.bottom = "20px";
speedControls.style.right = "10px";
speedControls.style.display = "flex";
speedControls.style.gap = "10px";
document.body.appendChild(speedControls);

const speedButtons = [
    { label: "➕", action: "speedUp" },
    { label: "➖", action: "speedDown" }
];

speedButtons.forEach(({ label, action }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.style.fontSize = "20px";
    btn.style.padding = "10px";
    btn.style.borderRadius = "5px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    
    btn.onclick = () => {
        if (action === "speedUp") speed = Math.max(50, speed - 10);
        if (action === "speedDown") speed = Math.min(200, speed + 10);
    };
    
    speedControls.appendChild(btn);
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
