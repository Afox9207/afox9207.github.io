export class Button {
    constructor(main) {
        this.main = main;
    }
    addStyles() {
        const transitionTime = 100;
        const borderRadius = 4;
        const boxShadowColor = 'white';
        const defaultBoxShadowBlur = 0;
        const newBoxShadowBlur = 3;

        const styles = 
        `
        .button-container {
            display: flex;
            justify-content: flex-end;
            gap: 16px;
        }
        .button {
            display: block;
            margin-inline: auto;
            margin-top: 16px;
            padding: 8px 16px;
            scale: 1;
            border: 1px solid ${boxShadowColor};
            border-radius: ${borderRadius}px;
            background: rgba(0, 0, 0, 0);
            color: rgba(255, 255, 255, 1);
            cursor: pointer;
            transition: background ${transitionTime}ms linear;
        }
        .icon-button {
            padding: 0;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            background: transparent;
            cursor: pointer;
            transition: scale ${transitionTime}ms linear;
        }
        .icon-button:hover {
            scale: 1.1;
        }
        .icon {
            fill: white;
        }
        .button:hover {
            background: rgba(0, 0, 0, 1);
        }
        .button--active {
            animation-name: pulse;
            animation-duration: ${this.main.buttonAnimationDuration}ms;
        }
        @keyframes pulse {
            0% {
                scale: 1;
                box-shadow:
                -1px -1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                -1px 1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                1px -1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                1px 1px ${defaultBoxShadowBlur}px ${boxShadowColor};
            }
            50% {
                scale: 1.05;
                box-shadow:
                -1px -1px ${newBoxShadowBlur}px ${boxShadowColor},
                -1px 1px ${newBoxShadowBlur}px ${boxShadowColor},
                1px -1px ${newBoxShadowBlur}px ${boxShadowColor},
                1px 1px ${newBoxShadowBlur}px ${boxShadowColor};
            }
            100% {
                scale: 1;
                box-shadow:
                -1px -1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                -1px 1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                1px -1px ${defaultBoxShadowBlur}px ${boxShadowColor},
                1px 1px ${defaultBoxShadowBlur}px ${boxShadowColor};
            }
        }
        `;

        this.main.addStyles(styles);
    }
    toggleActiveClass() {
        this.button.classList.add('button--active');
        setTimeout(() => {
            this.button.classList.remove('button--active');
        }, this.main.buttonAnimationDuration);
    }
}