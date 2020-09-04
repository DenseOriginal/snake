/// <reference path="../node_modules/@types/p5/global.d.ts"/>
import { Color } from "p5";

interface ISnake {
    x: number;
    y: number;
}

enum DIRECTION {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const gridSize = 20;

// Make sure we don't have half cubes and only as many as we can????????
let canvasHeight = window.innerHeight - (window.innerHeight / 100 * 10);
canvasHeight -= (canvasHeight % gridSize);
const canvasWidth = canvasHeight;

const rows = canvasHeight / gridSize;
const columns = canvasWidth / gridSize;

let snakeLength = 0;
let snakeMinLength = 2;
let snake: ISnake[] = Array<ISnake>();

let currentDir: DIRECTION = DIRECTION.UP;

let applePos: ISnake;

const getSnakeHead = (): ISnake => snake[0];

let speed = 6;

let isDead = false;

let deltaFrames = 0;

(window as any).setup = () => {
    createCanvas(canvasWidth, canvasHeight);
    addLink(rows / 2, columns / 2);
    randomizeApple();
    isDead = false;
    (document.getElementById('restartButton') as HTMLButtonElement).style.display = "none";
    snakeLength = 0;
}

(window as any).draw = () => {
    background(0);

    push()
    colorMode(HSB, 100)
    snake.forEach((cur, idx) => {
        drawAtPoint(cur.x, cur.y, color((idx * 3 + 30) % 100, 100, 100))
    });
    pop();

    // Move And Cut Snake
    if(deltaFrames++ == speed && !isDead) {
        moveSnake();
    }

    drawAtPoint(applePos.x, applePos.y, color(255, 100, 100));
    if(isPosEqual(applePos, getSnakeHead())) {
        snakeLength++;
        randomizeApple();
    }

    // Draw grid lines
    strokeWeight(2);
    stroke(0);
    for (let i = 0; i < rows; i++) {
        line(0, i * gridSize, canvasWidth, i * gridSize);
    }
    for (let i = 0; i < columns; i++) {
        line(i * gridSize, 0, i * gridSize, canvasHeight);
    }

    // Draw Highscore
    noStroke();
    fill(255);
    textSize(30);
    text('Score: ' + snakeLength, 20, 40);
}

(window as any).keyPressed = () => {
    switch (keyCode) {
        case UP_ARROW:
            currentDir = currentDir === DIRECTION.DOWN ? DIRECTION.DOWN : DIRECTION.UP;
            break;
        
        case DOWN_ARROW:
            currentDir = currentDir === DIRECTION.UP ? DIRECTION.UP : DIRECTION.DOWN;
            break;
        
        case LEFT_ARROW:
            currentDir = currentDir === DIRECTION.RIGHT ? DIRECTION.RIGHT : DIRECTION.LEFT;
            break;
        
        case RIGHT_ARROW:
            currentDir = currentDir === DIRECTION.LEFT ? DIRECTION.LEFT : DIRECTION.RIGHT;
            break;
    };
    moveSnake();
}

function drawAtPoint(x: number, y: number, fillColor: Color = color(50, 255, 50)) {
    fill(fillColor);
    rect(gridSize * x, gridSize * y, gridSize, gridSize);
}

function addLink(x: number, y: number) {
    snake.unshift({
        x: ~~x,
        y: ~~y
    });
}

function moveSnake() {
    let newPos: ISnake = JSON.parse(JSON.stringify(getSnakeHead()));

    switch (currentDir) {
        case DIRECTION.UP:
            // newPos.y = newPos.y == 0 ? columns-1 : newPos.y - 1;
            newPos.y--
            break;
        
        case DIRECTION.DOWN:
            // newPos.y = ++newPos.y % columns;
            newPos.y++
            break;

        case DIRECTION.LEFT:
            // newPos.x = newPos.x == 0 ? rows-1 : newPos.x - 1;
            newPos.x--
            break;
        
        case DIRECTION.RIGHT:
            // newPos.x = ++newPos.x % rows;
            newPos.x++
            break;
    }

    if(newPos.x < 0 || newPos.x > rows - 1 ||
       newPos.y < 0 || newPos.y > columns - 1) {
           die()
           return;
       }

    deltaFrames = 0;
    addLink(newPos.x, newPos.y);
    snake.length = snakeLength + snakeMinLength;
    if(snake.filter(cur => isPosEqual(cur, newPos)).length > 1) die();
    
}

function randomizeApple() {
    applePos = {
        x: ~~(Math.random() * rows),
        y: ~~(Math.random() * columns)
    }
}

function isPosEqual(pos1: ISnake, pos2: ISnake) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function die() {
    isDead = true;
    (document.getElementById('restartButton') as HTMLButtonElement).style.display = "block";
}

(document.getElementById('restartButton') as HTMLButtonElement).addEventListener('click', (window as any).setup);