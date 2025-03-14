import { Background } from "../Background.js";
import { SmokeCloud } from "./SmokeCloud.js";

export class Orb {
    constructor(main) {
        const canvas = main.shadow.getElementById('canvas');
        const orbElement = main.shadow.querySelector('.orb');
        
        this.main = main;
        this.diameter = parseInt(getComputedStyle(orbElement).width);
        this.radius = this.diameter / 2;
        this.ctx = canvas.getContext('2d');
        this.smokeClouds = [];

        canvas.width = this.diameter;
        canvas.height = this.diameter;
    }
    activate() {
        const activeTime = 7000;

        const answer = this.main.shadow.getElementById('answer');

        const createNewSmokeCloudIntervalTime = 1000 / 60;
        const createNewSmokeCloudInterval = setInterval(() => {
            let smokeCloudsPerCycle;

            if (this.main.smokeCloudsPerCycleSetting.choice === 'auto') {
                smokeCloudsPerCycle = checkFrameRate();
            } else {
                smokeCloudsPerCycle = this.main.smokeCloudsPerCycleSetting.value;
            }

            for (let i = 0; i < smokeCloudsPerCycle; ++i) {
                this.smokeClouds.unshift(new SmokeCloud(this.radius));
            }
        }, createNewSmokeCloudIntervalTime);

        const checkFrameRate = () => {
            if (this.frameRate < 45) {
                if (this.smokeClouds.length < 1030) {
                    return 9;
                }
                if (this.smokeClouds.length < 927) {
                    return 8;
                }
                if (this.smokeClouds.length < 824) {
                    return 7;
                }
                if (this.smokeClouds.length < 721) {
                    return 6;
                }
                if (this.smokeClouds.length < 618) {
                    return 5;
                }
                if (this.smokeClouds.length < 515) {
                    return 4;
                }
                if (this.smokeClouds.length < 412) {
                    return 3;
                }
                if (this.smokeClouds.length < 309) {
                    return 2;
                }
                if (this.smokeClouds.length < 206) {
                    return 1;
                }
            }
            return 10;
        }

        const elements = [
            this.main.shadow.getElementById('title'),
            this.main.shadow.getElementById('background'),
            this.main.shadow.getElementById('orb')
        ];
        function activateElements() {
            elements.forEach(element => {
                element.setAttribute('data-active', '');
            });
        }
        function deactivateElements() {
            elements.forEach(element => {
                element.removeAttribute('data-active');
            });
        }

        function generateAnswer() {
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
                `Don’t count on it`,
                'My reply is no',
                'My sources say no',
                'Outlook not so good',
                'Very Doubtful'
            ];
            const index = Math.floor(Math.random() * answers.length);

            answer.innerText = answers[index];
            answer.setAttribute('data-active', '');
        }

        answer.removeAttribute('data-active');

        activateElements();

        setTimeout(() => {
            const checkIfSmokeCloudsAreGone = setInterval(() => {
                if (this.smokeClouds.length === 0) {
                    clearInterval(checkIfSmokeCloudsAreGone);
                    this.main.askButton.addListeners();
                }
            }, 1000);
            clearInterval(createNewSmokeCloudInterval);
            deactivateElements();
            generateAnswer();
        }, activeTime);

    }
    animateSmokeClouds(deltaTime) {
        this.ctx.clearRect(0, 0, this.diameter, this.diameter);

        this.smokeClouds.forEach(cloud => {
            cloud.update(deltaTime);
            cloud.draw(this.ctx);
        });
    }
    removeSmokeClouds() {
        this.smokeClouds = this.smokeClouds.filter(cloud => !cloud.markedForDeletion);
    }
}