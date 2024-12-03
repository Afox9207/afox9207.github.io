'use strict';

import { RandomIntegerGenerator, RandomFloatingPointGenerator } from "../../../../resources/js/modules/modules.js";

const randomInteger = new RandomIntegerGenerator();
const randomFloatingPoint = new RandomFloatingPointGenerator();

const gameContainer = {
    element: document.getElementById('game'),
    defaultBrightness: 0.7,
    newBrightness: 1,
    style: function() {
        this.element.style.position = 'relative';
        this.element.style.background = 'url(./resources/fortune-teller/images/blue-nebula.jpg)';
    },
    addFilter: function() {
        const div = document.createElement('div');
        div.id = 'gameBackgroundFilter';
        this.element.appendChild(div);
    },
    styleFilter: function() {
        this.filter = document.getElementById('gameBackgroundFilter');
        this.filter.style.position = 'absolute';
        this.filter.style.top = '0';
        this.filter.style.bottom = '0';
        this.filter.style.width = '100%';
        this.filter.style.background = 'black';
    },
    changeBrightness: function(brightness) {
        this.filter.style.opacity = 1 - brightness;
    } 
};

const title = {
    marginTop: 32,
    marginBottom: 32,
    create: function() {
        const h1 = document.createElement('h1');
        h1.id = 'gameTitle';
        h1.textContent = `Madame Fox's Fortune Telling`;
        gameContainer.element.appendChild(h1);
    },
    style: function() {
        this.element = document.getElementById('gameTitle');
        this.element.style.position = 'relative';
        this.element.style.zIndex = '1';
        gameContainer.element.style.paddingTop = this.marginTop + 'px';
        this.element.style.marginBottom = this.marginBottom + 'px';
        this.element.style.fontSize = '32px';
        this.element.style.color = 'white';
        this.element.style.textAlign = 'center';
        this.element.style.fontWeight = '600';
    }
};

const orb = {
    marginTop: 32,
    marginBottom: 32,
    radius: 256,
    colorOne: 'hsl(240 100 100 / 0.5)',
    colorTwo: 'hsl(240 100 75 / 0.5)',
    transitionTime: 1000,
    brightness: 1.1,
    borderBlur: 16,
    defaultBrightness: 1,
    newBrightness: 1.1,
    create: function() {
        const div = document.createElement('div');
        div.id = 'gameOrb';
        gameContainer.element.appendChild(div);
    },
    style: function() {
        this.element = document.getElementById('gameOrb');
        this.element.style.position = 'relative';
        this.element.style.zIndex = '1';
        this.element.style.overflow = 'hidden';
        this.element.style.margin = `${this.marginTop}px auto ${this.marginBottom}px`;
        this.element.style.width = this.radius + 'px';
        this.element.style.height = this.radius + 'px';
        this.element.style.borderRadius = '50%';
        this.element.style.background = `radial-gradient(${this.colorOne}, ${this.colorTwo})`;
    },
    addFilter: function() {
        const div = document.createElement('div');
        div.id = 'gameOrbFilter';
        this.element.appendChild(div);
    },
    styleFilter: function() {
        this.filter = document.getElementById('gameOrbFilter');
        this.filter.style.position = 'absolute';
        this.filter.style.top = '0';
        this.filter.style.bottom = '0';
        this.filter.style.width = '100%';
        this.filter.style.background = 'white';
    },
    setTransitions: function() {
        gameContainer.filter.style.transition = `opacity ${this.transitionTime}ms linear`;
        this.filter.style.transition = `opacity ${this.transitionTime}ms linear`;
        this.element.style.transition = `box-shadow ${this.transitionTime}ms linear`;
    },
    changeBrightness: function(brightness) {
        this.filter.style.opacity = brightness - 1;
    },
    lightUp: function() {
        gameContainer.changeBrightness(gameContainer.newBrightness);
        this.changeBrightness(this.newBrightness);
        this.element.style.boxShadow =
        `-1px -1px ${this.borderBlur}px ${this.colorTwo},
        -1px 1px ${this.borderBlur}px ${this.colorTwo},
        1px -1px ${this.borderBlur}px ${this.colorTwo},
        1px 1px ${this.borderBlur}px ${this.colorTwo}`;
    },
    turnOff: function() {
        gameContainer.changeBrightness(gameContainer.defaultBrightness);
        this.changeBrightness(this.defaultBrightness);
        this.element.style.boxShadow = 'none';
    }
};

class SmokeCloud {
    constructor() {
        this.size = 8;
        this.x = (orb.radius / 2 - this.size / 2) + randomFloatingPoint.generate(-24, 24);
        this.y = (orb.radius / 2 - this.size / 2) + randomFloatingPoint.generate(-24, 24);
        this.xVelocity = randomFloatingPoint.generate(-0.05, 0.05);
        this.yVelocity = randomFloatingPoint.generate(-0.05, 0.05);
        this.time = 0;
    }
}

const canvas = {
    smokeClouds: [],
    smokeCloudTimer: 0,
    smokeCloudInterval: 32,
    frameSize: 64,
    growRate: 0.1,
    maxLifeSpan: 2500,
    maxSize: 64,
    minSize: 8,
    create: function() {
        const canvas = document.createElement('canvas');
        canvas.width = orb.radius;
        canvas.height = orb.radius;
        canvas.id = 'orbCanvas';
        orb.element.appendChild(canvas);
    },
    style: function() {
        this.element = document.getElementById('orbCanvas');
        this.element.style.display = 'block';
    },
    getContext: function() {
        this.ctx = canvas.element.getContext('2d');
    },
    loadSmokeImage: function() {
        const img = document.createElement('img');
        img.src = './resources/fortune-teller/images/smoke.png';
        img.id = 'orbSmoke';
        gameContainer.element.appendChild(img);
        this.smokeImage = document.getElementById('orbSmoke');
        this.smokeImage.style.display = 'none';
    },
    getSmokeSizeOffset: function() {
        this.smokeSizeOffset = this.growRate / 2;
    },
    createSmokeClouds: function() {
        for (let i = 0; i < 2; ++i) {
            this.smokeClouds.push(new SmokeCloud());
        }
    },
    removeSmokeClouds: function(cloud, index) {
        if (cloud.size < 8) {
            this.smokeClouds.splice(index, 1);
        }
    },
    changeSmokeCloudSize: function(cloud, deltaTime) {
        if (cloud.time < this.maxLifeSpan) {
            cloud.time += deltaTime;
            if (cloud.size < this.maxSize) {
                cloud.size += this.growRate * deltaTime;
                cloud.x -= this.smokeSizeOffset * deltaTime;
                cloud.y -= this.smokeSizeOffset * deltaTime;
            }
        } else {
            cloud.size -= this.growRate * deltaTime;
            cloud.x += this.smokeSizeOffset * deltaTime;
            cloud.y += this.smokeSizeOffset * deltaTime;
        }
    },
    moveSmokeCloud: function(cloud, deltaTime) {
        cloud.x += cloud.xVelocity * deltaTime;
        cloud.y += cloud.yVelocity * deltaTime;
    },
    updateSmokeClouds: function(deltaTime) {
        this.smokeClouds.forEach((cloud, index) => {
            this.removeSmokeClouds(cloud, index);
            this.changeSmokeCloudSize(cloud, deltaTime);
            this.moveSmokeCloud(cloud, deltaTime);
        });
    },
    drawSmokeClouds: function(ctx) {
        this.smokeClouds.forEach(cloud => {
            ctx.drawImage(this.smokeImage, 0, 0, this.frameSize, this.frameSize, cloud.x,
            cloud.y, cloud.size, cloud.size);
            });
    }
}; 

const askButton = {
    marginTop: 32,
    marginBottom: 32,
    verticalPadding: 8,
    horizontalPadding: 16,
    timerIsActive: false,
    create: function() {
        const button = document.createElement('button');
        button.id = 'gameAskButton';
        button.textContent = 'ASK';
        gameContainer.element.appendChild(button);
    },
    style: function() {
        this.element = document.getElementById('gameAskButton');
        this.element.style.position = 'relative';
        this.element.style.zIndex = '1';
        this.element.style.display = 'block';
        this.element.style.marginTop = this.marginTop + 'px';
        this.element.style.marginInline = 'auto';
        gameContainer.element.style.paddingBottom = this.marginBottom + 'px';
        this.element.style.padding = `${this.verticalPadding}px ${this.horizontalPadding}px`;
        this.element.style.border = '1px solid white';
        this.element.style.borderRadius = '4px';
        this.element.style.background = 'transparent';
        this.element.style.cursor = 'pointer';
        this.element.style.color = 'white';
    },
    addEventListener: function() {
        this.element.addEventListener('click', () => {
            if (!this.timerIsActive) {
                this.timerIsActive = true;
                answer.isGenerated = false;
                answer.element.style.opacity = '0';
            }
        });
    }
};

const answer = {
    answers: [  'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it',
                'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
                'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
                `Don't count on it`, 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'],
    isGenerated: false,
    create: function() {
        const p = document.createElement('p');
        p.id = 'gameAnswer';
        p.textContent = 'test';
        orb.element.appendChild(p);
        this.element = document.getElementById('gameAnswer');
    },
    style: function() {
        this.element.style.position = 'absolute';
        this.element.style.top = '50%';
        this.element.style.left = '50%';
        this.element.style.translate = '-50% -50%';
        this.element.style.zIndex = '1';
        this.element.style.fontSize = '24px';
        this.element.style.textAlign = 'center';
        this.element.style.color = 'white';
        this.element.style.fontWeight = '600';
        this.element.style.opacity = '0';
        this.element.style.transition = `opacity ${orb.transitionTime}ms linear`;
    },
    generate: function() {
        this.isGenerated = true;
        this.element.textContent = this.answers[randomInteger.generate(0, 19)];
        this.element.style.opacity = '1';
    }
};

const animator = {
    lastTime: 0,
    animationInterval: 7000,
    animationTimer: 0,
    animate: function(timestamp) {
        canvas.ctx.clearRect(0, 0, orb.radius, orb.radius);
        const deltaTime = timestamp - animator.lastTime;
        animator.lastTime = timestamp;
        if (askButton.timerIsActive) {
            if (animator.animationTimer === 0) {
                orb.lightUp();
                animator.animationTimer += deltaTime;
            } else if (animator.animationTimer < animator.animationInterval) {
                canvas.createSmokeClouds();
                canvas.updateSmokeClouds(deltaTime);
                canvas.drawSmokeClouds(canvas.ctx);
                animator.animationTimer += deltaTime;
            } else {
                animator.animationTimer = 0;
                askButton.timerIsActive = false;
                orb.turnOff();
                if (!answer.isGenerated) {
                    answer.generate();
                }
            }
        } else {
            if (canvas.smokeClouds.length > 0) {
                canvas.updateSmokeClouds(deltaTime);
                canvas.drawSmokeClouds(canvas.ctx);
            }
        }
        requestAnimationFrame(animator.animate);
    }
};

gameContainer.style();
gameContainer.addFilter();
gameContainer.styleFilter();
gameContainer.changeBrightness(gameContainer.defaultBrightness);

title.create();
title.style();

orb.create();
orb.style();
orb.addFilter();
orb.styleFilter();
orb.changeBrightness(orb.defaultBrightness);
// give time for container to set brightness without transition
setTimeout(() => {
    orb.setTransitions();
}, 100);

canvas.create();
canvas.style();
canvas.getContext();
canvas.loadSmokeImage();
canvas.getSmokeSizeOffset();

askButton.create();
askButton.style();
askButton.addEventListener();

answer.create();
answer.style();

animator.animate(0);