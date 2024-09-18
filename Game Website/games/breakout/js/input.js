export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   (e.key === 'ArrowLeft' && !this.keys.includes('ArrowRight')) ||
                    (e.key === 'ArrowRight' && !this.keys.includes('ArrowLeft')) ||
                    e.key === 'Enter'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } 
        });
        window.addEventListener('keyup', e => {
            if ((   e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'
                ) && this.keys.indexOf(e.key !== -1)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}