import { Button } from "./Button.js";

export class OpenMenuButton extends Button {
    constructor(main, button, menu) {
        super(main, button);
        this.button.addEventListener('click', () => {
            menu.open();
        });
    }
}