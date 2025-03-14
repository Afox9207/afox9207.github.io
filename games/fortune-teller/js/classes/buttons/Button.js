export class Button {
    constructor() {
        
    }
    animate() {
        this.button.setAttribute('data-active', '');
        setTimeout(() => {
            this.button.removeAttribute('data-active');
        }, 250);
    }
    addListeners() {
        this.listeners.forEach(listener => {
            this.button.addEventListener(listener.event, listener.function)
        });
    }
    removeListeners() {
        this.listeners.forEach(listener => {
            this.button.removeEventListener(listener.event, listener.function)
        });
    }
}