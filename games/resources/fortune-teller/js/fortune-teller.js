'use strict';

import { RandomIntegerGenerator, RandomFloatingPointGenerator } from "../../../../resources/js/modules/modules.js";

const randomInteger = new RandomIntegerGenerator();
const randomFloatingPoint = new RandomFloatingPointGenerator();

const gameContainer = {
    element: document.getElementById('game'),
    defaultBrightness: 0.5,
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
        this.element.style.textShadow = '4px 4px black';
    }
};

const orb = {
    marginTop: 32,
    marginBottom: 32,
    radius: 256,
    colorOne: 'hsl(240 100 100 / 0.5)',
    colorTwo: 'hsl(240 100 75 / 0.5)',
    transitionTime: 1000,
    defaultBorderBlur: 4,
    newBorderBlur: 16,
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
    changeBorderBlur: function(blur) {
        this.element.style.boxShadow =
        `-1px -1px ${blur}px ${this.colorTwo},
        -1px 1px ${blur}px ${this.colorTwo},
        1px -1px ${blur}px ${this.colorTwo},
        1px 1px ${blur}px ${this.colorTwo}`;
    },
    lightUp: function() {
        gameContainer.changeBrightness(gameContainer.newBrightness);
        this.changeBrightness(this.newBrightness);
        this.changeBorderBlur(this.newBorderBlur);
    },
    turnOff: function() {
        gameContainer.changeBrightness(gameContainer.defaultBrightness);
        this.changeBrightness(this.defaultBrightness);
        this.changeBorderBlur(this.defaultBorderBlur);
    }
};

class SmokeCloud {
    constructor() {
        this.size = 8;
        // 124 is hard coded number for center of orb offset by half size of cloud
        this.x = 124 + randomFloatingPoint.generate(-24, 24);
        this.y = 124 + randomFloatingPoint.generate(-24, 24);
        this.xVelocity = randomFloatingPoint.generate(-0.05, 0.05);
        this.yVelocity = randomFloatingPoint.generate(-0.05, 0.05);
        this.lifeTime = 0;
        this.frame = 0;
        // 25 fps
        this.frameInterval = 25;
        this.frameTimer = 0;
    }
}

const canvas = {
    smokeClouds: [],
    newSmokeCloudTimer: 0,
    newSmokeCloudInterval: 1000 / 60,
    newCloudsPerCycle: 10,
    frameSize: 64,
    growRate: 0.1,
    maxSize: 64,
    minSize: 8,
    maxLifeSpan: 2500,
    maxFrame: 14,
    minFrameRate: 1000 / 30,
    create: function() {
        const canvas = document.createElement('canvas');
        canvas.width = orb.radius;
        canvas.height = orb.radius;
        canvas.id = 'orbCanvas';
        orb.element.appendChild(canvas);
    },
    style: function() {
        this.element = document.getElementById('orbCanvas');
        this.element.style.position = 'relative';
        this.element.style.display = 'block';
    },
    getContext: function() {
        this.ctx = canvas.element.getContext('2d');
    },
    loadSmokeImage: function() {
        const img = document.createElement('img');
        img.src = './resources/fortune-teller/images/smoke-sprite-sheet.png';
        img.id = 'orbSmoke';
        gameContainer.element.appendChild(img);
        this.smokeImage = document.getElementById('orbSmoke');
        this.smokeImage.style.display = 'none';
    },
    getSmokeSizeOffset: function() {
        this.smokeSizeOffset = this.growRate / 2;
    },
    createSmokeClouds: function(deltaTime) {
        if (this.newSmokeCloudTimer === 0) {
            this.newSmokeCloudTimer += deltaTime;
            for (let i = 0; i < this.newCloudsPerCycle; ++i) {
                this.smokeClouds.push(new SmokeCloud());
            }
        } else if (this.newSmokeCloudTimer < this.newSmokeCloudInterval) {
            this.newSmokeCloudTimer += deltaTime;
        } else {
            this.newSmokeCloudTimer = 0;
        }
        // if frame rate drops too low
        if (deltaTime > this.minFrameRate) {
            --this.newCloudsPerCycle;
        }
    },
    removeSmokeClouds: function(cloud, index) {
        if (cloud.size < 8) {
            this.smokeClouds.splice(index, 1);
        }
    },
    changeSmokeCloudSize: function(cloud, deltaTime) {
        if (cloud.lifeTime < this.maxLifeSpan) {
            cloud.lifeTime += deltaTime;
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
    changeSmokeFrame: function(cloud, deltaTime) {
        if (cloud.frameTimer === 0) {
            cloud.frame < this.maxFrame ? ++cloud.frame : cloud.frame = 0;
            cloud.frameTimer += deltaTime;
        } else if (cloud.frameTimer < cloud.frameInterval) {
            cloud.frameTimer += deltaTime;
        } else {
            cloud.frameTimer = 0;
        }
    },
    updateSmokeClouds: function(deltaTime) {
        this.smokeClouds.forEach((cloud, index) => {
            this.removeSmokeClouds(cloud, index);
            this.changeSmokeCloudSize(cloud, deltaTime);
            this.moveSmokeCloud(cloud, deltaTime);
            this.changeSmokeFrame(cloud, deltaTime);
        });
    },
    drawSmokeClouds: function(ctx) {
        const arrayLength = this.smokeClouds.length - 1;
        // draw newest clouds first
        for (let i = arrayLength; i > 0; --i) {
            ctx.drawImage(this.smokeImage, this.smokeClouds[i].frame * this.frameSize, 0, this.frameSize, this.frameSize,
            this.smokeClouds[i].x, this.smokeClouds[i].y, this.smokeClouds[i].size, this.smokeClouds[i].size);
        }
        
    }
}; 

const askButton = {
    marginTop: 32,
    marginBottom: 32,
    verticalPadding: 8,
    horizontalPadding: 16,
    isActive: false,
    hoverGlow: 4,
    transitionTime: 100,
    create: function() {
        const button = document.createElement('button');
        button.id = 'gameAskButton';
        button.textContent = 'ASK';
        gameContainer.element.appendChild(button);
    },
    style: function() {
        this.element = document.getElementById('gameAskButton');
        
        const style = document.createElement('style');
        style.textContent = 
        `#gameAskButton {
            position: relative;
            z-index: 1;
            display: block;
            margin-top: ${this.marginTop}px;
            margin-inline: auto;
            padding: ${this.verticalPadding}px ${this.horizontalPadding}px;
            border: 1px solid white;
            border-radius: 4px;
            background-color: hsl(0 0 0 / 0);
            cursor: pointer;
            color: white;
            font-size: 16px;
            transition: box-shadow ${this.transitionTime}ms linear,
                        scale ${this.transitionTime}ms linear,
        }
        #gameAskButton:active {
            box-shadow: -1px -1px ${this.hoverGlow}px white,
                        -1px 1px ${this.hoverGlow}px white,
                        1px -1px ${this.hoverGlow}px white,
                        1px 1px ${this.hoverGlow}px white;
            scale: 1.05;
            background-color: hsl(0 0 0 / 1);
        }
        @media (hover: hover) {
            #gameAskButton:hover {
                box-shadow: -1px -1px ${this.hoverGlow}px white,
                            -1px 1px ${this.hoverGlow}px white,
                            1px -1px ${this.hoverGlow}px white,
                            1px 1px ${this.hoverGlow}px white;
                scale: 1.05;
                background-color: hsl(0 0 0 / 1);
            }
        }`;
        document.head.appendChild(style);

        gameContainer.element.style.paddingBottom = this.marginBottom + 'px';
    },
    addEventListener: function() {
        this.element.addEventListener('click', () => {
            if (!this.timerIsActive) {
                this.isActive = true;
                answer.isGenerated = false;
                answer.fadeOut();
                animator.animationTimer = 0;
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
    transitionTime: 2000,
    create: function() {
        const p = document.createElement('p');
        p.id = 'gameAnswer';
        orb.element.appendChild(p);
        this.element = document.getElementById('gameAnswer');
    },
    style: function() {
        this.element.style.position = 'absolute';
        this.element.style.top = '50%';
        this.element.style.left = '50%';
        this.element.style.translate = '-50% -50%';
        this.element.style.fontSize = '16px';
        this.element.style.textAlign = 'center';
        this.element.style.color = 'white';
        this.element.style.fontWeight = '600';
        this.element.style.opacity = '0';
        this.element.style.transition = `opacity ${this.transitionTime}ms linear,
        scale ${this.transitionTime}ms linear`;
    },
    generate: function() {
        this.element.textContent = this.answers[randomInteger.generate(0, 19)];
    },
    fadeIn: function() {
        this.element.style.opacity = '1';
        this.element.style.scale = '1.5';
    },
    fadeOut: function() {
        this.element.style.opacity = '0';
        this.element.style.scale = '1';
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
        if (askButton.isActive) {
            if (animator.animationTimer === 0) {
                orb.lightUp();
                animator.animationTimer += deltaTime;
            } else if (animator.animationTimer < animator.animationInterval) {
                    canvas.createSmokeClouds(deltaTime);
                    canvas.updateSmokeClouds(deltaTime);
                    canvas.drawSmokeClouds(canvas.ctx);
                    animator.animationTimer += deltaTime;
            } else {
                if (!answer.isGenerated) {
                    answer.generate();
                    answer.fadeIn();
                    orb.turnOff();
                    answer.isGenerated = true;
                }
                if (canvas.smokeClouds.length > 0) {
                    canvas.updateSmokeClouds(deltaTime);
                    canvas.drawSmokeClouds(canvas.ctx);
                } else {
                    askButton.isActive = false;
                }
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
orb.changeBorderBlur(orb.defaultBorderBlur);
// give time for container to set brightness without transition
setTimeout(() => {
    orb.setTransitions();
}, 100);

answer.create();
answer.style();

canvas.create();
canvas.style();
canvas.getContext();
canvas.loadSmokeImage();
canvas.getSmokeSizeOffset();

askButton.create();
askButton.style();
askButton.addEventListener();

animator.animate(0);