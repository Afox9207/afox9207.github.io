'use strict';

import { GameContainer, Canvas, RandomFloatingPointGenerator, RandomIntegerGenerator } from "../../../../resources/js/modules/modules.js";

new GameContainer();

const randomInteger = new RandomIntegerGenerator();
const randomFloatingPoint = new RandomFloatingPointGenerator();

const gameContainer = {
    element: document.getElementById('gameContainer'),
    defaultFilterOpacity: 0.25,
    styleElement: function() {
        this.element.style.background = 'url(./resources/fortune-teller/images/blue-nebula.jpg) repeat';
    },
    createFilter: function() {
        const filter = document.createElement('div');
        filter.id = 'gameContainerFilter';
        filter.style.position = 'absolute';
        filter.style.width = '100%';
        filter.style.top = '0';
        filter.style.bottom = '0';
        filter.style.backgroundColor = 'black';
        this.element.appendChild(filter);
        this.filter = document.getElementById('gameContainerFilter');
    },
    setFilter: function(opacity) {
        this.filter.style.opacity = opacity;
    }
};

const title = {
    createTitle: function() {
        const h1 = document.createElement('h1');
        h1.textContent = `Madame Fox's Fortune Telling`;
        h1.style.position = 'relative';
        h1.style.zIndex = '1';
        h1.style.color = 'white';
        h1.style.textAlign = 'center';
        gameContainer.element.appendChild(h1);
    }
};

const orb = {
    diameter: 256,
    marginTop: 64,
    marginBottom: 32,
    colorOne: '240 100 100',
    colorTwo: '240 100 75',
    opacity: 0.5,
    defaultFilterOpacity: 0.1,
    transitionTime: 1000,
    animationTimer: 0,
    animationInterval: 5000,
    timerIsActive: false,
    frameInterval: 1000 / 60,
    frameTimer: 0,
    createOrb: function() {
        const orb = document.createElement('div');
        orb.id = 'orb';
        orb.style.position = 'relative';
        orb.style.width = this.diameter + 'px';
        orb.style.maxWidth = 'calc(100% - 64)';
        orb.style.aspectRatio = '1/1';
        orb.style.borderRadius = '50%';
        orb.style.overflow = 'hidden';
        orb.style.margin = `${this.marginTop}px auto ${this.marginBottom}px`;
        orb.style.transition = ''
        gameContainer.element.appendChild(orb);
        this.element = document.getElementById('orb');
    },
    createFilter: function() {
        const div = document.createElement('div');
        div.id = 'orbFilter';
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.bottom = '0';
        div.style.width = '100%';
        div.style.background = 'black';
        this.element.appendChild(div);
        this.filter = document.getElementById('orbFilter');
    },
    setFilter: function(opacity) {
        this.filter.style.opacity = opacity;
    },
    setBackground: function(colorOne, colorTwo) {
        this.element.style.background = `radial-gradient(hsl(${colorOne} / ${this.opacity}),
        hsl(${colorTwo} / ${this.opacity}))`;
    },
    setBoxShadow: function(blur = 0) {
        this.element.style.boxShadow = 
        `-1px -1px ${blur}px hsl(${this.colorTwo} / ${this.opacity}),
        -1px 1px ${blur}px hsl(${this.colorTwo} / ${this.opacity}),
        1px -1px ${blur}px hsl(${this.colorTwo} / ${this.opacity}),
        1px 1px ${blur}px hsl(${this.colorTwo} / ${this.opacity})`;
    },
    setTransitions() {
        this.element.style.transition = `box-shadow ${this.transitionTime}ms linear`;
        this.filter.style.transition = `opacity ${this.transitionTime}ms linear`;
        gameContainer.filter.style.transition = `opacity ${this.transitionTime}ms linear`;
    },
    setOrbToDefault: function() {
        gameContainer.setFilter(gameContainer.defaultFilterOpacity);
        this.setFilter(this.defaultFilterOpacity);
        this.setBoxShadow(0);
    },
    lightUpOrb: function() {
        gameContainer.setFilter(0);
        this.setFilter(0);
        this.setBoxShadow(32);
    },
    animateOrb: function(deltaTime) {
        if (this.timerIsActive) {
            // light up orb
            if (this.animationTimer === 0) {
                this.lightUpOrb();
                this.animationTimer += deltaTime;
            } else if (this.animationTimer < this.animationInterval) {
                this.animationTimer += deltaTime;
            } else {
                this.setOrbToDefault();
                this.animationTimer = 0;
                this.timerIsActive = false;
            }
            canvas.drawSmokeClouds();
            if (this.frameTimer === 0) {
                canvas.createSmokeClouds();
                canvas.updateSmokeClouds(deltaTime);
                canvas.removeSmokeClouds();
                this.frameTimer += deltaTime;
            } else if (this.frameTimer < this.frameInterval) {
                this.frameTimer += deltaTime;
            } else {
                this.frameTimer = 0;
            }
        } else {
            // let smoke clouds disappear
            if (canvas.smokeClouds.length > 0) {
                canvas.drawSmokeClouds();
                if (this.frameTimer === 0) {
                    canvas.updateSmokeClouds(deltaTime);
                    canvas.removeSmokeClouds();
                    this.frameTimer += deltaTime;
                } else if (this.frameTimer < this.frameInterval) {
                    this.frameTimer += deltaTime;
                } else {
                    this.frameTimer = 0;
                }
            }
        }
    }
};

class SmokeCloud {
    constructor() {
        this.size = 64;
        this.x = randomFloatingPoint.generateNumber(0, orb.diameter);
        this.y = randomFloatingPoint.generateNumber(0, orb.diameter);
        this.xVelocity = randomFloatingPoint.generateNumber(-1, 1);
        this.yVelocity = randomFloatingPoint.generateNumber(-1, 1);
        this.frame = randomInteger.generateNumber(0, 14);
        this.markedForDeletion = false;
    }
}

const canvas = {
    smokeClouds: [],
    frameSize: 64,
    maxFrame: 14,
    smokeCloudsPerFrame: 5,
    smokeSizeDecay: .025,
    frameInterval: 1000 / 60,
    frameTimer: 0,
    getElement: function() {
        this.element = document.getElementById('gameCanvas');
    },
    getContext: function() {
        this.ctx = this.element.getContext('2d');
    },
    LoadSmokeImage: function() {
        const img = document.createElement('img');
        img.id = 'orbSmoke';
        img.src = './resources/fortune-teller/images/smoke64.png';
        img.style.display = 'none';
        gameContainer.element.appendChild(img);
        this.image = document.getElementById('orbSmoke');
    },
    createSmokeClouds: function() {
        for (let i = 0; i < this.smokeCloudsPerFrame; ++i) {
            this.smokeClouds.push(new SmokeCloud());
        }
    },
    updateSmokeClouds: function(deltaTime) {
        // update frame
        if (this.frameTimer === 0) {
            this.smokeClouds.forEach(cloud => {
                if (cloud.frame < this.maxFrame) {
                    ++cloud.frame;
                } else {
                    cloud.frame = 0;
                }
                this.frameTimer += deltaTime;
            });
        } else if (this.frameTimer < this.frameInterval) {
            this.frameTimer += deltaTime;
        } else {
            this.frameTimer = 0;
        }
        // update position
        this.smokeClouds.forEach(cloud => {
            cloud.x += cloud.xVelocity * deltaTime / 16;
            cloud.y += cloud.yVelocity * deltaTime / 16;
            cloud.size -= this.smokeSizeDecay * deltaTime;
            if (cloud.size < 32) {
                cloud.markedForDeletion = true;
            } else if ( cloud.x + cloud.size < 0 ||
                        cloud.x > 256 ||
                        cloud.y + cloud.size < 0 ||
                        cloud.y > 256) {
                cloud.markedForDeletion = true;
            }
        });
    },
    removeSmokeClouds: function() {
        this.smokeClouds = this.smokeClouds.filter(cloud => cloud.markedForDeletion === false);
    },
    drawSmokeClouds: function() {
        this.smokeClouds.forEach(cloud => {
            this.ctx.drawImage(this.image, cloud.frame * this.frameSize, 0, this.frameSize, this.frameSize,
            cloud.x, cloud.y, cloud.size, cloud.size);
        });
    }
};

const animate = {
    lastTime: 0,
    start: function(timestamp) {
        const deltaTime = timestamp - animate.lastTime;
        animate.lastTime = timestamp;
        canvas.ctx.clearRect(0, 0, 256, 256);
        orb.animateOrb(deltaTime);
        requestAnimationFrame(animate.start);
    }
};

const answer = {

};

const ask = {
    marginTop: 32,
    marginBottom: 32,
    horizontalPadding: 16,
    verticalPadding: 8,
    createButton: function() {
        const btn = document.createElement('button');
        btn.textContent = 'ASK';
        btn.id = 'orbAskBtn';
        btn.type = 'button';
        btn.style.position = 'relative';
        btn.style.zIndex = '1';
        btn.style.display = 'block';
        btn.style.background = 'transparent';
        btn.style.cursor = 'pointer';
        btn.style.border = '1px solid white';
        btn.style.borderRadius = '4px';
        btn.style.margin = `${this.marginTop}px auto ${this.marginBottom}px`;
        btn.style.padding = `${this.verticalPadding}px ${this.horizontalPadding}px`;
        btn.style.color = 'white';
        gameContainer.element.appendChild(btn);
        this.element = document.getElementById('orbAskBtn');
    },
    addEventListener: function() {
        this.element.addEventListener('click', () => {
            orb.timerIsActive = true;
        });
    }
};

gameContainer.styleElement();
title.createTitle();
gameContainer.createFilter();

orb.createOrb();
orb.createFilter();
orb.setBackground(orb.colorOne, orb.colorTwo);
orb.setTransitions();
orb.setOrbToDefault();

new Canvas(256, 256, 'orb');
canvas.getElement();
canvas.getContext();

canvas.LoadSmokeImage();

ask.createButton();
ask.addEventListener();

animate.start(0);