import { SmokeCloud } from "./SmokeCloud.js";

export class Orb {
    constructor(main) {
        const canvas = main.shadow.getElementById('canvas');
        const orbRadius = 128;
        const orbDiameter = orbRadius * 2;
        const innerColor = 'hsl(200 50 75 / .5)';
        const outerColor = 'hsl(200 50 25 / .5)';
        const boxShadowBlur = 8;
        const transitionTime = 1000;
        const styles = 
        `
        .orb {
            position: relative;
            margin-inline: auto;
            margin-block: 32px;
            width: ${orbRadius * 2}px;
            height: ${orbRadius * 2}px;
            border-radius: 50%;
            background: radial-gradient(${innerColor}, ${outerColor});
            overflow: hidden;
            transition: box-shadow ${transitionTime}ms linear;
        }
        .orb--light-up {
            box-shadow:
            -1px -1px ${boxShadowBlur}px ${outerColor},
            -1px 1px ${boxShadowBlur}px ${outerColor},
            1px -1px ${boxShadowBlur}px ${outerColor},
            1px 1px ${boxShadowBlur}px ${outerColor};
        }
        `;

        main.addStyles(styles);

        canvas.width = orbDiameter;
        canvas.height = orbDiameter;

        this.orb = main.shadow.getElementById('orb');
        this.orbRadius = orbRadius;
        this.orbDiameter = orbDiameter;
        this.ctx = main.shadow.getElementById('canvas').getContext('2d');
        this.smokeClouds = [];

        this.main = main;
    }
    turnOn() {
        const intervalFrequency = 1000 / 60;
        let smokeCloudsPerInterval;

        if (this.main.settings.returnNumberOfClouds() !== 'auto') {
            smokeCloudsPerInterval = this.main.settings.returnNumberOfClouds();
        } else {
            smokeCloudsPerInterval = 10;
        }

        console.log(smokeCloudsPerInterval);
        
        const createSmokeClouds = () => {
            for (let i = 0; i < smokeCloudsPerInterval; ++i) {
                this.smokeClouds.unshift(new SmokeCloud(this.orbRadius));
            }
        }

        this.smokeCloudInterval = setInterval(createSmokeClouds, intervalFrequency);
        
        this.orb.classList.add('orb--light-up');
    }
    turnOff() {
        clearInterval(this.smokeCloudInterval);
        this.orb.classList.remove('orb--light-up');
    }
    update(deltaTime) {
        this.smokeClouds.forEach(cloud => {
            cloud.update(deltaTime);
        });
        this.smokeClouds = this.smokeClouds.filter(cloud => !cloud.markedForDeletion);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.orbDiameter, this.orbDiameter);
        this.smokeClouds.forEach(cloud => {
            cloud.draw(this.ctx);
        });
    }
}