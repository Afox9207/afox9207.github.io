import { Input } from "./Input.js";

export class NumberOfCloudsInput extends Input {
    constructor(main) {
        super();
        this.input = main.shadow.getElementById('number-of-clouds-input');
        this.span = main.shadow.getElementById('number-of-clouds-span');
        
        this.defaultValue = this.input.value;
        this.value = this.input.value;
        this.span.innerText = this.input.value;

        this.listener = function() {
            main.settings.numberOfCloudsInput.changeValue();
        }
    }
    changeValue() {
        this.value = this.input.value;
        this.updateSpan();
    }
    reset() {
        this.value = this.defaultValue;
        this.input.value = this.value;
        this.updateSpan();
    }
    updateSpan() {
        this.span.innerText = this.value;
    }
}