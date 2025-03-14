import { Button } from "./Button.js";

export class AskButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('ask-button');
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

                    main.orb.activate();

                    this.removeListeners();
                }
            }
        ];
        this.addListeners();
    }
}