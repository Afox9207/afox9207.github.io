export class Snake {
    constructor(game) {
        this.game = game;
        this.segments = [new Segment(640, 360, 'none')];
        this.movementInterval = 100;
        this.movementTimer = 0;
    }
    update(deltaTime, input) {
        if (this.game.gameHasStarted) {
            if (this.movementTimer > this.movementInterval) {
                this.movementTimer = 0;
                // pass last direction through segments
                for (let s = this.segments.length - 1; s > 0; --s) {
                    this.segments[s].direction = this.segments[s - 1].direction;
                }
                // send new input to 1st segment cant be inverse of current direction
                if (input.includes('ArrowLeft') && this.segments[0].direction.toString() !== 'ArrowRight') {
                    this.segments[0].direction = 'ArrowLeft';
                } else if (input.includes('ArrowUp') && this.segments[0].direction.toString() !== 'ArrowDown') {
                    this.segments[0].direction = 'ArrowUp';
                } else if (input.includes('ArrowRight') && this.segments[0].direction.toString() !== 'ArrowLeft') {
                    this.segments[0].direction = 'ArrowRight';
                } else if (input.includes('ArrowDown') && this.segments[0].direction.toString() !== 'ArrowUp') {
                    this.segments[0].direction = 'ArrowDown';
                }
                // move segments
                this.segments.forEach(segment => {
                    switch (segment.direction.toString()) {
                        case 'ArrowLeft':
                            segment.coordinates[0] -= this.game.blockSize;
                            break;
                        case 'ArrowUp':
                            segment.coordinates[1] -= this.game.blockSize;
                            break;
                        case 'ArrowRight':
                            segment.coordinates[0] += this.game.blockSize;
                            break;
                        case 'ArrowDown':
                            segment.coordinates[1] += this.game.blockSize;
                            break;
                    }
                });
                // check if food is Eaten
                if (    this.segments[0].coordinates[0] === this.game.food.spawnLocations[this.game.food.foodLocation][0] &&
                        this.segments[0].coordinates[1] === this.game.food.spawnLocations[this.game.food.foodLocation][1]) {
                    this.addNewSegment();
                    this.game.score++;
                    this.game.food.foodIsEaten = true;
                }
                // check for collision
                // walls
                if (    this.segments[0].coordinates[0] < 0 ||
                        this.segments[0].coordinates[0] > this.game.width ||
                        this.segments[0].coordinates[1] < 0 ||
                        this.segments[0].coordinates[1] > this.game.height) {
                    this.game.gameHasStarted = false;
                    this.game.gameIsOver = true;
                }
                // body
                for (let s = 1; s < this.segments.length; ++s) {
                    if (this.segments[s].coordinates[0] === this.segments[0].coordinates[0] &&
                        this.segments[s].coordinates[1] === this.segments[0].coordinates[1]) {
                        this.game.gameHasStarted = false;
                        this.game.gameIsOver = true;
                    }
                }
            } else this.movementTimer += deltaTime;
        }
    }
    draw(ctx) {
        if (this.game.gameHasStarted) {
            this.segments.forEach(segment => {
                ctx.fillRect(   segment.coordinates[0], segment.coordinates[1],
                                this.game.blockSize, this.game.blockSize);
            });
        }
    }
    addNewSegment() {
        // check direction of last segment and add new segment
        switch (this.segments[this.segments.length - 1].direction.toString()) {
            case 'ArrowLeft':
                this.segments.push(new Segment( this.segments[this.segments.length - 1].coordinates[0] + this.game.blockSize,
                                                this.segments[this.segments.length - 1].coordinates[1],
                                                'ArrowLeft'));
                break;
            case 'ArrowUp':
                this.segments.push(new Segment( this.segments[this.segments.length - 1].coordinates[0],
                                                this.segments[this.segments.length - 1].coordinates[1] + this.game.blockSize,
                                                'ArrowUp'));
                break;
            case 'ArrowRight':
                this.segments.push(new Segment( this.segments[this.segments.length - 1].coordinates[0] - this.game.blockSize,
                                                this.segments[this.segments.length - 1].coordinates[1],
                                                'ArrowRight'));
                break;
            case 'ArrowDown':
                this.segments.push(new Segment( this.segments[this.segments.length - 1].coordinates[0],
                                                this.segments[this.segments.length - 1].coordinates[1] - this.game.blockSize,
                                                'ArrowDown'));
                break;
        }
        console.log(this.segments);
    }
}

class Segment {
    constructor(x, y, direction) {
        this.coordinates = [x, y];
        this.direction = direction;
    }
}