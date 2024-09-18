import { InputHandler } from "./input.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { Levels } from "./levels.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.gameHasStarted = false;
        this.levelEditorIsOpened = false;
    }
    update(deltaTime) {
        // display start screen and wait for input
        if (!this.gameHasStarted && this.input.keys.includes('Enter')) {
            this.gameHasStarted = true;
            this.paddle = new Paddle(this);
            this.ball = new Ball(this);
            this.levels = new Levels(this);
        }  else if (this.gameHasStarted) {
            this.paddle.update(deltaTime, this.input.keys);
            this.ball.update(deltaTime, this.input.keys);
            this.levels.update();
        }
    }
    draw(ctx) {
        // draw start screen
        if (!this.gameHasStarted) {
            this.displayStartScreen(ctx);
        } else {
            this.paddle.draw(ctx);
            this.ball.draw(ctx);
            this.levels.draw(ctx);
        }
    }
    displayStartScreen(ctx) {
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Press Enter to Start', this.width * 0.5, this.height * 0.5);
    }
    detectCollision(ball, object) {
        if (    ball.x < object.x + object.width &&
                ball.x + ball.radius > object.x &&
                ball.y < object.y + object.height &&
                ball.y + ball.radius > object.y) {
            // check which side
            const sides = [
                Math.abs((ball.x - ball.radius) - (object.x)),
                Math.abs((ball.y - ball.radius) - (object.y)),
                Math.abs((ball.x + ball.radius) - (object.x + object.width)),
                Math.abs((ball.y + ball.radius) - (object.y + object.height))
            ]
            const sidesSorted = sides.toSorted((a, b) => {
                return a - b;
                
            });
            // compare to original array to get side
            return sides.indexOf(sidesSorted[0]);
        }    
    }
}
const game = new Game(canvas.width, canvas.height);

let lastTime = 0;
function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate(0);