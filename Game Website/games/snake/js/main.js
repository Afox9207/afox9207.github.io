import { InputHandler } from "./input.js";
import { UI } from "./ui.js";
import { Snake } from "./snake.js";
import { Food } from "./food.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gameHasStarted = false;
        this.gameIsOver = false;
        this.gridArrayIsFilled = false;
        this.grid = [];
        this.blockSize = 20;
        this.rows = this.height / this.blockSize;
        this.columns = this.width / this.blockSize;
        this.score = 0;
        this.input = new InputHandler();
        this.ui = new UI(this);
        this.snake = new Snake(this);
        this.food = new Food(this);
    }
    update(deltaTime) {
        // fill grid array
        if (!this.gridArrayIsFilled) {
            this.fillGridArray();
        }
        if (this.gameIsOver){
            this.snake = new Snake(this);
            this.food = new Food(this);
        }
        this.ui.update(this.input.key);
        this.snake.update(deltaTime, this.input.key);
        this.food.update();
    }
    draw(ctx) {
        this.snake.draw(ctx);
        this.food.draw(ctx);
        this.ui.draw(ctx);
    }
    fillGridArray() {
        for (let r = 0; r < this.rows; ++r) {
            for (let c = 0; c < this.columns; ++c) {
                this.grid.push([c * this.blockSize, r * this.blockSize]);
            }
        }
        this.gridArrayIsFilled = true;
    }
}
const game = new Game(canvas.width, canvas.height);

let lastTime = 0;
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate(0);