import { Button } from "./Button.js";

export class DefaultButton extends Button {
    constructor(main, button) {
        super(main, button);
        this.button.addEventListener('click', () => {
            this.animate();
            main.settings.reset();
        });
    }
}