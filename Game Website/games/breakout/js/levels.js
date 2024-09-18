export class Levels {
    constructor(game) {
        this.game = game;
        this.currentLevel = [];
        this.columns = 10;
        this.rows = 3;
        this.brickHeight = this.game.height / 3 / this.rows;
        this.brickWidth = this.game.width / this.columns;
        this.levelInitialized = false;
    }
    update() {
        // initialize level
        if (!this.levelInitialized) {
            this.initializeLevel(this.brickWidth, this.brickHeight);
        } else {
            // check collision
            this.currentLevel.forEach((brick, index) => {
                switch (this.game.ball.detectCollision(this.game.ball, brick)) {
                    case 0:
                        this.game.ball.xSpeed *= -1;
                        this.currentLevel.splice(index, 1);
                        break;
                    case 1:
                        this.game.ball.ySpeed *= -1;
                        this.currentLevel.splice(index, 1);
                        break;
                    case 2:
                        this.game.ball.xSpeed *= -1;
                        this.currentLevel.splice(index, 1);
                        break;
                    case 3:
                        this.game.ball.ySpeed *= -1;
                        this.currentLevel.splice(index, 1);
                        break;
                }
            });
        }
    }
    draw(ctx) {
        if (this.levelInitialized) {
            this.currentLevel.forEach(brick => {
                ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            });
        }
    }
    initializeLevel(brickWidth, brickHeight) {
        class Brick {
            constructor(x, y) {
                this.x = x * brickWidth;
                this.y = y * brickHeight;
                this.width = brickWidth;
                this.height = brickHeight;
            }
        }

        for (let r = 0; r < this.rows; ++r) {
            for (let c = 0; c < this.columns; ++c) {
                this.currentLevel.push(new Brick(c, r));
            }
        }
        this.levelInitialized = true;
    }     
}