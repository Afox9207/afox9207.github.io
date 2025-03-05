import { Button } from "./Button.js";

export class FullscreenButton extends Button {
    constructor(main, button) {
        super(main, button);
        this.button.addEventListener('click', () => {
            const container = main.shadow.getElementById('container');

            if (!main.shadow.fullscreenElement) {
                container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }
}