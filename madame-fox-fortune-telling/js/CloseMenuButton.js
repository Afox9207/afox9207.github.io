import { Button } from "./Button.js";

export class CloseMenuButton extends Button {
    constructor(main, button, menu) {
        super(main, button);
        this.button.addEventListener('click', () => {
            this.animate();
            menu.close();
        });
    }
}