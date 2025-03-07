import { Button } from "./Button.js";

export class AskButton extends Button {
    constructor(main) {
        super(main);
        this.button = main.shadow.getElementById('ask-button');
        this.listener = function() {
            main.askButton.removeListener();
            main.askButton.animate();
            main.orb.activate();
        }
        this.addListener();
    }
}