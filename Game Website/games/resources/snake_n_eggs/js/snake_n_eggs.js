class Html {
    constructor(width, height) {
        this.createGameArea(width, height);
        this.resources = [];
        this.createImage('./resources/logo.jpg', 'gameImageLogo');
        this.createImage('./resources/snake_n_eggs/images/grass2.jpg', 'gameImageGrass');
        this.createAudio('./resources/snake_n_eggs/sounds/crunch.6.ogg', 'gameSoundCrunch');
        this.loadResources(this.resources);
        this.createCanvas(width, height);
    }
    createGameArea(width, height) {
        const div = document.createElement('div');
        div.id = 'gameArea';
        div.style.position = 'relative';
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.fontFamily = 'Arial';
        const gameCode = document.getElementById('gameCode');
        document.body.insertBefore(div, gameCode);
        this.gameArea = document.getElementById('gameArea');
    }
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        this.gameArea.appendChild(canvas);
    }
    createText(id, posX, posY, textArray, fontSize, booleanCenterText, booleanTranslateY) {
        const div = document.createElement('div');
        div.id = id;
        div.style.fontSize = fontSize;
        div.style.position = 'relative';
        div.style.left = posX;
        div.style.top = posY;
        if (booleanTranslateY) {
            div.style.transform = 'translate(-50%, -50%)';
        } else {
            div.style.transform = 'translateX(-50%)';
        }
        if (booleanCenterText) {
            div.style.textAlign = 'center';
        }
        this.gameArea.appendChild(div);
        textArray.forEach(line => {
            const p = document.createElement('p');
            p.textContent = line;
            document.getElementById(id).appendChild(p);
        });
    }
    styleText(element) {
        const textShadowOffsetX = 2;
        const textShadowOffsetY = 2;
        element.style.textShadow =
        `-1px -1px black, -1px 1px black, 1px -1px black, 1px 1px black, ${textShadowOffsetX}px ${textShadowOffsetY}px black`;
        element.style.color = 'white';
    }
    createImage(src, id) {
        const img = document.createElement('img');
        img.id = id;
        img.style.display = 'none';
        img.style.position = 'absolute';
        this.gameArea.appendChild(img);
        this.resources.push({element: document.getElementById(id), src: src, event: 'load'});
    }
    createAudio(src, id) {
        const audio = document.createElement('audio');
        audio.id = id;
        audio.style.display = 'none';
        this.gameArea.appendChild(audio);
        this.resources.push({element: document.getElementById(id), src: src, event: 'canplaythrough'});
    }
    loadResources(resources) {
        let index = 0;
        this.createText('gameTextLoading', '50%', '50%', ['Loading', 'Resources'], '56px', true, true);
        function increaseIndex() {
            resources[index].element.removeEventListener(resources[index].event, increaseIndex);
            ++index;
            loadNextResource();
        }
        function continueGameCode() {
            resources[index].element.removeEventListener(resources[index].event, continueGameCode);
            document.getElementById('gameTextLoading').remove();
            game.lastTime = 0;
            game.animate(0);
            game.setState('Logo');
        }
        function loadNextResource() {
            if (index < resources.length - 1) {
                resources[index].element.addEventListener(resources[index].event, increaseIndex);
                resources[index].element.src = resources[index].src;
            } else {
                resources[index].element.addEventListener(resources[index].event, continueGameCode);
                resources[index].element.src = resources[index].src;
            }
        }
        loadNextResource();
    }
}

class Background {
    constructor(gameArea) {
        
    }
    setBackground(background) {
        gameArea.style.background = background;
    }
}

class Input {
    constructor() {
        this.timer = 0;
        this.timerInterval = 200;
        this.timerIsActive = false;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowLeft' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowDown' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
    update(deltaTime) {
        if (this.timerIsActive) {
            if (this.timer < this.timerInterval) {
                this.timer += deltaTime;
            } else {
                this.timerIsActive = false;
                this.timer = 0;
            }
        }
    }
    startTimer() {
        this.timerIsActive = true;
    }
}

class Logo {
    constructor() {
        this.fadeInterval = 2000;
        this.logoInterval = 1000;
        this.fadeInTimer = 0;
        this.logoTimer = 0;
        this.fadeOutTimer = 0;
        this.logo = document.getElementById('gameImageLogo');
        this.logo.style.display = 'block';
        this.setOpacity(0);
        this.setTransition();
    }
    setTransition() {
        this.logo.style.transition = `opacity ${this.fadeInterval}ms linear`;
    }
    setOpacity(opacity) {
        this.logo.style.opacity = opacity;
    }
    showLogo(deltaTime) {
        if (window.getComputedStyle(this.logo).opacity === '0') {
            this.logoIsReadyToShow = true;
        }
        if (this.logoIsReadyToShow) {
            if (this.fadeInTimer < this.fadeInterval) {
                this.setOpacity(1);
                this.fadeInTimer += deltaTime;
            } else if (this.logoTimer < this.logoInterval) {
                this.logoTimer += deltaTime;
            } else if (this.fadeOutTimer < this.fadeInterval) {
                this.setOpacity(0);
                this.fadeOutTimer += deltaTime;
            } else {
                this.logo.display = 'none';
                game.setState('Title Screen');
            }
        }
    }
}

class TitleScreen {
    constructor() {
        this.createTitle();
        this.createTitleScreenText();
    }
    update(input) {
        if (!game.input.timerIsActive) {
            if (input === 'Enter') {
                this.title.remove();
                document.getElementById('gameTextTitleScreen').remove();
                game.input.startTimer();
                game.setState('Snake Selection');
            }
        }
    }
    createTitle() {
        game.html.createText('gameTextTitle', '50%', '48px', ['Snake', `'N'`, 'Eggs'], '64px', true, false);
        this.title = document.getElementById('gameTextTitle');
        this.title.style.fontWeight = '700';
        game.html.styleText(this.title);
    }
    createTitleScreenText() {
        game.html.createText('gameTextTitleScreen', '50%', '110px', ['Press Enter', 'to Start'],
        '32px', true, false);
    }
}

class SnakeSelection {
    constructor() {
        this.createTitle();
        this.createOptions();
    }
    update(input) {
        if (!game.input.timerIsActive) {
            switch (input) {
                case 'ArrowUp':
                    if (this.index > 0) {
                        --this.index;
                    } else {
                        this.index = this.snakes.length - 1;
                    }
                    this.updateSelection();
                    break;
                case 'ArrowDown':
                    if (this.index < this.snakes.length - 1) {
                        ++this.index;
                    } else {
                        this.index = 0;
                    }
                    this.updateSelection();
                    break;
                case 'Enter':
                    this.setSnakeStyle();
                    document.getElementById('gameTextSnakeSelectionTitle').remove();
                    document.getElementById('gameTextSnakeSelection').remove();
                    game.input.startTimer();
                    game.setState('Game');
                    break;
            }
        }
    }
    updateSelection() {
        this.snakes.forEach(option => {
            option.style.color = 'gray';
        });
        this.snakes[this.index].style.color = 'black';
        game.input.startTimer();
    }
    setSnakeStyle() {
        switch (this.index) {
            case 0:
                this.style = 'Classic';
                break;
            case 1:
                this.style = 'King Snake';
                break;
            case 2:
                this.style = 'Coral Snake';
                break;
            case 3:
                this.style = 'Rock Star';
                break;
        }
    }
    createTitle() {
        game.html.createText('gameTextSnakeSelectionTitle', '50%', '40px', ['Choose Your Snake'], '56px', true, false);
        game.html.styleText(document.getElementById('gameTextSnakeSelectionTitle'));
    }
    createOptions() {
        game.html.createText('gameTextSnakeSelection', '50%', '102px', ['Classic', 'King Snake', 'Coral Snake', 'Rock Star'],
        '32px', true, false);
        this.snakes = document.querySelectorAll('#gameTextSnakeSelection p');
        this.index = 0;
        this.updateSelection();
    }
}

class Snake {
    constructor(snakeStyle, width, height) {
        this.style = snakeStyle;
        this.kingSnakeColors = ['red', 'black', 'yellow', 'black'];
        this.coralSnakeColors = ['yellow', 'black', 'yellow', 'red'];
        this.width = width;
        this.height = height;
        document.getElementById('gameImageGrass').style.display = 'block';
        this.blockSize = 20;
        this.createGrid();
        this.segments = [new Segment(240, 240)];
        this.timer = 0;
        this.timerInterval = 250;
        this.crunch = document.getElementById('gameSoundCrunch');
        this.createScoreArea();
    }
    update(deltaTime, input) {
        this.bufferInput(input);
        if (this.timer < this.timerInterval) {
            this.timer += deltaTime;
        } else {
            this.timer = 0;
            this.updateDirection()
            this.updateCoordinates();
            this.passDirectionToNextSegment();
            this.checkIfFoodIsEaten();
            this.checkForWallCollision();
            this.checkForSnakeCollision();
        }
    }
    draw(ctx) {
        this.drawSnake(ctx);
        if (this.style !== 'Classic') {
            this.drawSnakeOutline(ctx);
        }
    }
    createGrid() {
        this.grid = [];
        for (let c = 0; c < this.width / this.blockSize; ++c) {
            for (let r = 0; r < this.height / this.blockSize; ++r) {
                this.grid.push([c * this.blockSize, r * this.blockSize]);
            }
        }
    }
    createScoreArea() {
        this.score = 0;
        const div = document.createElement('div');
        div.id = 'gameScoreArea';
        div.style.position = 'absolute';
        div.style.top = '16px'
        div.style.right = '16px';
        game.html.gameArea.appendChild(div);
        this.scoreArea = document.getElementById('gameScoreArea');
        game.html.styleText(this.scoreArea);
        this.createScoreText('gameTextScore' ,'Score: ');
        this.createScoreText('gameTextScoreSpan' ,'0');
        this.scoreText = document.getElementById('gameTextScoreSpan');
    }
    createScoreText(id, textString) {
        const span = document.createElement('span');
        span.id = id;
        span.style.fontSize = '24px';
        span.textContent = textString;
        this.scoreArea.appendChild(span);
    }
    bufferInput(input) {
        if (input && input !== 'Enter') {
            this.bufferedInput = input;
        }
    }
    updateDirection() {
        if (this.bufferedInput === 'ArrowLeft' && this.segments[0].direction !== 'ArrowRight') {
            this.segments[0].direction = 'ArrowLeft';
        } else if (this.bufferedInput === 'ArrowUp' && this.segments[0].direction !== 'ArrowDown') {
            this.segments[0].direction = 'ArrowUp';
        } else if (this.bufferedInput === 'ArrowRight' && this.segments[0].direction !== 'ArrowLeft') {
            this.segments[0].direction = 'ArrowRight';
        } else if (this.bufferedInput === 'ArrowDown' && this.segments[0].direction !== 'ArrowUp') {
            this.segments[0].direction = 'ArrowDown';
        }
    }
    passDirectionToNextSegment() {
        for (let s = this.segments.length - 1; s > 0; --s) {
            this.segments[s].direction = this.segments[s - 1].direction;
        }
    }
    updateCoordinates() {
        this.segments.forEach(segment => {
            switch (segment.direction) {
                case 'ArrowLeft':
                    segment.coordinates[0] -= this.blockSize;
                    break;
                case 'ArrowUp':
                    segment.coordinates[1] -= this.blockSize;
                    break;
                case 'ArrowRight':
                    segment.coordinates[0] += this.blockSize;
                    break;
                case 'ArrowDown':
                    segment.coordinates[1] += this.blockSize;
                    break;
            }
        });
    }
    checkIfFoodIsEaten() {
        if (this.segments[0].coordinates[0] === game.food.x &&
            this.segments[0].coordinates[1] === game.food.y) {
            switch (this.segments[this.segments.length - 1].direction) {
                case 'ArrowLeft':
                    this.segments.push(new Segment(this.segments[this.segments.length - 1].coordinates[0] + this.blockSize,
                    this.segments[this.segments.length - 1].coordinates[1],
                    this.segments[this.segments.length - 1].direction));
                    break;
                case 'ArrowUp':
                    this.segments.push(new Segment(this.segments[this.segments.length - 1].coordinates[0],
                    this.segments[this.segments.length - 1].coordinates[1] + this.blockSize,
                    this.segments[this.segments.length - 1].direction));
                    break;
                case 'ArrowRight':
                    this.segments.push(new Segment(this.segments[this.segments.length - 1].coordinates[0] - this.blockSize,
                    this.segments[this.segments.length - 1].coordinates[1],
                    this.segments[this.segments.length - 1].direction));
                    break;
                case 'ArrowDown':
                    this.segments.push(new Segment(this.segments[this.segments.length - 1].coordinates[0],
                    this.segments[this.segments.length - 1].coordinates[1] - this.blockSize,
                    this.segments[this.segments.length - 1].direction));
                    break;
                }
            this.crunch.play();
            ++this.score;
            this.scoreText.textContent = this.score;
            game.food.foodIsEaten = true;
        }
    }
    checkForWallCollision() {
        if (this.segments[0].coordinates[0] < 0 ||
            this.segments[0].coordinates[0] > this.width - this.blockSize ||
            this.segments[0].coordinates[1] < 0 ||
            this.segments[0].coordinates[1] > this.height - this.blockSize) {
            this.endGame();
        }
    }
    checkForSnakeCollision() {
        for (let s = 1; s < this.segments.length - 1; ++s) {
            if (this.segments[s].coordinates[0] === this.segments[0].coordinates[0] &&
                this.segments[s].coordinates[1] === this.segments[0].coordinates[1]) {
                this.endGame();
            }
        }
    }
    drawSnake(ctx) {
        this.segments.forEach((segment, index) => {
            ctx.save();
            if (this.style === 'Classic') {
                ctx.fillStyle = 'black';
            } else if (this.style === 'King Snake') {
                switch (index % 4) {
                    case 3:
                        ctx.fillStyle = this.kingSnakeColors[3];
                        break;
                    case 2:
                        ctx.fillStyle = this.kingSnakeColors[2];
                        break;
                    case 1:
                        ctx.fillStyle = this.kingSnakeColors[1];
                        break;
                    case 0:
                        ctx.fillStyle = this.kingSnakeColors[0];
                        break;
                }
            } else if (this.style === 'Coral Snake') {
                switch (index % 4) {
                    case 3:
                        ctx.fillStyle = this.coralSnakeColors[2];
                        break;
                    case 2:
                        ctx.fillStyle = this.coralSnakeColors[1];
                        break;
                    case 1:
                        ctx.fillStyle = this.coralSnakeColors[0];
                        break;
                    case 0:
                        ctx.fillStyle = this.coralSnakeColors[3];
                        if (index === 0) {
                            ctx.fillStyle = 'black';
                        }
                        break;
                }
            } else if (this.style === 'Rock Star') {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(segment.coordinates[0], segment.coordinates[1], this.blockSize, this.blockSize);
            ctx.restore();
        });
    }
    drawSnakeOutline(ctx) {
        for (let s = 0; s < this.segments.length; ++s) {
            // Call Back Functions
            const drawLeftSide = () => {
                ctx.beginPath();
                ctx.moveTo(this.segments[s].coordinates[0], this.segments[s].coordinates[1] + this.blockSize);
                ctx.lineTo(this.segments[s].coordinates[0], this.segments[s].coordinates[1]);
                ctx.stroke();
            }
            const drawTopSide = () => {
                ctx.beginPath();
                ctx.moveTo(this.segments[s].coordinates[0], this.segments[s].coordinates[1]);
                ctx.lineTo(this.segments[s].coordinates[0] + this.blockSize, this.segments[s].coordinates[1]);
                ctx.stroke();
            }
            const drawRightSide = () => {
                ctx.beginPath();
                ctx.moveTo(this.segments[s].coordinates[0] + this.blockSize, this.segments[s].coordinates[1]);
                ctx.lineTo(this.segments[s].coordinates[0] + this.blockSize, this.segments[s].coordinates[1] + this.blockSize);
                ctx.stroke();
            }
            const drawBottomSide = () => {
                ctx.beginPath();
                ctx.moveTo(this.segments[s].coordinates[0] + this.blockSize, this.segments[s].coordinates[1] + this.blockSize);
                ctx.lineTo(this.segments[s].coordinates[0], this.segments[s].coordinates[1] + this.blockSize);
                ctx.stroke();
            }
            // Loop Logic
            if (this.segments.length === 1) {
                // Single Segment
                ctx.strokeRect(this.segments[0].coordinates[0], this.segments[0].coordinates[1], this.blockSize, this.blockSize);
            } else if (this.segments.length > 1) {
                // First Segment
                if (s === 0) {
                    switch (this.segments[s + 1].direction) {
                        case 'ArrowLeft':
                            drawLeftSide();
                            drawTopSide();
                            drawBottomSide();
                            break;
                        case 'ArrowUp':
                            drawLeftSide();
                            drawTopSide();
                            drawRightSide();
                            break;
                        case 'ArrowRight':
                            drawTopSide();
                            drawRightSide();
                            drawBottomSide();
                            break;
                        case 'ArrowDown':
                            drawLeftSide();
                            drawRightSide();
                            drawBottomSide();
                            break;
                    } 
                } else if (s < this.segments.length - 1) {
                    // Middle Segments
                    // Current Segment Direction, Then Next Segment Direction
                    switch (this.segments[s].direction) {
                        case 'ArrowLeft':
                            switch (this.segments[s + 1].direction) {
                                case 'ArrowLeft':
                                    drawTopSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowUp':
                                    drawTopSide();
                                    drawRightSide();
                                    break;
                                case 'ArrowRight':
                                    drawTopSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowDown':
                                    drawRightSide();
                                    drawBottomSide();
                                    break;
                            }
                            break;
                        case 'ArrowUp':
                            switch (this.segments[s + 1].direction) {
                                case 'ArrowLeft':
                                    drawLeftSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowUp':
                                    drawLeftSide();
                                    drawRightSide();
                                    break;
                                case 'ArrowRight':
                                    drawRightSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowDown':
                                    drawLeftSide();
                                    drawRightSide();
                                    break;
                            }
                            break;
                        case 'ArrowRight':
                            switch (this.segments[s + 1].direction) {
                                case 'ArrowLeft':
                                    drawTopSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowUp':
                                    drawLeftSide();
                                    drawTopSide();
                                    break;
                                case 'ArrowRight':
                                    drawTopSide();
                                    drawBottomSide();
                                    break;
                                case 'ArrowDown':
                                    drawLeftSide();
                                    drawBottomSide();
                                    break;
                            }
                            break;
                        case 'ArrowDown':
                            switch (this.segments[s + 1].direction) {
                                case 'ArrowLeft':
                                    drawLeftSide();
                                    drawTopSide();
                                    break;
                                case 'ArrowUp':
                                    drawLeftSide();
                                    drawRightSide();
                                    break;
                                case 'ArrowRight':
                                    drawTopSide();
                                    drawRightSide();
                                    break;
                                case 'ArrowDown':
                                    drawLeftSide();
                                    drawRightSide();
                                    break;
                            }
                            break;
                        }
                } else {
                    // Last Segment
                    switch (this.segments[s].direction) {
                        case 'ArrowLeft':
                            drawTopSide();
                            drawRightSide();
                            drawBottomSide();
                            break;
                        case 'ArrowUp':
                            drawLeftSide();
                            drawRightSide();
                            drawBottomSide();
                            break;
                        case 'ArrowRight':
                            drawLeftSide();
                            drawTopSide();
                            drawBottomSide();
                            break;
                        case 'ArrowDown':
                            drawLeftSide();
                            drawTopSide();
                            drawRightSide();
                            break;
                    }
                }
            }
        }
    }
    endGame() {
        document.getElementById('gameScoreArea').remove();
        document.getElementById('gameImageGrass').style.display = 'none';
        game.setState('Game Over');
    }
}

class Segment {
    constructor(x, y, direction) {
        this.coordinates = [x, y];
        this.direction = direction;
    }
}

class Food {
    constructor() {
        this.foodIsEaten = true;
    }
    update() {
        if (this.foodIsEaten) {
            this.foodIsEaten = false;
            this.createSpawnAreas();
            this.spawnFood();
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'hsl(200, 100%, 95%)';
        ctx.beginPath();
        ctx.arc(this.x + game.snake.blockSize / 2, this.y + game.snake.blockSize / 2, game.snake.blockSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        ctx.stroke();
    }
    createSpawnAreas() {
        this.spawnAreas = game.snake.grid;
        game.snake.segments.forEach(segment => {
            this.spawnAreas.splice(this.spawnAreas.indexOf([segment.coordinates[0], segment.coordinates[1], 1]));
        });
    }
    spawnFood() {
        this.spawnLocation = Math.floor(Math.random() * this.spawnAreas.length);
        this.x = this.spawnAreas[this.spawnLocation][0];
        this.y = this.spawnAreas[this.spawnLocation][1];
    }
}

class GameOver {
    constructor(score) {
        this.score = score;
        game.html.createText('gameTextGameOver', '50%', '96px', ['Game Over', `Final Score: ${this.score}`],
        '56px', true, false);
        game.html.styleText(document.getElementById('gameTextGameOver'));
        game.html.createText('gameTextTryAgain', '50%', '176px', ['Press Enter', 'to Play Again'], '32px',
        true, false);
    }
    update(input) {
        if (input === 'Enter') {
            game.input.startTimer();
            document.getElementById('gameTextGameOver').remove();
            document.getElementById('gameTextTryAgain').remove();
            game.setState('Title Screen');
        }
    }
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.html = new Html(width, height);
        this.background = new Background(this.html.gameArea);
        this.ctx = document.getElementById('gameCanvas').getContext('2d');
        this.input = new Input();
    }
    update(deltaTime) {
        this.input.update(deltaTime);
        switch (this.state) {
            case 'Logo':
                this.logo.showLogo(deltaTime);
                break;
            case 'Title Screen':
                this.titleScreen.update(this.input.keys[0]);
                break;
            case 'Snake Selection':
                this.snakeSelection.update(this.input.keys[0]);
                break;
            case 'Game':
                this.snake.update(deltaTime, this.input.keys[0]);
                if (this.food) {
                    this.food.update();
                }
                break;
            case 'Game Over':
                this.gameOver.update(this.input.keys[0]);
                break;
        }
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        switch (this.state) {
            case 'Game':
                this.snake.draw(ctx);
                this.food.draw(ctx);
                break;
        }
    }
    animate(timestamp) {
        const deltaTime = timestamp - game.lastTime;
        game.lastTime = timestamp;
        game.update(deltaTime);
        game.draw(game.ctx);
        requestAnimationFrame(game.animate); 
    }
    setState(state) {
        switch (state) {
            case 'Logo':
                this.background.setBackground('black');
                this.logo = new Logo();
                break;
            case 'Title Screen':
                delete this.logo;
                this.background.setBackground('hsl(200, 100%, 95%)');
                this.titleScreen = new TitleScreen();
                break;
            case 'Snake Selection':
                delete this.titleScreen;
                this.snakeSelection = new SnakeSelection();
                break;
            case 'Game':
                this.snake = new Snake(this.snakeSelection.style, this.width, this.height);
                delete this.snakeSelection;
                this.food = new Food();
                break;
            case 'Game Over':
                this.gameOver = new GameOver(this.snake.score);
                delete this.snake;
                delete this.food;
                break;
            }
            this.state = state;
    }
}
const game = new Game(480, 480);