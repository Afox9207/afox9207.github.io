import { Button } from './Button.js';

export class SettingsButton extends Button {
    constructor(menu) {
        super(menu.main, menu.openButtonElement);
        this.listener = function() {
            menu.openButton.removeListener();
            menu.closeButton.addListener();
            menu.defaultButton.addListener();
            menu.numberOfCloudsInput.addListener();
            menu.orbColorInput.addListener();
            menu.open();
        }
        this.addListener();
    }
}