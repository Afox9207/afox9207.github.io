export class Menu {
    constructor(main) {
        const marginInline = '16px';
        const padding = '16px';

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
            transition: opacity ${main.styles.menuTransitionTime}ms linear;
        }
        .menu-container--closing {
            opacity: 0;
        }
        .menu-container--closed {
            display: none;
        }
        .menu {
            margin-inline: ${marginInline};
            padding: ${padding};
            border: 1px solid ${main.styles.borderColor};
            border-radius: ${main.styles.borderRadius};
            max-width: 75ch;
            background-color: ${main.styles.backgroundColor};
            color: ${main.styles.textColor};
        }
        .menu-title {
            font-size: 20px;
            font-weight: 700;
            color: ${main.styles.boldTextColor};
        }
        hr {
            margin-block: 8px;
        }
        .menu em {
            color: ${main.styles.boldTextColor};
            font-weight: 700;
        }
        `;

        main.addStyles(styles);

        this.main = main;
        this.isActive = false;
    }
    open() {
        this.menu.classList.remove('menu-container--closed');
    }
    close() {
        this.menu.classList.add('menu-container--closing');
        setTimeout(() => {
            this.menu.classList.remove('menu-container--closing');
            this.menu.classList.add('menu-container--closed');
        }, this.main.styles.menuTransitionTime);
    }
}