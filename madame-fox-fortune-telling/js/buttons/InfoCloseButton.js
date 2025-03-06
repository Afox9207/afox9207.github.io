import { Button } from "./Button.js";

export class InfoCloseButton extends Button {
    constructor(menu) {
        super(menu.main, menu.closeButtonElement);
        this.listener = function() {
            menu.closeButton.animate();
            menu.closeButton.removeListener();
            menu.openButton.addListener();
            menu.close();
        };
    }
}