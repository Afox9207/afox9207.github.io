import { Input } from "./Input.js";

export class OrbColorInput extends Input {
    constructor(main) {
        super();
        this.main = main;
        this.input = main.shadow.getElementById('orb-color-input');
        this.span = main.shadow.getElementById('orb-color-input-span');
        this.defaultHue = main.orb.hue;

        this.reset();

        this.listener = function() {
            main.settings.orbColorInput.changeValue();
        }
    }
    changeValue() {
        const hue = this.input.value;
        this.main.orb.setColor(hue);
    }
    reset() {
        this.input.value = this.defaultHue;
        this.main.orb.setColor(this.defaultHue);
    }
}