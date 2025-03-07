export class Input {
    constructor() {

    }
    addListener() {
        this.input.addEventListener('input', this.listener);
    }
    removeListener() {
        this.input.removeEventListener('input', this.listener);
    }
}