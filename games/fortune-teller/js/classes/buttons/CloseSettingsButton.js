import { Button } from "./Button.js";

export class CloseSettingsButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('close-settings-button');
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
                    this.animate();
                    this.button.removeAttribute('data-hover');

                    main.settings.close();

                    main.openInfoButton.addListeners();
                    main.openSettingsButton.addListeners();
                    main.askButton.addListeners();

                    this.removeListeners();
                    main.orbColorSetting.autoRadioButton.removeListeners();
                    main.orbColorSetting.manualRadioButton.removeListeners();
                    main.orbColorSetting.select.removeListeners();
                    main.orbColorSetting.decreaseButton.removeListeners();
                    main.orbColorSetting.increaseButton.removeListeners();
                }
            }
        ];
        
    }
}