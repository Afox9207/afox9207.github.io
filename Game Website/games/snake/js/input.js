export class InputHandler {
    constructor() {
        this.key = [];
        window.addEventListener('keydown', e => {
            if (    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter') {
                this.key = [e.key];
            }
        });
    }
}