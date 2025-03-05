export class OrbColorInput {
    constructor(main) {
        this.main = main;
        this.input = main.shadow.getElementById('orb-color-input');
        this.span = main.shadow.getElementById('orb-color-input-span');
        this.defaultHue = main.orb.hue;

        this.input.addEventListener('input', () => {
            this.changeValue();
        });
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