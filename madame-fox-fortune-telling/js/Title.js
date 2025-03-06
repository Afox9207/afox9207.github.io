export class Title {
    constructor(main) {
        const marginBottom = '32px';

        this.defaultYOffset = 0;
        this.newYOffset = -4;

        const styles = 
        `
        .title {
            margin-bottom: ${marginBottom};
            font-size: 40px;
            text-align: center;
            font-weight: 700;
            color: ${main.styles.boldTextColor};
            text-shadow:
            -1px -1px black,
            -1px 1px black,
            1px -1px black,
            1px 1px black,
            0px ${this.defaultYOffset}px black;
            transition: text-shadow ${main.styles.titleTransitionTime}ms ease-in-out;
        }
        .title--active {
            text-shadow:
            -1px -1px black,
            -1px 1px black,
            1px -1px black,
            1px 1px black,
            0px ${this.newYOffset}px black;
        }
        `;
        main.addStyles(styles);

        this.title = main.shadow.getElementById('title');
    }
    lightUp() {
        this.title.classList.add('title--active');
    }
    darken() {
        this.title.classList.remove('title--active');
    }
}