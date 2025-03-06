export class Background {
    constructor(main) {
        const defaultBrightness = 0.7;
        const newBrightness = 1.2;

        const HTML = 
        `
        <div id='background' class='background'></div>
        `;
        const styles = 
        `
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url(./madame-fox-fortune-telling/images/background.jpg);
            z-index: -1;
            filter: brightness(${defaultBrightness});
            transition: filter ${main.styles.backgroundTransitionTime}ms ease-in-out;
        }
        .background--lit-up {
            filter: brightness(${newBrightness});
        }
        `;

        main.addHTML(HTML);
        main.addStyles(styles);

        this.background = main.shadow.getElementById('background');
    }
    lightUp() {
        this.background.classList.add('background--lit-up');
    }
    darken() {
        this.background.classList.remove('background--lit-up');

    }
}