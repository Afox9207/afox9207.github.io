export class Menu {
    constructor(menu) {
        this.menu = menu;
    }
    open() {
        this.menu.setAttribute('data-open', '')
    }
    close() {
        this.menu.setAttribute('data-closing', '');
        setTimeout(() => {
            this.menu.removeAttribute('data-closing');
            this.menu.removeAttribute('data-open');
        }, 250);
    }
}