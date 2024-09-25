const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

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

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    update(deltaTime) {

    }
    draw(ctx) {

    }
}
const game = new Game(canvas.width, canvas.height);