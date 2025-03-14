import { Button } from "./Button.js";

export class CloseInfoButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('close-info-button');
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

                    main.info.close();

                    main.openInfoButton.addListeners();
                    main.openSettingsButton.addListeners();
                    main.askButton.addListeners();

                    this.removeListeners();
                }
            }
        ];
    }
}