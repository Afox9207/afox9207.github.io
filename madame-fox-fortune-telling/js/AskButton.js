import { Button } from "./Button.js";

export class AskButton extends Button {
    constructor(main) {
        super(main);
        this.button = main.shadow.getElementById('ask-button');
        this.button.addEventListener('click', () => {
            if (!main.orb.isActive) {
                main.orb.activate();
                this.animate();
            }
        });
    }
}