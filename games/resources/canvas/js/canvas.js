'use strict';

class Circle {
    constructor() {
        this.calculateRadius();
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.red = Math.floor(Math.random() * 256); 
        this.green = Math.floor(Math.random() * 256); 
        this.blue = Math.floor(Math.random() * 256); 
        this.strokeColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        this.fillColor = `rgb(${this.red}, ${this.green}, ${this.blue}, 0.1)`;
        this.calculateDX();
        this.calculateDY();
    }
    calculateRadius() {
        const minRadius = 16;
        const maxRadius = 64;
        this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
    }
    calculateDX() {
        const minSpeed = 0.1;
        const maxSpeed = 0.2;
        let direction = Math.random() - 0.5;
        this.dx = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        if (direction <= 0) {
            this.dx *= -1;
        }
    }
    calculateDY() {
        const minSpeed = 0.1;
        const maxSpeed = 0.2;
        let direction = Math.random() - 0.5;
        this.dy = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        if (direction <= 0) {
            this.dy *= -1;
        }
    }
}

class Rectangle {
    constructor() {
        this.calculateWidth();
        this.calculateHight();
        this.x = Math.random() * (canvas.width - this.width) + this.width * 0.5;
        this.y = Math.random() * (canvas.height - this.height) + this.height * 0.5;
        this.red = Math.floor(Math.random() * 256); 
        this.green = Math.floor(Math.random() * 256); 
        this.blue = Math.floor(Math.random() * 256); 
        this.strokeColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        this.fillColor = `rgb(${this.red}, ${this.green}, ${this.blue}, 0.1)`;
        this.calculateDX();
        this.calculateDY();
    }
    calculateWidth() {
        const minWidth = 36;
        const maxWidth = 128;
        this.width = Math.random() * (maxWidth - minWidth) + minWidth;
    }
    calculateHight() {
        const minHeight = 36;
        const maxHeight = 128;
        this.height = Math.random() * (maxHeight - minHeight) + minHeight;
    }
    calculateDX() {
        const minSpeed = 0.1;
        const maxSpeed = 0.2;
        let direction = Math.random() - 0.5;
        this.dx = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        if (direction <= 0) {
            this.dx *= -1;
        }
    }
    calculateDY() {
        const minSpeed = 0.1;
        const maxSpeed = 0.2;
        let direction = Math.random() - 0.5;
        this.dy = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        if (direction <= 0) {
            this.dy *= -1;
        }
    }
}

const canvas = {
    width: window.innerWidth,
    height: window.innerHeight,
    element: document.getElementById('canvas'),
    initialize: function() {
        this.setDimensions();
        this.getContext();
    },
    setDimensions: function() {
        this.element.width = this.width;
        this.element.height = this.height;
    },
    getContext: function() {
        this.ctx = this.element.getContext('2d');
    },
    update: function(deltaTime) {
        background.update(deltaTime);
        circles.update(deltaTime);
        rectangles.update(deltaTime);
    },
    draw: function(ctx) {
        background.draw(ctx);
        circles.draw(ctx);
        rectangles.draw(ctx);
    }
};
canvas.initialize();

const background = {
    hue: 0,
    color: null,
    colorChangeTimer: 0,
    colorChangeInterval: 1000 / 15,
    changeColor: function() {
        if (this.hue < 359) {
            ++this.hue;
        } else {
            this.hue = 0;
        }
    },
    update: function(deltaTime) {
        if (this.colorChangeTimer < this.colorChangeInterval) {
            this.colorChangeTimer += deltaTime;
        } else {
            this.changeColor();
            this.colorChangeTimer = 0;
        }
    },
    draw: function(ctx) {
        ctx.save();
        ctx.fillStyle = `hsl(${this.hue}, 25%, 50%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

const circles = {
    numOfCircles: 25,
    array: [],
    spawn: function() {
        for (let i = 0; i < this.numOfCircles; ++i) {
            this.array.push(new Circle());
        }
    },
    moveCircle: function(circle, deltaTime) {
        circle.x += circle.dx * deltaTime;
        circle.y += circle.dy * deltaTime;
    },
    checkIfCircleGoesOffscreen: function(circle) {
        // left and right
        if (circle.x + circle.radius < 0) {
            circle.x = canvas.width + circle.radius;
        } else if (circle.x - circle.radius > canvas.width) {
            circle.x = 0 - circle.radius;
        }
        // top and bottom
        if (circle.y + circle.radius < 0) {
            circle.y = canvas.height + circle.radius;
        } else if (circle.y - circle.radius > canvas.height) {
            circle.y = 0 - circle.radius;
        }
    },
    update: function(deltaTime) {
        this.array.forEach(circle => {
            this.moveCircle(circle, deltaTime);
            this.checkIfCircleGoesOffscreen(circle);
        });
    },
    draw: function(ctx) {
        this.array.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2,);
            ctx.save();
            ctx.fillStyle = circle.fillColor;
            ctx.strokeStyle = circle.strokeColor;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        });
    }
};
circles.spawn();

const rectangles = {
    numOfRectangles: 25,
    array: [],
    spawn: function() {
        for (let i = 0; i < this.numOfRectangles; ++i) {
            this.array.push(new Rectangle());
        }
    },
    moveRectangle: function(rectangle, deltaTime) {
        rectangle.x += rectangle.dx * deltaTime;
        rectangle.y += rectangle.dy * deltaTime;
    },
    checkIfRectangleGoesOffscreen: function(rectangle) {
        // left and right
        if (rectangle.x + rectangle.width < 0) {
            rectangle.x = canvas.width;
        } else if (rectangle.x > canvas.width) {
            rectangle.x = 0 - rectangle.width;
        }
        // top and bottom
        if (rectangle.y + rectangle.height < 0) {
            rectangle.y = canvas.height;
        } else if (rectangle.y > canvas.height) {
            rectangle.y = 0 - rectangle.height;
        }
    },
    update: function(deltaTime) {
        this.array.forEach(rectangle => {
            this.moveRectangle(rectangle, deltaTime)
            this.checkIfRectangleGoesOffscreen(rectangle);
        });
    },
    draw: function(ctx) {
        this.array.forEach(rectangle => {
            ctx.save();
            ctx.fillStyle = rectangle.fillColor;
            ctx.strokeStyle = rectangle.strokeColor;
            ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            ctx.restore();
        });
    }
};
rectangles.spawn();

let lastTime = 0;
function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.update(deltaTime);
    canvas.draw(canvas.ctx);
    requestAnimationFrame(animate);
}
animate(0);