export class Button {
    constructor(main, button) {
        const padding = '8px 16px';
        const marginTop = '16px';
        const boxShadowBlur = '1px';
        const activeBoxShadowBlur = '4px'; 

        const styles = 
        `
        .button {
            display: block;
            margin-top: ${marginTop};
            padding: ${padding};
            border: 1px solid ${main.styles.borderColor};
            border-radius: ${main.styles.borderRadius};
            cursor: pointer;
            background-color: ${main.styles.backgroundColor};
            color: ${main.styles.boldTextColor};
            transition: background-color ${main.styles.buttonTransitionTime}ms linear;
        }
        .button:hover {
            background-color: ${main.styles.activeBackgroundColor};
        }
        .button--active {
            animation-name: pulse;
            animation-timing-function: linear;
            animation-duration: ${main.styles.buttonAnimationTime}ms;
        }
        .button--center {
            margin-inline: auto;
        }
        .icon-button {
            border: none;
            width: 32px;
            height: 32px;
            cursor: pointer;
            background-color: transparent;
            transition: scale ${main.styles.buttonTransitionTime}ms linear;
        }
        .icon-button:hover {
            scale: 1.05;
        }
        .icon-button svg {
            width: 100%;
            height: 100%;
            fill: white;
        }
        @keyframes pulse {
            0% {
                box-shadow:
                -1px -1px ${boxShadowBlur},
                -1px 1px ${boxShadowBlur},
                1px -1px ${boxShadowBlur},
                1px 1px ${boxShadowBlur};
                scale: 1;
            }
            50% {
                box-shadow:
                -1px -1px ${activeBoxShadowBlur},
                -1px 1px ${activeBoxShadowBlur},
                1px -1px ${activeBoxShadowBlur},
                1px 1px ${activeBoxShadowBlur};
                scale: 1.05;
            }
            100% {
                box-shadow:
                -1px -1px ${boxShadowBlur},
                -1px 1px ${boxShadowBlur},
                1px -1px ${boxShadowBlur},
                1px 1px ${boxShadowBlur};
                scale: 1;
            }
        }
        `;

        main.addStyles(styles);

        this.main = main;
        this.button = button;
    }
    animate() {
        this.button.classList.add('button--active');
        setTimeout(() => {
            this.button.classList.remove('button--active');
        }, this.main.styles.buttonAnimationTime);
    }
    addListener() {
        this.button.addEventListener('click', this.listener);
    }
    removeListener() {
        this.button.removeEventListener('click', this.listener);
    }
}