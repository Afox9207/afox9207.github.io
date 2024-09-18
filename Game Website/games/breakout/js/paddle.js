export class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 250;
        this.height = 10;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - 50;
        this.speed = 0;
    }
    update(deltaTime, input) {
        // input
        if (input.includes('ArrowLeft')) {
            this.speed = -1;
        } else if (input.includes('ArrowRight')) {
            this.speed = 1;
        } else {
            this.speed = 0;
        }
        // movement
        this.x += this.speed * deltaTime;
        // boundaries
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    }
    draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}