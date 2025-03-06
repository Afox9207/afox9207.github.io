import { SmokeCloud } from "./SmokeCloud.js";

export class Orb {
    constructor(main) {
        const defaultBoxShadowBlur = 0;
        const activeBoxShadowBlur = 16;
        this.diameter = 320;

        const HTML = 
        `<div id='orb-container' class='orb-container'>
            <h1 id='title' class='title'>Madame Fox's Fortune Telling</h1>
            <div id='orb' class='orb'>
                <p id='answer' class='answer'></p>
                <canvas id='canvas' class='canvas'></canvas>
            </div>
            <button id='ask-button' class='button button--center' type='button'>ASK</button>
        </div>
        `;
        const styles = 
        `
        :host {
            --inner-color;
            --outer-color;
        }
        .orb-container {
            display: grid;
            place-content: center;
        }
        .orb {
            display: grid;
            place-content: center;
            position: relative;
            margin-inline: auto;
            width: ${this.diameter}px;
            height: ${this.diameter}px;
            border-radius: 50%;
            background: radial-gradient(var(--inner-color), var(--outer-color));
            box-shadow:
            -1px -1px ${defaultBoxShadowBlur}px var(--outer-color),
            -1px 1px ${defaultBoxShadowBlur}px var(--outer-color),
            1px -1px ${defaultBoxShadowBlur}px var(--outer-color),
            1px 1px ${defaultBoxShadowBlur}px var(--outer-color);
            transition: box-shadow ${main.styles.orbGlowTransitionTime}ms ease-in-out;
        }
        .orb--active {
            box-shadow:
            -1px -1px ${activeBoxShadowBlur}px var(--outer-color),
            -1px 1px ${activeBoxShadowBlur}px var(--outer-color),
            1px -1px ${activeBoxShadowBlur}px var(--outer-color),
            1px 1px ${activeBoxShadowBlur}px var(--outer-color);
        }
        .answer {
            position: relative;
            padding: 16px;
            font-size: 32px;
            text-align: center;
            color: ${main.styles.boldTextColor};
            font-weight: 700;
            z-index: -1;
            opacity: 0;
            scale: 0;
            transition: opacity ${main.styles.answerTransitionTime}ms linear,
                        scale ${main.styles.answerTransitionTime}ms linear;
        }
        .answer--active {
            opacity: 1;
            scale: 1;
        }
        .canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            z-index: -1;
        }
        `;

        main.addHTML(HTML);
        main.addStyles(styles);

        this.main = main;
        this.orb = main.shadow.getElementById('orb');
        this.answer = main.shadow.getElementById('answer');
        this.radius = this.diameter / 2;
        this.smokeClouds = [];

        const canvas = main.shadow.getElementById('canvas');
        canvas.width = this.diameter;
        canvas.height = this.diameter;
        this.ctx = canvas.getContext('2d');

        this.hue = 225;
    }
    get colors() {
        const colors = {
            hue: this.hue,
            saturation: 100,
            innerLightValue: 75,
            outerLightValue: 0,
            transparency: 0.25
        };
        return colors;
    }
    setColor(hue) {
        const innerColor =
        `hsl(${hue} ${this.colors.saturation} ${this.colors.innerLightValue} / ${this.colors.transparency})`;
        const outerColor =
        `hsl(${hue} ${this.colors.saturation} ${this.colors.innerLightValue} / ${this.colors.transparency})`;

        this.main.shadow.host.style.setProperty('--inner-color', innerColor);
        this.main.shadow.host.style.setProperty('--outer-color', outerColor);

        this.hue = hue;
    }
    lightUp() {
        this.orb.classList.add('orb--active');
    }
    darken() {
        this.orb.classList.remove('orb--active');
    }
    showAnswer() {
        const answers = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            `Don't count on it`,
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful'
        ];
        const randomIndex = Math.floor(Math.random() * 20);

        this.answer.innerText = answers[randomIndex];
        this.answer.classList.add('answer--active');
    }
    hideAnswer() {
        this.answer.classList.remove('answer--active');
    }
    activate() {
        this.hideAnswer();
        this.lightUp();
        this.main.background.lightUp();
        this.main.title.lightUp();
        this.createSmokeCloudsInterval = setInterval(() => {
            this.createSmokeClouds();
        }, 1000 / 60);
        setTimeout(() => {
            this.startCheckingForSmokeClouds = true;
            this.showAnswer();
            this.darken();
            this.main.background.darken();
            this.main.title.darken();
            clearInterval(this.createSmokeCloudsInterval);
        }, this.main.styles.orbActiveTime);
    }
    createSmokeClouds() {
        const smokeCloudsPerInterval = this.main.settings.numberOfClouds;
        
        for (let i = 0; i < smokeCloudsPerInterval; ++i) {
            this.smokeClouds.unshift(new SmokeCloud(this));
        }
    }
    updateSmokeClouds(deltaTime) {
        this.smokeClouds.forEach(cloud => {
            cloud.update(deltaTime);
        });
    }
    removeSmokeClouds() {
        this.smokeClouds = this.smokeClouds.filter(cloud => !cloud.markedForDeletion);
    }
    drawSmokeClouds() {
        this.ctx.clearRect(0, 0 ,this.diameter, this.diameter);
        this.smokeClouds.forEach(cloud => {
            cloud.draw(this.ctx);
        });
    }
    checkForSmokeClouds() {
        if (this.startCheckingForSmokeClouds && !this.smokeClouds.length) {
            this.main.askButton.addListener();
        }
    }
}