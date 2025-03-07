import { Button } from "./Button.js";

export class DefaultButton extends Button {
    constructor(menu) {
        super(menu.main, menu.defaultButtonElement);
        this.listener = function() {
            menu.defaultButton.animate();
            menu.main.settings.reset();
        }
    }
}