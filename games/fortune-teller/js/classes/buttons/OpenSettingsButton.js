import { Button } from "./Button.js";

export class OpenSettingsButton extends Button{
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('open-settings-button');
        this.listeners = [
            {
                event: 'mouseenter',
                function: () => {
                    this.button.setAttribute('data-hover', '');
                }
            },
            {
                event: 'mouseleave',
                function: () => {
                    this.button.removeAttribute('data-hover');
                }
            },
            {
                event: 'click',
                function: () => {
                    main.settings.open();
                    this.button.removeAttribute('data-hover');

                    main.smokeCloudsPerCycleSetting.autoRadioButton.addListeners();
                    main.smokeCloudsPerCycleSetting.manualRadioButton.addListeners();
                    main.smokeCloudsPerCycleSetting.select.addListeners();
                    main.orbColorSetting.decreaseButton.addListeners();
                    main.orbColorSetting.increaseButton.addListeners();
                    main.closeSettingsButton.addListeners();

                    this.removeListeners();
                    main.openInfoButton.removeListeners();
                    main.askButton.removeListeners();
                }
            }
        ];
        this.addListeners();
    }
}