import { Button } from "../buttons/Button.js";

export class OrbColorSetting {
    constructor(main) {
        const defaultValue = getComputedStyle(main.shadow.host).getPropertyValue('--orb-hue');

        this.inputIntervalTime = 1000 / 15;
        this.defaultValue = defaultValue;
        this.value = this.defaultValue;
        this.minValue = 1;
        this.maxValue = 360;
        
        this.valueElement = main.shadow.getElementById('orb-color-value');
        this.decreaseButton = new DecreaseButton(main);
        this.increaseButton = new IncreaseButton(main);
        
        this.main = main;
        this.update();
    }
    update() {
        this.valueElement.innerText = this.value;
        this.main.shadow.host.style.setProperty('--orb-hue', this.value);
    }
}

class DecreaseButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('orb-color-decrease-button');
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
                event: 'mousedown',
                function: () => {
                    this.interval = setInterval(() => {
                        if (main.orbColorSetting.value > main.orbColorSetting.minValue) {
                            --main.orbColorSetting.value;
                            main.orbColorSetting.update();
                        }
                    }, main.orbColorSetting.inputIntervalTime);
                }
            },
            {
                event: 'mouseup',
                function: () => {
                    clearInterval(this.interval);
                }
            }
        ];
    }
}

class IncreaseButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('orb-color-increase-button');
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
                event: 'mousedown',
                function: () => {
                    this.interval = setInterval(() => {
                        if (main.orbColorSetting.value < main.orbColorSetting.maxValue) {
                            ++main.orbColorSetting.value;
                            main.orbColorSetting.update();
                        }
                    }, main.orbColorSetting.inputIntervalTime);
                }
            },
            {
                event: 'mouseup',
                function: () => {
                    clearInterval(this.interval);
                }
            }
        ];
    }
}