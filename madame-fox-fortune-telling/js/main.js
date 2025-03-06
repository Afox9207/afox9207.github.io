import { Background } from "./Background.js";
import { Title } from "./Title.js";
import { ButtonGroup } from "./ButtonGroup.js";
import { Info } from "./menus/Info.js";
import { Settings } from "./menus/Settings.js";
import { Orb } from "./Orb.js";
import { AskButton } from "./buttons/AskButton.js";

class Main {
    constructor() {
        this.styles = {
            borderColor: 'white',
            borderRadius: '4px',
            backgroundColor: 'hsl(0 0 0 / 0.5)',
            activeBackgroundColor: 'hsl(0 0 0 / 1)',
            textColor: 'hsl(0 0 100 / 0.85)',
            boldTextColor: 'white',
            menuTransitionTime: 250,
            buttonTransitionTime: 100,
            buttonAnimationTime: 250,
            backgroundTransitionTime: 1500,
            orbGlowTransitionTime: 1500,
            orbActiveTime: 7000,
            answerTransitionTime: 1625,
            titleTransitionTime: 1500
        };

        const gameArea = document.getElementById('game-area');
        const startingHTML = 
        `
        <style id='style'>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font: inherit;
                font-family: Arial, Helvetica, sans-serif;
                text-wrap: pretty;
                -webkit-tap-highlight-color: transparent;
            }
            .container {
                display: grid;
                grid-template-rows: auto 1fr;
                position: relative;
                padding: 16px;
                min-height: 100vh;
                min-height: 100dvh;
            }
        </style>
        <div id='container' class='container'></div>
        `;

        this.shadow = gameArea.attachShadow({mode: 'open'});
        this.shadow.innerHTML = startingHTML;

        this.background= new Background(this);
        this.buttonGroup = new ButtonGroup(this);
        this.orb = new Orb(this);
        this.title = new Title(this);
        this.info = new Info(this);
        this.settings = new Settings(this);
        this.askButton = new AskButton(this);

        this.startAnimating();
    }
    addHTML(HTML, parentId = 'container') {
        const parent = this.shadow.getElementById(parentId);
        const template = document.createElement('template');
        template.innerHTML = HTML;
        parent.append(template.content.cloneNode(true));
    }
    addStyles(styles) {
        const styleTag = this.shadow.getElementById('style');

        if (!styleTag.innerHTML.includes(styles)) {
            styleTag.innerHTML += styles;
        }
    }
    startAnimating() {
        let previousTimestamp = 0;

        const drawNextFrame = (timestamp) => {
            this.requestId = requestAnimationFrame(drawNextFrame);
            const deltaTime = timestamp - previousTimestamp;
            previousTimestamp = timestamp;
            this.orb.removeSmokeClouds();
            this.orb.updateSmokeClouds(deltaTime);
            this.orb.drawSmokeClouds();
            this.orb.checkForSmokeClouds();
        };
        drawNextFrame(0);
    }
}

const main = new Main();