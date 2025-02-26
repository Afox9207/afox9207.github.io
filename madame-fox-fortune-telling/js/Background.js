export class Background {
    constructor(main) {
        const transitionTime = 1500;
        const defaultBrightness = .5;
        const newBrightness = 1.25;
        const styles = 
        `
        .background {
            position: absolute;
            left: 0;
            top: 0;
            background-image: url(/madame-fox-fortune-telling/images/background.jpg);
            filter: brightness(${defaultBrightness});
            transition: filter ${transitionTime}ms linear;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .background--light-up {
            filter: brightness(${newBrightness});
        }
        `;

        main.addStyles(styles)

        this.background = main.shadow.getElementById('background');
    }
    lightUp() {
        this.background.classList.add('background--light-up');
    }
    darken() {
        this.background.classList.remove('background--light-up');
    }
}