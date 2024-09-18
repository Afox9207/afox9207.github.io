export class Ball {
    constructor(game) {
        this.game = game;
        this.radius = 10;
        this.x = this.game.paddle.x + this.game.paddle.width * 0.5;
        this.y = this.game.paddle.y - this.radius;
        this.ballIsInPlay = false;
        this.ballIsInPlayTimer = 0;
        this.ballIsInPlayInterval = 250;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.angleModifier = 2;
    }
    update(deltaTime, input) {
        if (!this.ballIsInPlay) {
            this.ballIsInPlayTimer += deltaTime;
            this.x = this.game.paddle.x + this.game.paddle.width * 0.5;
            this.y = this.game.paddle.y - this.radius;
            if (input.includes('Enter') && this.ballIsInPlayTimer> this.ballIsInPlayInterval) {
                this.playBall();
            }
        }
        this.x += this.xSpeed * deltaTime;
        this.y += this.ySpeed * deltaTime;
        // wall collision
        if (this.x < 0 + this.radius || this.x > this.game.width - this.radius) {
            this.xSpeed *= -1;
        } else if (this.y < 0 + this.radius) {
            this.ySpeed *= -1;
        } else if (this.y > this.game.height + this.radius) {
            this.ballIsInPlay = false;
        }
        // paddle collision
        switch (this.detectCollision(this, this.game.paddle)) {
            case 1:
                if (this.x < this.game.paddle.x + this.game.paddle.width * 0.5) {
                    this.xSpeed = (this.game.paddle.x + this.game.paddle.width * 0.5 - this.x) / this.game.paddle.width * 0.5 * -this.angleModifier;
                    this.ySpeed *= -1;
                } else {
                    this.xSpeed = (this.game.paddle.x + this.game.paddle.width - this.x) / this.game.paddle.width * 0.5 * this.angleModifier;
                    this.ySpeed *= -1;
                }
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    playBall() {
        this.ballIsInPlay = true;
        this.ballIsInPlayTimer = 0;
        this.xSpeed = 0.25;
        this.ySpeed = -0.25;
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