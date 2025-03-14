import { Button } from "./Button.js";

export class OpenInfoButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('open-info-button');
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
                    main.info.open();
                    this.button.removeAttribute('data-hover');

                    main.closeInfoButton.addListeners();
                    
                    this.removeListeners();
                    main.openSettingsButton.removeListeners();
                    main.askButton.removeListeners();
                }
            }
        ];
        this.addListeners();
    }
}