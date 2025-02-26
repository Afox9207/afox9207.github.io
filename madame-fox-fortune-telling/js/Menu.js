export class Menu {
    constructor(main) {
        this.main = main;
    }
    addStyles() {
        const styles = 
        `
            .menu-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: grid;
                place-content: center;
                z-index: 1;
                transition: opacity 250ms linear;
            }
            .menu{
                --margin-inline: 16px;

                border: 1px solid white;
                margin-inline: auto;
                padding: 16px;
                max-width: 80ch;
                width: calc(100vw - 2 * var(--margin-inline));
                border-radius: 8px;
                background: hsl(0 0 0 / 0.75);
                color: hsl(0 0 75);
            }
            .menu-container--closing {
                opacity: 0;
            }
            .menu-container--closed {
                display: none;
            }
            .bold {
                color: hsl(0 0 100);
                font-weight: 700;
            }
            .menu-form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
                row-gap: 16px;
                place-items: center;
                margin-top: 8px;
                padding: 16px;
                border: 1px solid white;
                border-radius: 4px;
            }
            .menu-form-grid div {
                display: grid;
                row-gap: 4px;
            }
        `;

        this.main.addStyles(styles);
    }
    open() {
        this.container.classList.remove('menu-container--closed');
        this.main.state.openMenu();
    }
    close() {
        this.container.classList.add('menu-container--closing');
        setTimeout(() => {
            this.container.classList.remove('menu-container--closing');
            this.container.classList.add('menu-container--closed');
        }, this.main.menuTransitionTime);
        this.main.state.closeMenu();
    }
}