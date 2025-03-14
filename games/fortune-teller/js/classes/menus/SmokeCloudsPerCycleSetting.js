import { Button } from "../buttons/Button.js"

export class SmokeCloudsPerCycleSetting {
    constructor(main) {
        this.choice = 'auto';
        this.value = 1;
        this.autoRadioButton = new AutoRadioButton(main);
        this.manualRadioButton = new ManualRadioButton(main);
        this.select = new Select(main);
    }
}

class AutoRadioButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('auto-radio-button');
        this.listeners = [
            {
                event: 'click',
                function: () => {
                    main.smokeCloudsPerCycleSetting.choice = this.button.value;
                    main.smokeCloudsPerCycleSetting.select.makeInactive();
                }
            }
        ];
    }
}

class ManualRadioButton extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('manual-radio-button');
        this.listeners = [
            {
                event: 'click',
                function: () => {
                    main.smokeCloudsPerCycleSetting.choice = this.button.value;
                    main.smokeCloudsPerCycleSetting.select.makeActive();
                }
            }
        ];
    }
}

class Select extends Button {
    constructor(main) {
        super();
        this.button = main.shadow.getElementById('smoke-clouds-per-cycle-select');
        this.listeners = [
            {
                event: 'input',
                function: () => {
                    main.smokeCloudsPerCycleSetting.value = this.button.value;
                }
            }
        ];
    }
    makeActive() {
        this.button.removeAttribute('data-inactive');
    }
    makeInactive() {
        this.button.setAttribute('data-inactive', '');
    }
}