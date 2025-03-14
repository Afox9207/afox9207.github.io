import { Button } from "./Button.js";

export class FullscreenButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('fullscreen-button');
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
                    const container = main.shadow.getElementById('container');

                    if (!main.shadow.fullscreenElement) {
                        container.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }

                    this.button.removeAttribute('data-hover');
                }
            }
        ];
        this.addListeners();
    }
}