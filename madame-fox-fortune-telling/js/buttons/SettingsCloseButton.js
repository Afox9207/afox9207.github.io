import { Button } from "./Button.js";

export class SettingsCloseButton extends Button {
    constructor(menu) {
        super(menu.main, menu.closeButtonElement);
        this.listener = function() {
            menu.closeButton.animate();
            menu.closeButton.removeListener();
            menu.numberOfCloudsInput.removeListener();
            menu.orbColorInput.removeListener();
            menu.openButton.addListener();
            menu.close();
        }
    }
}