export class Food {
    constructor(game) {
        this.game = game;
        this.spawnLocations = [];
        this.foodIsEaten = true;
    }
    update() {
        if (this.game.gameHasStarted) {
            if (this.foodIsEaten) {
                this.findSpawnLocations();
                this.addFood();
                this.foodIsEaten = false;
            }
        }
    }
    draw(ctx) {
        if (this.game.gameHasStarted) {
            ctx.save();
            ctx.fillStyle = 'red';
            ctx.fillRect(   this.spawnLocations[this.foodLocation][0],
                            this.spawnLocations[this.foodLocation][1],
                            this.game.blockSize, this.game.blockSize);
            ctx.restore();
        }
    }
    findSpawnLocations() {
        this.spawnLocations = [];
        for (let b = 0; b < this.game.grid.length; ++b) {
            for (let s = 0; s < this.game.snake.segments.length; ++s) {
                if (    this.game.grid[b][0] !== this.game.snake.segments[s].coordinates[0] &&
                        this.game.grid[b][1] !== this.game.snake.segments[s].coordinates[1]) {
                    this.spawnLocations.push([this.game.grid[b][0], this.game.grid[b][1]]);
                }
            }
        }
    }
    addFood() {
        this.foodLocation = Math.floor(Math.random() * this.spawnLocations.length);
    }
}