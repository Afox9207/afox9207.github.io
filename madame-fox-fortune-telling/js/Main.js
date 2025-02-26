import { createHTMLElements } from "./createHTMLElements.js";
import { GameContainer } from "./GameContainer.js";
import { Menu } from "./Menu.js";
import { Info } from "./Info.js";
import { Settings } from "./Settings.js";
import { Background } from "./Background.js";
import { Orb } from "./Orb.js";
import { Button } from "./Button.js";
import { AskButton } from "./AskButton.js";
import { Answer } from "./Answer.js";
import { State } from "./State.js";

class Main {
    constructor() {
        this.buttonAnimationDuration = 250;
        this.iconAnimationDuration = 500;
        this.menuTransitionTime = 250;
        createHTMLElements();
        this.shadow = document.getElementById('game-area').shadowRoot;
        this.gameContainer = new GameContainer(this);
        this.menu = new Menu(this);
        this.menu.addStyles();
        this.info = new Info(this);
        this.settings = new Settings(this);
        this.background = new Background(this);
        this.orb = new Orb(this);
        this.state = new State(this);
        this.button = new Button(this);
        this.button.addStyles();
        this.askButton = new AskButton(this);
        this.answer = new Answer(this);
        this.startAnimating();
    }
    addStyles(styles) {
        const styleTag = this.shadow.getElementById('style');
        styleTag.innerHTML += styles;
    }
    startAnimating() {
        let previousTimestamp = 0;

        const animateNextFrame = timestamp => {
            requestAnimationFrame(animateNextFrame);
            const deltaTime = timestamp - previousTimestamp;
            previousTimestamp = timestamp;
            this.state.checkState();
            this.orb.update(deltaTime);
            this.orb.draw();
        };
        animateNextFrame(0);
    }
}

const main = new Main();