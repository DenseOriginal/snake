/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["DOWN"] = 1] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
})(DIRECTION || (DIRECTION = {}));
var gridSize = 20;
// Make sure we don't have half cubes and only as many as we can????????
var canvasHeight = window.innerHeight - (window.innerHeight / 100 * 10);
canvasHeight -= (canvasHeight % gridSize);
var canvasWidth = canvasHeight;
var rows = canvasHeight / gridSize;
var columns = canvasWidth / gridSize;
var snakeLength = 3;
var snake = Array();
var currentDir = DIRECTION.UP;
var applePos;
var getSnakeHead = function () { return snake[0]; };
var speed = 6;
var isDead = false;
window.setup = function () {
    createCanvas(canvasWidth, canvasHeight);
    addLink(rows / 2, columns / 2);
    randomizeApple();
    isDead = false;
    document.getElementById('restartButton').style.display = "none";
    snakeLength = 2;
};
window.draw = function () {
    background(0);
    snake.forEach(function (cur) { return drawAtPoint(cur.x, cur.y); });
    // Move And Cut Snake
    if (frameCount % speed == 0 && !isDead) {
        moveSnake();
        snake.length = snakeLength;
    }
    drawAtPoint(applePos.x, applePos.y, color(255, 100, 100));
    if (isPosEqual(applePos, getSnakeHead())) {
        console.log('Apple');
        snakeLength++;
        randomizeApple();
    }
    // Draw grid lines
    strokeWeight(2);
    stroke(0);
    for (var i = 0; i < rows; i++) {
        line(0, i * gridSize, canvasWidth, i * gridSize);
    }
    for (var i = 0; i < columns; i++) {
        line(i * gridSize, 0, i * gridSize, canvasHeight);
    }
};
window.keyPressed = function () {
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
    }
};
function drawAtPoint(x, y, fillColor) {
    if (fillColor === void 0) { fillColor = color(50, 255, 50); }
    fill(fillColor);
    rect(gridSize * x, gridSize * y, gridSize, gridSize);
}
function addLink(x, y) {
    snake.unshift({
        x: ~~x,
        y: ~~y
    });
}
function moveSnake() {
    var newPos = JSON.parse(JSON.stringify(getSnakeHead()));
    switch (currentDir) {
        case DIRECTION.UP:
            // newPos.y = newPos.y == 0 ? columns-1 : newPos.y - 1;
            newPos.y--;
            break;
        case DIRECTION.DOWN:
            // newPos.y = ++newPos.y % columns;
            newPos.y++;
            break;
        case DIRECTION.LEFT:
            // newPos.x = newPos.x == 0 ? rows-1 : newPos.x - 1;
            newPos.x--;
            break;
        case DIRECTION.RIGHT:
            // newPos.x = ++newPos.x % rows;
            newPos.x++;
            break;
    }
    if (newPos.x < 0 || newPos.x > rows - 1 ||
        newPos.y < 0 || newPos.y > columns - 1) {
        die();
    }
    addLink(newPos.x, newPos.y);
    if (snake.filter(function (cur) { return isPosEqual(cur, newPos); }).length > 1)
        die();
}
function randomizeApple() {
    applePos = {
        x: ~~(Math.random() * rows),
        y: ~~(Math.random() * columns)
    };
}
function isPosEqual(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}
function die() {
    isDead = true;
    document.getElementById('restartButton').style.display = "block";
}
document.getElementById('restartButton').addEventListener('click', window.setup);


/***/ })
/******/ ]);