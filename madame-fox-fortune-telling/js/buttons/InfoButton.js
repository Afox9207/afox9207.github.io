import { Button } from "./Button.js";

export class InfoButton extends Button {
    constructor(menu) {
        super(menu.main, menu.openButtonElement);
        this.listener = function() {
            menu.openButton.removeListener();
            menu.closeButton.addListener();
            menu.open();
        };
        this.addListener();
    }
}