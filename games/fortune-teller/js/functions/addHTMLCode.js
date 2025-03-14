export function addHTMLCode() {
    const shadow = document.querySelector('game-area').shadowRoot;
    const template = document.createElement('template');
    template.innerHTML = 
    `
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font: inherit;
            font-family: Arial, Helvetica, sans-serif;
            text-wrap: pretty;
            --webkit-tap-highlight-color: transparent;

            font-size: 62.5%;
            font-size: 1.6rem;
        }

        :host {
            --orb-hue: 225;
            --orb-transparency: 0.75;
            --orb-inner-color: hsl(var(--orb-hue) 100 90 / var(--orb-transparency));
            --orb-outer-color: hsl(var(--orb-hue) 100 10 / var(--orb-transparency));

            --text-color: #f2f2f2;
            --bold-text-color: #ffffff;

            --border-color: #ffffff;
            --border-radius: 0.4rem;

            --shadow-color: #000000;

            --menu-background-color: #000000;

            --button-background-color: rgba(0, 0, 0, 0.25);
            --active-button-background-color: #ffffff;
            --button-text-color: #ffffff;
            --active-button-text-color: #000000;

            --icon-color: #ffffff;

            --setting-value-background-color: hsl(0 0 10);
            
            --answer-color: #ffffff;

            --base-font-size: 1.6rem;
            --font-size-scale: 1.333;
            --font-size-sm: var(--base-font-size);
            --font-size-md: calc(var(--font-size-sm) * var(--font-size-scale));
            --font-size-lg: calc(var(--font-size-md) * var(--font-size-scale));
            --font-size-xl: calc(var(--font-size-lg) * var(--font-size-scale));
        }

        button {
            border: none;
            background: none;
        }
        .button {
            --transition-time: 100ms;
            --box-shadow-blur: 0.1rem;
            

            display: block;
            margin-inline: auto;
            border-radius: var(--border-radius);
            padding: 0.8rem 1.6rem;
            color: var(--button-text-color);
            background-color: var(--button-background-color);
            box-shadow:
                -0.1rem -0.1rem var(--box-shadow-blur) var(--border-color), 
                -0.1rem 0.1rem var(--box-shadow-blur) var(--border-color), 
                0.1rem -0.1rem var(--box-shadow-blur) var(--border-color), 
                0.1rem 0.1rem var(--box-shadow-blur) var(--border-color);
            transition: 
                background-color var(--transition-time) linear,
                color var(--transition-time) linear;
        }
        .button[data-hover] {
            cursor: pointer;
            background-color: var(--active-button-background-color);
            color: var(--active-button-text-color);
        }
        .button[data-active] {
            --animation-time: 250ms;

            animation-name: button-pulse;
            animation-duration: var(--animation-time);
            animation-timing-function: linear;
        }
        @keyframes button-pulse {
            0% {
                scale: 1;
            }
            50% {
                --box-shadow-blur: 0.4rem;
                
                scale: 1.1;
            }
            100% {
                scale: 1;
            }
        }

        .icon {
            --transition-time: 100ms;

            width: 3.2rem;
            height: 3.2rem;
            font-size: 0rem;
            fill: var(--icon-color);
            transition: scale var(--transition-time) linear;
        }
        .icon[data-hover] {
            cursor: pointer;
            scale: 1.1;
        }
        .icon svg {
            width: 100%;
            height: 100%;
        }

        .grid-flow {
            min-height: 100vh;
            min-height: 100dvh;
            display: grid;
            grid-template-rows: auto 1fr;
            padding: 1.6rem;
        }
            
        .background {
            --transition-time: 1000ms;
            --brightness: 0.7;

            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-image: url(./fortune-teller/images/background.jpg);
            filter: brightness(var(--brightness));
            transition: filter var(--transition-time) ease-in-out;    
        }
        .background[data-active] {
            --brightness: 1.2;
        }

        .ui-button-group {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.8rem;
        }

        .menu {
            --transition-time: 250ms;
            --margin-inline: 1.6rem;
            --padding: 1.6rem;

            position: absolute;
            z-index: 1;
            place-self: center;
            display: none;
            border: 0.1rem solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--padding);
            width: calc(100% - 2 * var(--margin-inline));
            max-width: 80ch; 
            background-color: var(--menu-background-color);
            color: var(--text-color);
            transition: opacity var(--transition-time) linear;
        }
        .menu[data-open] {
            display: grid;
            gap: 1.6rem;
        }
        .menu[data-closing] {
            opacity: 0;
        }
        .menu--fit-content {
            width: fit-content;
        }
        .menu h2 {
            padding-bottom: 1.6rem;
            border-bottom: 0.1rem solid var(--border-color);
            font-size: var(--font-size-md);
            font-weight: 700;
            color: var(--bold-text-color);
        }
        .menu em {
            font-weight: 700;
            color: var(--bold-text-color);
        }

        .main-content {
            --max-height: 51.2rem;
            --gap: 1.6rem;

            place-self: center;
            display: grid;
            grid-template-rows: auto 1fr auto;
            gap: var(--gap);
            height: 100%;
            max-height: var(--max-height);
        }

        .setting {
            display: grid;
            gap: 8px;
            align-items: center;
        }
        .setting-label {
            color: var(--bold-text-color);
            font-weight: 700;
        }

        #smoke-clouds-per-cycle-manual {
            display: flex;
            justify-content: space-between;
        }
        #smoke-clouds-per-cycle-select[data-inactive] {
            visibility: hidden;
        }

        .setting--orb-color {
            grid-template-areas: 
            'label label label display'
            'decrease value increase display';
        }
        #orb-color-label {
            grid-area: label;
        }
        #orb-color-decrease-button {
            grid-area: decrease;
        }
        #orb-color-increase-button {
            grid-area: increase;
        }
        #orb-color-value {
            grid-area: value;
            border-radius: var(--border-radius);
            padding: 0.8rem 1.6rem;
            background-color: var(--setting-value-background-color);
            color: var(--bold-text-color);
        }
        #orb-color-display {
            grid-area: display;
            aspect-ratio: 1 / 1;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, var(--orb-inner-color), var(--orb-outer-color));
        }

        .title {
            --shadow: -0.1rem;
            --transition-time: 1000ms;

            font-size: var(--font-size-xl);
            color: var(--bold-text-color);
            font-weight: 700;
            text-align: center;

            text-shadow:
                -0.1rem var(--shadow) var(--shadow-color),
                -0.1rem 0.1rem var(--shadow-color),
                0.1rem -0.1rem var(--shadow-color),
                0.1rem 0.1rem var(--shadow-color);
            transition: text-shadow var(--transition-time) ease-in-out;
        }
        .title[data-active] {
            --shadow: -0.4rem;
        }

        .orb {
            --diameter: 32rem;
            --box-shadow-blur: 0.1rem;
            --transition-time: 1000ms;

            position: relative;
            place-self: center;
            display: grid;
            width: var(--diameter);
            height: var(--diameter);
            margin-inline: auto;
            border-radius: 50%;
            background: radial-gradient(circle, var(--orb-inner-color), var(--orb-outer-color));
            box-shadow:
                -1px -1px var(--box-shadow-blur) var(--orb-outer-color),
                -1px 1px var(--box-shadow-blur) var(--orb-outer-color),
                1px -1px var(--box-shadow-blur) var(--orb-outer-color),
                1px 1px var(--box-shadow-blur) var(--orb-outer-color);
            transition: box-shadow var(--transition-time) ease-in-out;
            overflow: hidden;
        }
        .orb[data-active] {
            --box-shadow-blur: 3.2rem;
        }

        .answer {
            --transition-time: 1000ms;

            position: relative;
            place-self: center;
            z-index: -1;
            padding-inline: 1.6rem;
            text-align: center;
            font-size: var(--font-size-lg);
            color: var(--answer-color);
            font-weight: 700;
            scale: 0;
            opacity: 0;
            transition:
                scale var(--transition-time) linear,
                opacity var(--transition-time) linear;
        }
        .answer[data-active] {
            scale: 1;
            opacity: 1;
        }

        .canvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

    </style>

    <div id='container' class='grid-flow'>
        <div id='background' class='background'></div>
        
        <div class='ui-button-group'>
            <button id='open-info-button' class='icon' type='button'>
                Information
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                </svg>
            </button>
            <button id='open-settings-button' class='icon' type='button'>
                Settings
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                </svg>
            </button>
            <button id='fullscreen-button' class='icon' type='button'>
                Fullscreen
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/>
                </svg>
            </button>
        </div>

        <div id='info' class='menu'>
            <h2>How To Use</h2>
            <p>Madame Fox welcomes you and offers her services. Think of a <em>YES</em> or <em>NO</em>
            question, and then press the <em>ASK</em> button. She will use her mystical orb to answer
            the question that you seek.</p>
            <button id='close-info-button' class='button' type='button'>Close</button>
        </div>

        <div id='settings' class='menu menu--fit-content'>
            <h2>Settings</h2>

            <div class='setting'>
                <span class='setting-label'>Smoke Clouds Per Cycle</span>
                <div>
                    <label for='auto'>Auto</label>
                    <input id='auto-radio-button' type='radio' name='smoke-clouds-per-cycle' value='auto' checked>
                </div>
                <div id='smoke-clouds-per-cycle-manual'>
                    <div>    
                        <label for='manual'>Manual</label>
                        <input id='manual-radio-button' type='radio' name='smoke-clouds-per-cycle' value='manual'>
                    </div>
                    <select id='smoke-clouds-per-cycle-select' data-inactive>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                </div>
            </div>

            <div class='setting setting--orb-color'>
                <span id='orb-color-label' class='setting-label'>Orb Color (1 - 360)</span>
                <div id='orb-color-value'></div>
                <div id='orb-color-display'></div>
                <button id='orb-color-decrease-button' class='icon' type='button'>
                    Decrease
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3l0-57.7 96 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-96 0 0-57.7c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/>
                    </svg>
                </button>
                <button id='orb-color-increase-button' class='icon' type='button'>
                    Increase
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 151.2c-4.2-4.6-10.1-7.2-16.4-7.2C266 144 256 154 256 166.3l0 41.7-96 0c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l96 0 0 41.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.4-7.2l84-91c3.5-3.8 5.4-8.7 5.4-13.9s-1.9-10.1-5.4-13.9l-84-91z"/>
                    </svg>
                </button>
            </div>

            <button id='close-settings-button' class='button' type='button'>Close</button>
        </div>

        <div class='main-content'>
            <h1 id='title' class='title'>Madame Fox's Fortune Telling</h1>
            <div id='orb' class='orb'>
                <p id='answer' class='answer'></p>
                <canvas id='canvas' class='canvas'></canvas>
            </div>
            <button id='ask-button' class='button' type='button'>ASK</button>
        </div>
    </div>
    `;

    shadow.append(template.content.cloneNode(true));
}