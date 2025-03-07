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
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            z-index: -1;
            background-image: url(./madame-fox-fortune-telling/images/background.jpg);
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