/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let FRAME_RATE = 100 / 6;
let X_RESOLUTION = 720;
let UNITS;

const colorOfStarsRadioArray = document.getElementsByClassName('colorOfStarsRadio');

const DEFAULT_STAR_CYCLE = 30;
const DEFAULT_NUM_OF_STARS = 10;
const DEFAULT_COLOR_OF_STARS_OPTION = 1;
const DEFAULT_COLOR_OF_STARS = colorOfStarsRadioArray[DEFAULT_COLOR_OF_STARS_OPTION].value;
const DEFAULT_NUM_OF_ROCKET_PARTICLES = 5;
const DEFAULT_ASTEROID_CYCLE = 10;
const DEFAULT_NUM_OF_ASTEROIDS = 1;
const DEFAULT_CHANCE_OF_ASTEROID = 1;
let STAR_CYCLE = DEFAULT_STAR_CYCLE;
let NUM_OF_STARS = DEFAULT_NUM_OF_STARS;
let COLOR_OF_STARS = DEFAULT_COLOR_OF_STARS;
let NUM_OF_ROCKET_PARTICLES = DEFAULT_NUM_OF_ROCKET_PARTICLES;
let ASTEROID_CYCLE = DEFAULT_ASTEROID_CYCLE;
let NUM_OF_ASTEROIDS = DEFAULT_NUM_OF_ASTEROIDS;
let CHANCE_OF_ASTEROID = DEFAULT_CHANCE_OF_ASTEROID;

let LAST_TIME = 0;
let TIME_TO_NEXT_STAR = 0;
let STAR_INTERVAL = FRAME_RATE * STAR_CYCLE;
let TIME_TO_NEXT_ROCKET_PARTICLE = 0;
let ROCKET_PARTICLE_INTERVAL = FRAME_RATE;
let TIME_TO_NEXT_ASTEROIDS = 0;
let ASTEROID_INTERVAL = FRAME_RATE * ASTEROID_CYCLE;

let ROCKET;
let PLAYER_X;
let PLAYER_WIDTH;
let PLAYER_HEIGHT;
let CONTROL_HEIGHT = 64;
let GAME_OVER = true;
let IS_LEFT_BUTTON_PRESSED = false;
let IS_RIGHT_BUTTON_PRESSED = false;


let stars = [];
let rocketParticles = [];
let asteroids = [];

function setGameArea() {
    if(window.innerWidth >= (9 * window.innerHeight / 16)) {
        CANVAS_WIDTH = (9 * window.innerHeight) / 16;
        CANVAS_HEIGHT = window.innerHeight;
    } else {
        CANVAS_WIDTH = window.innerWidth;
        CANVAS_HEIGHT = (16 * window.innerWidth) / 9;
    }
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    UNITS = CANVAS_WIDTH / X_RESOLUTION;
}
setGameArea();
window.addEventListener('resize', setGameArea);

// Menu
const gameMenu = document.getElementById('gameMenu');
const menuItemStart = document.getElementById('menuItemStart');
const menuItemOptions = document.getElementById('menuItemOptions');

const optionsMenu = document.getElementById('optionsMenu');
const menuItemDefault = document.getElementById('menuItemDefault');
const menuItemDone = document.getElementById('menuItemDone');

const starCycleSlider = document.getElementById('starCycleSlider');
const starCycleValue = document.getElementById('starCycleValue');
const numOfStarsSlider = document.getElementById('numOfStarsSlider');
const numOfStarsValue = document.getElementById('numOfStarsValue');

const numOfRocketParticlesSlider = document.getElementById('numOfRocketParticlesSlider');
const numOfRocketParticlesValue = document.getElementById('numOfRocketParticlesValue');
starCycleValue.innerText = starCycleSlider.value;
numOfStarsValue.innerText = numOfStarsSlider.value;
numOfRocketParticlesValue.innerText = numOfRocketParticlesSlider.value;

const asteroidCycleSlider = document.getElementById('asteroidCycleSlider');
const asteroidCycleValue = document.getElementById('asteroidCycleValue');
const numOfAsteroidsSlider = document.getElementById('numOfAsteroidsSlider');
const numOfAsteroidsValue = document.getElementById('numOfAsteroidsValue');
const chanceOfAsteroidSlider = document.getElementById('chanceOfAsteroidSlider');
const chanceOfAsteroidValue = document.getElementById('chanceOfAsteroidValue');

const controls = document.getElementById('controls');
const controlButtonLeft = document.getElementById('controlButtonLeft');
const controlButtonRight = document.getElementById('controlButtonRight');

menuItemStart.addEventListener('click', startGame);
menuItemOptions.addEventListener('click', openOptionsMenu);

starCycleSlider.addEventListener('input', updateStarCycle);
numOfStarsSlider.addEventListener('input', updateNumOfStars);
numOfRocketParticlesSlider.addEventListener('input', updateNumOfRocketParticles);
for (let i = 0; i < colorOfStarsRadioArray.length; i++) {
    colorOfStarsRadioArray[i].addEventListener('input', updateColorOfStars);
}
asteroidCycleSlider.addEventListener('input', updateAsteroidCycle);
numOfAsteroidsSlider.addEventListener('input', updateNumOfAsteroids);
chanceOfAsteroidSlider.addEventListener('input', updateChanceOfAsteroid);

menuItemDefault.addEventListener('click', resetOptions);
menuItemDone.addEventListener('click', closeOptionsMenu);

function openOptionsMenu() {
    gameMenu.style.display = 'none';
    optionsMenu.style.display = 'grid';
}
function closeOptionsMenu() {
    optionsMenu.style.display = 'none';
    gameMenu.style.display = 'flex';
}
function updateStarCycle() {
    starCycleValue.innerText = STAR_CYCLE = starCycleSlider.value;
    STAR_INTERVAL = FRAME_RATE * STAR_CYCLE;
}
function updateNumOfStars() {
    numOfStarsValue.innerText = NUM_OF_STARS = numOfStarsSlider.value;
}
function updateColorOfStars() {
    for (let i = 0; i < colorOfStarsRadioArray.length; ++i) {
        if (this.checked) {
            COLOR_OF_STARS = this.value;
            break;
        }
    }
}
function updateNumOfRocketParticles() {
    numOfRocketParticlesValue.innerText = NUM_OF_ROCKET_PARTICLES = numOfRocketParticlesSlider.value;
}
function updateAsteroidCycle() {
    asteroidCycleValue.innerText = ASTEROID_CYCLE = asteroidCycleSlider.value;
    ASTEROID_INTERVAL = FRAME_RATE * ASTEROID_CYCLE;
}
function updateNumOfAsteroids() {
    numOfAsteroidsValue.innerText = NUM_OF_ASTEROIDS = numOfAsteroidsSlider.value;
}
function updateChanceOfAsteroid() {
    chanceOfAsteroidValue.innerText = CHANCE_OF_ASTEROID = chanceOfAsteroidSlider.value;
}
function resetOptions() {
    starCycleSlider.value = starCycleValue.innerText = STAR_CYCLE = DEFAULT_STAR_CYCLE;
    numOfStarsSlider.value = numOfStarsValue.innerText = NUM_OF_STARS = DEFAULT_NUM_OF_STARS;
    colorOfStarsRadioArray[DEFAULT_COLOR_OF_STARS_OPTION].checked = true;
    COLOR_OF_STARS = DEFAULT_COLOR_OF_STARS;
    numOfRocketParticlesSlider.value = numOfRocketParticlesValue.innerText = NUM_OF_ROCKET_PARTICLES = DEFAULT_NUM_OF_ROCKET_PARTICLES;
    asteroidCycleSlider.value = asteroidCycleValue.innerText = ASTEROID_CYCLE = DEFAULT_ASTEROID_CYCLE;
    numOfAsteroidsSlider.value = numOfAsteroidsValue.innerText = NUM_OF_ASTEROIDS = DEFAULT_NUM_OF_ASTEROIDS;
    chanceOfAsteroidValue.innerText = chanceOfAsteroidSlider.value = CHANCE_OF_ASTEROID = DEFAULT_CHANCE_OF_ASTEROID;
}
function startGame() {
    gameMenu.style.display = 'none';
    controls.style.display = 'flex';
    ROCKET = new Rocket();
    GAME_OVER = false;
    controlButtonLeft.addEventListener('mousedown', function() {
        IS_LEFT_BUTTON_PRESSED = true;
    });
    controlButtonLeft.addEventListener('mouseup', function() {
        IS_LEFT_BUTTON_PRESSED = false;
    });
    controlButtonRight.addEventListener('mousedown', function() {
        IS_RIGHT_BUTTON_PRESSED = true;
    });
    controlButtonRight.addEventListener('mouseup', function() {
        IS_RIGHT_BUTTON_PRESSED = false;
    });
}

// objects
class Rocket {
    constructor() {
        this.image = new Image();
        this.image.src = './resources/images/rocket.png';
        this.spriteWidth = 109;
        this.spriteHeight = 150;
        this.width = PLAYER_WIDTH = this.spriteWidth * UNITS;
        this.height = PLAYER_HEIGHT = this.spriteHeight * UNITS;
        this.x = (CANVAS_WIDTH - this.width) * 0.5;
        this.y = CANVAS_HEIGHT - CONTROL_HEIGHT - PLAYER_HEIGHT;
    }
    update() {
        if (IS_LEFT_BUTTON_PRESSED && this.x > 0) this.x -= UNITS;
        if (IS_RIGHT_BUTTON_PRESSED && this.x < CANVAS_WIDTH - this.width) this.x += UNITS;
        PLAYER_X = this.x;
    }
    draw() {
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight,
        this.x, this.y, this.width, this.height);
    }
}
class RocketParticle {
    constructor() {
        this.x = PLAYER_X + (PLAYER_WIDTH * 0.5) + (Math.random() * (50 * UNITS) - (25 * UNITS));
        this.y = CANVAS_HEIGHT - CONTROL_HEIGHT;
        this.angle = Math.random() * UNITS - (0.5 * UNITS);
        this.radius = Math.random() * (1.5 * UNITS) + (UNITS);
        this.markedForDeletion = false;
        this.hue = 0;
        this.color = 'hsl(' + this.hue + ' 100 50)';
        this.staggerFrame = 0;
    }
    update() {
        this.x -= this.angle;
        this.y += (2 * UNITS);
        if (this.y < 0) this.markedForDeletion = true;
        if (this.staggerFrame > 0) {
            this.hue += 1;
            this.staggerFrame = 0;
        } else {
            this.staggerFrame += 1;
        }
        this.color = this.color = 'hsl(' + this.hue + ' 100 50)';
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
class Star {
    constructor() {
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = 0;
        this.radius = Math.random() + (UNITS);
        this.markedForDeletion = false;
        if (COLOR_OF_STARS === colorOfStarsRadioArray[0].value) {
            this.color = 'white';
        } else if (COLOR_OF_STARS === colorOfStarsRadioArray[1].value) {
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ' ' + Math.floor(Math.random() * 10 + 90) + ' ' + Math.floor(Math.random() * 10 + 90) + ')'; 
        } else {
            this.color = 'hsl(' + Math.floor(Math.random() * 360) + ' ' + Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 100) + ')'; 
        }
    }
    update() {
        this.y += this.radius;
        if (this.y > CANVAS_HEIGHT - this.radius) this.markedForDeletion = true;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
class Asteroid {
    constructor() {
        this.image = new Image();
        this.image.src = './resources/images/asteroid.png';
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.width = this.spriteWidth * (UNITS);
        this.height = this.spriteHeight * (UNITS);
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = 0 - this.height;
        this.rotation = Math.random() * 10 - 5;
        this.markedForDeletion = false;
    }
    update() {
        this.y += UNITS;
        this.x += this.rotation * 0.05;
        if (this.y > CANVAS_HEIGHT + this.height || this.x < 0 - this.width || this.x > CANVAS_WIDTH) this.markedForDeletion = true;
    }
    draw() {
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// Game Logic
function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let deltaTime = timestamp - LAST_TIME;
    LAST_TIME = timestamp;
    TIME_TO_NEXT_STAR += deltaTime;
    if (TIME_TO_NEXT_STAR > STAR_INTERVAL) {
        for (let i = 0; i < NUM_OF_STARS; ++i) {
            stars.push(new Star());
        }
        TIME_TO_NEXT_STAR = 0;
    }
    stars = stars.filter(object => !object.markedForDeletion);
    stars.forEach(object => object.update());
    stars.forEach(object => object.draw());
    if (!GAME_OVER) {
        TIME_TO_NEXT_ROCKET_PARTICLE += deltaTime;
        if (TIME_TO_NEXT_ROCKET_PARTICLE > ROCKET_PARTICLE_INTERVAL) {
            for (let i = 0; i < NUM_OF_ROCKET_PARTICLES; ++i) {
                rocketParticles.push(new RocketParticle());
            }
        }
        TIME_TO_NEXT_ASTEROIDS += deltaTime;
        if (TIME_TO_NEXT_ASTEROIDS > ASTEROID_INTERVAL) {
            for (let i = 0; i < NUM_OF_ASTEROIDS; ++i) {
                if (Math.ceil(Math.random() * (100 / CHANCE_OF_ASTEROID)) === 1) {
                    asteroids.push(new Asteroid());
                }
            }
            console.log((Math.ceil(Math.random() * (100 / CHANCE_OF_ASTEROID))));
        }
        rocketParticles = rocketParticles.filter(object => !object.markedForDeletion);
        asteroids = asteroids.filter(object => !object.markedForDeletion);
        [...rocketParticles, ...asteroids].forEach(object => object.update());
        [...rocketParticles, ...asteroids].forEach(object => object.draw());
        ROCKET.update();
        ROCKET.draw();
    }
    requestAnimationFrame(animate);
    console.log(asteroids);
}
animate(0);
