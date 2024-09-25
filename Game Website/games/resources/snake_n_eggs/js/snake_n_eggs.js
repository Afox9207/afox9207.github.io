const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 640;

// || Input

class Input {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter' ||
                    e.key === 's' ||
                    e.key === 'c') && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter' ||
                    e.key === 's' ||
                    e.key === 'c') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}

// || UI

class UI {
    constructor(game) {
        this.game = game;
        this.font = 'Arial';
        this.fontSize = 32;
        this.color = 'hsl(200, 100%, 95%)';
        this.score = 0;
        this.scorePosX = this.game.width - 144;
        this.scorePosY = 40;
        this.dropShadowOffsetX = -2;
        this.dropShadowOffsetY = -2;
    }
    draw() {
        ctx.save();
        ctx.font = this.fontSize + 'px ' + this.font;
        ctx.fillText('Score: ' + this.score, this.scorePosX + this.dropShadowOffsetX, this.scorePosY + this.dropShadowOffsetY);
        ctx.fillStyle = this.color;
        ctx.fillText('Score: ' + this.score, this.scorePosX, this.scorePosY);
        ctx.restore();
    }
}

// || Logo

class Logo {
    constructor(game) {
        this.game = game;
        this.fadeInTimer = 0;
        this.logoTimer = 0;
        this.fadeOutTimer = 0;
        this.fadeInInterval = 2000;
        this.LogoInterval = 1000;
        this.fadeOutInterval = 2000;
    }
    update(deltaTime) {
        if (this.fadeInTimer < this.fadeInInterval) {
            this.fadeInTimer += deltaTime;
        } else if (this.logoTimer < this.LogoInterval) {
            this.logoTimer += deltaTime;
        } else if (this.fadeOutTimer < this.fadeOutInterval) {
            this.fadeOutTimer += deltaTime;
        } else {
            this.game.setState('Start Screen');
        }
    }
    draw(ctx) {
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        if (this.fadeInTimer < this.fadeInInterval) {
            ctx.save();
            ctx.globalAlpha = 0 + this.fadeInTimer / this.fadeInInterval;
            this.drawLogo(ctx);
            ctx.restore();
        } else if (this.logoTimer < this.LogoInterval) {
            this.drawLogo(ctx);
        } else if (this.fadeOutTimer < this.fadeOutInterval) {
            ctx.save();
            ctx.globalAlpha = 1 - this.fadeOutTimer / this.fadeOutInterval;
            this.drawLogo(ctx);
            ctx.restore();
        }
    }
    drawLogo(ctx) {
        ctx.drawImage(logo, this.game.width / 2 - logo.width / 2,
        this.game.height / 2 - logo.height / 2);
    }
}

// || Start Screen

class StartScreen {
    constructor(game, ctx) {
        this.game = game;
        this.backGroundColor = 'hsl(200, 100%, 95%)';
        this.titleFont = 'Arial';
        this.titleSize = 96;
        this.titleFillStyle = ctx.createPattern(grass, 'no-repeat');
        this.textFont = 'Arial';
        this.textSize = 64;
        this.textFillStyle = 'White';
    }
    update(input) {
        if (input.includes('Enter')) {
            this.game.setState('Snake Selection');
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.backGroundColor;
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        ctx.restore();
        ctx.save();
        ctx.font = this.titleSize + 'px ' + this.titleFont;
        ctx.textAlign = 'center';
        ctx.baseLine = 'middle';
        ctx.fillStyle = this.titleFillStyle;
        ctx.fillText('Snake', this.game.width / 2, this.titleSize);
        ctx.fillText(`'N'`, this.game.width / 2, this.titleSize * 2);
        ctx.fillText('Eggs', this.game.width / 2, this.titleSize * 3);
        ctx.strokeText('Snake', this.game.width / 2, this.titleSize);
        ctx.strokeText(`'N'`, this.game.width / 2, this.titleSize * 2);
        ctx.strokeText('Eggs', this.game.width / 2, this.titleSize * 3);
        ctx.restore();
        ctx.save();
        ctx.font = this.textSize + 'px ' + this.textFont;
        ctx.textAlign = 'center';
        ctx.baseLine = 'middle';
        ctx.fillStyle = this.textFillStyle;
        ctx.fillText('Press Enter', this.game.width / 2, (this.game.height + this.titleSize * 3) / 2);
        ctx.fillText('to Start', this.game.width / 2, (this.game.height + this.titleSize * 3) / 2 + this.textSize);
        ctx.strokeText('Press Enter', this.game.width / 2, (this.game.height + this.titleSize * 3) / 2);
        ctx.strokeText('to Start', this.game.width / 2, (this.game.height + this.titleSize * 3) / 2 + this.textSize);
        ctx.restore();
    }
}

// || Snake Selection

class SnakeSelection {
    constructor(game) {
        this.game = game;
        this.textSize = 40;
        this.textFont = 'Arial';
        this.color = 'hsl(200, 100%, 95%)';
        this.dropShadowOffsetX = -2;
        this.dropShadowOffsetY = -2;
    }
    update(input) {
        if (input.includes('s')) {
            this.game.snake.snakeType = this.game.snake.snakeTypes[0];
            this.game.setState('Game');
        } else if (input.includes('c')) {
            this.game.snake.snakeType = this.game.snake.snakeTypes[1];
            this.game.setState('Game');
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.font = this.textSize + 'px ' + this.textFont;
        ctx.textAlign = 'center'
        ctx.fillText('Press S for Scarlet Kingsnake', this.game.width / 2 + this.dropShadowOffsetX, this.game.height / 2 + this.dropShadowOffsetY);
        ctx.fillText('Press C for Coral Snake', this.game.width / 2 + this.dropShadowOffsetX, this.game.height / 2 + this.textSize * 1.5 + this.dropShadowOffsetY);
        ctx.fillStyle = this.color;
        ctx.fillText('Press S for Scarlet Kingsnake', this.game.width / 2, this.game.height / 2);
        ctx.fillText('Press C for Coral Snake', this.game.width / 2, this.game.height / 2 + this.textSize * 1.5);
        ctx.restore();
    }
}

// || Background

class Background {
    constructor() {

    }
    draw(ctx) {
        ctx.drawImage(grass, 0, 0);
    }
}

// || Snake

class Snake {
    constructor(game) {
        this.game = game;
        this.segments = [new Segment(320, 320)];
        this.lastSegment = this.segments[0];
        this.snakeTypes = ['Scarlet Kingsnake', 'Coral Snake'];
        this.scarletKingsnakeColors = ['red', 'black', 'yellow', 'black'];
        this.coralSnakeColors = ['yellow', 'black', 'yellow', 'red'];
        this.moveTimer = 0;
        this.moveInterval = 250;
        this.EatingSound = snakeEatingSound;
    }
    update(input, deltaTime) {
        // set direction
        if (input.includes('ArrowLeft') && this.segments[0].direction !== 'right') {
            this.segments[0].direction = 'left';
        } else if (input.includes('ArrowUp') && this.segments[0].direction !== 'down') {
            this.segments[0].direction = 'up';
        } else if (input.includes('ArrowRight') && this.segments[0].direction !== 'left') {
            this.segments[0].direction = 'right';
        } else if (input.includes('ArrowDown') && this.segments[0].direction !== 'up') {
            this.segments[0].direction = 'down';
        }
        // start timer
        if (this.moveTimer > this.moveInterval) {
            this.moveTimer = 0;
            this.moveSegments();
            this.updateDirections();
            this.checkForCollisions();
        } else {
            this.moveTimer += deltaTime;
        }
    }
    draw(ctx) {
        this.segments.forEach((segment, index) => {
            ctx.save();
            if (this.snakeType === 'Scarlet Kingsnake') {
                switch (index % 4) {
                    case 0:
                        ctx.fillStyle = this.scarletKingsnakeColors[0];
                        break;
                    case 1:
                        ctx.fillStyle = this.scarletKingsnakeColors[1];
                        break;
                    case 2:
                        ctx.fillStyle = this.scarletKingsnakeColors[2];
                        break;
                    case 3:
                        ctx.fillStyle = this.scarletKingsnakeColors[3];
                        break;
                }
            } else if (this.snakeType === 'Coral Snake') {
                if (index === 0) {
                    ctx.fillStyle === 'black';
                } else {
                    switch ((index + 3) % 4) {
                        case 0:
                        ctx.fillStyle = this.coralSnakeColors[0];
                        break;
                    case 1:
                        ctx.fillStyle = this.coralSnakeColors[1];
                        break;
                    case 2:
                        ctx.fillStyle = this.coralSnakeColors[2];
                        break;
                    case 3:
                        ctx.fillStyle = this.coralSnakeColors[3];
                        break;
                    }
                }
            }
            ctx.fillRect(segment.coordinates[0], segment.coordinates[1], this.game.blockSize, this.game.blockSize);
            ctx.restore();
        });
    }
    updateDirections() {
        for (let s = this.segments.length - 1; s > 0; --s) {
            this.segments[s].direction = this.segments[s - 1].direction;
        }
    }
    moveSegments() {
        this.segments.forEach(segment => {
            switch (segment.direction) {
                case 'left':
                    segment.coordinates[0] -= this.game.blockSize;
                    break;
                case 'up':
                    segment.coordinates[1] -= this.game.blockSize;
                    break;
                case 'right':
                    segment.coordinates[0] += this.game.blockSize;
                    break;
                case 'down':
                    segment.coordinates[1] += this.game.blockSize;
                    break;
            }
        });
    }
    checkForCollisions() {
        // food is eaten
        if (this.segments[0].coordinates[0] === this.game.food.x &&
            this.segments[0].coordinates[1] === this.game.food.y) {
            this.EatingSound.play();
            this.game.food.foodIsEaten = true;
            this.game.ui.score++;
            // check last segment direction and position and add new segment
            switch (this.lastSegment.direction) {
                case 'left':
                    this.segments.push(new Segment(this.lastSegment.coordinates[0] + this.game.blockSize,
                    this.lastSegment.coordinates[1], 'left'));
                    break;
                case 'up':
                    this.segments.push(new Segment(this.lastSegment.coordinates[0],
                    this.lastSegment.coordinates[1] + this.game.blockSize, 'up'));
                    break;
                case 'right':
                    this.segments.push(new Segment(this.lastSegment.coordinates[0] - this.game.blockSize,
                    this.lastSegment.coordinates[1], 'right'));
                    break;
                case 'down':
                    this.segments.push(new Segment(this.lastSegment.coordinates[0],
                    this.lastSegment.coordinates[1] - this.game.blockSize, 'down'));
                    break;
            }
            this.lastSegment = this.segments[this.segments.length - 1];
        }
        // wall is hit
        if (this.segments[0].coordinates[0] < 0 ||
            this.segments[0].coordinates[0] + this.game.blockSize > this.game.width ||
            this.segments[0].coordinates[1] < 0 ||
            this.segments[0].coordinates[1] + this.game.blockSize > this.game.height) {
            this.game.setState('Game Over');
        }
        // snake hits itself
        for (let s = 1; s < this.segments.length; ++s) {
            if (this.segments[0].coordinates[0] === this.segments[s].coordinates[0] &&
                this.segments[0].coordinates[1] === this.segments[s].coordinates[1]) {
                this.game.setState('Game Over');
                break;
            }
        }
    }
}

class Segment {
    constructor(x, y, direction) {
        this.coordinates = [x, y];
        this.direction = direction;
    }
}

// || Food

class Food {
    constructor(game) {
        this.game = game;
        this.foodIsEaten = true;
    }
    update() {
        if (this.foodIsEaten) {
            this.spawnFood();
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'hsl(200, 100%, 95%)';
        ctx.fillRect(this.x, this.y, this.game.blockSize, this.game.blockSize);
        ctx.restore();
    }
    spawnFood() {
        this.foodIsEaten = false;
        // find out possible spawn locations
        this.spawnLocations = this.game.grid;
        for (let b = 0; b < this.game.grid.length; ++b) {
            for (let s = 0; s < this.game.snake.segments.length; ++s) {
                if (this.spawnLocations[b][0] === this.game.snake.segments[s].coordinates[0] &&
                    this.spawnLocations[b][1] === this.game.snake.segments[s].coordinates[1]) {
                    this.spawnLocations.splice(this.spawnLocations[b], 1);
                }
            }
        }
        // find random spawn
        this.foodLocation = Math.floor(Math.random() * this.spawnLocations.length);
        this.x = this.spawnLocations[this.foodLocation][0];
        this.y = this.spawnLocations[this.foodLocation][1];
    }
}

// || Game Over

class GameOver {
    constructor(game) {
        this.game = game;
        this.font = 'Arial';
        this.fontSize = 48;
        this.color = 'hsl(200, 100%, 95%)';
        this.dropShadowOffsetX = -2;
        this.dropShadowOffsetY = -2;
    }
    update(input) {
        if (input.includes('Enter')) {
            this.game.snake.segments = [new Segment(320, 320)];
            this.game.snake.lastSegment = this.game.snake.segments[0];
            this.game.ui.score = 0;
            this.game.setState('Snake Selection');
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.font = this.fontSize + 'px ' + this.font;
        ctx.textAlign = 'center';
        ctx.baseLine = 'middle';
        ctx.fillText('Game Over', this.game.width / 2 + this.dropShadowOffsetX, this.game.height / 2 - this.fontSize * 1.5 + this.dropShadowOffsetY);
        ctx.fillText('Your Final Score is ' + this.game.ui.score, this.game.width / 2 + this.dropShadowOffsetX, this.game.height / 2 + this.dropShadowOffsetY);
        ctx.fillText('Press Enter to Try Again', this.game.width / 2 + this.dropShadowOffsetX, this.game.height / 2 + this.fontSize * 1.5 + this.dropShadowOffsetY);
        ctx.fillStyle = this.color;
        ctx.fillText('Game Over', this.game.width / 2, this.game.height / 2 - this.fontSize * 1.5);
        ctx.fillText('Your Final Score is ' + this.game.ui.score, this.game.width / 2, this.game.height / 2);
        ctx.fillText('Press Enter to Try Again', this.game.width / 2, this.game.height / 2 + this.fontSize * 1.5);
        ctx.restore();
    }
}

// || Game Object

class Game {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.blockSize = 20;
        this.states = ['Logo', 'Start Screen', 'Snake Selection', 'Game', 'Game Over'];
        this.currentState = this.states[0];
        this.input = new Input();
        this.ui = new UI(this);
        this.logo = new Logo(this);
        this.startScreen = new StartScreen(this, ctx);
        this.snakeSelection = new SnakeSelection(this);
        this.background = new Background();
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.gameOver = new GameOver(this);
    }
    update(deltaTime) {
        switch (this.currentState) {
            case 'Logo':
                this.logo.update(deltaTime);
                break;
            case 'Start Screen':
                this.startScreen.update(this.input.keys);
                break;
            case 'Snake Selection':
                this.snakeSelection.update(this.input.keys);
                break;
            case 'Game':
                if (this.grid.length === 0) {
                    this.fillGrid();
                }
                this.snake.update(this.input.keys, deltaTime);
                this.food.update();
                break;
            case 'Game Over':
                this.gameOver.update(this.input.keys);
        }
    }
    draw(ctx, deltaTime) {
        switch (this.currentState) {
            case 'Logo':
                this.logo.draw(ctx, deltaTime);
                break;
            case 'Start Screen':
                this.startScreen.draw(ctx);
                break;
            case 'Snake Selection':
                this.background.draw(ctx);
                this.snakeSelection.draw(ctx);
                break;
            case 'Game':
                this.background.draw(ctx);
                this.snake.draw(ctx);
                this.food.draw(ctx);
                this.ui.draw();
                break;
            case 'Game Over':
                this.background.draw(ctx);
                this.gameOver.draw(ctx);
        }
    }
    fillGrid() {
        for (let r = 0; r < this.height / this.blockSize; ++r) {
            for (let c = 0; c < this.width / this.blockSize; ++c) {
                this.grid.push([c * this.blockSize, r * this.blockSize]);
            }
        }
    }
    setState(state) {
        this.currentState = this.states[this.states.indexOf(state)];
    }
}
const game = new Game(canvas.width, canvas.height, ctx);

// || Animation Loop

let lastTime = 0;
function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx, deltaTime);
    requestAnimationFrame(animate);
}
animate(0);