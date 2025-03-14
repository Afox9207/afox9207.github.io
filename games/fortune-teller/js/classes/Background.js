export class Background {
    constructor(main) {
        this.element = main.shadow.getElementById('background');
    }
    lightUp() {
        this.element.setAttribute('data-active', '');
    }
    darken() {
        this.element.removeAttribute('data-active');
    }
}