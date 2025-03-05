import { Menu } from "./Menu.js";
import { NumberOfCloudsInput } from "./NumberOfCloudsInput.js";
import { OrbColorInput } from "./OrbColorInput.js";
import { DefaultButton } from "./DefaultButton.js";
import { OpenMenuButton } from "./OpenMenuButton.js";
import { CloseMenuButton } from "./CloseMenuButton.js";

export class Settings extends Menu {
    constructor(main) {
        super(main);
        const HTML = 
        `
        <div id='settings-container' class='menu-container menu-container--closed'>
            <div id='settings' class='menu'>
                <h2 class='menu-title'>Settings</h2>
                <hr>
                <div>
                    <label for='number-of-clouds-input'>Number of Clouds Per Cycle</label>
                    <div class='input-flex-group'>
                        <input id='number-of-clouds-input' class='input-flex-group__item' type='range' min='1' max='10' value='5'>
                        <span id='number-of-clouds-span' class='input-flex-group__item'></span>
                    </div>
                </div>
                <div>
                    <label for='orb-color-input'>Orb Color (1-360)</label>
                    <div class='input-flex-group'>
                        <input id='orb-color-input' class='input-flex-group__item' type='number' min='1' max='360' step='1' value='200'>
                        <span id='orb-color-input-span' class='orb-color-input-span'></span>
                    </div>
                </div>
                <div class='button-flex-group'>
                    <button id='settings-default-button' class='button' type='button'>Default</button>
                    <button id='settings-close-button' class='button' type='button'>Close</button>
                </div>
            </div>
        </div>
        `;
        const styles = 
        `
        .input-flex-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 32px;
        }
        .input-flex-group__item {
            height: auto;
        }
        .orb-color-input-span {
            display: block;
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: radial-gradient(var(--inner-color), var(--outer-color));
        }
        .button-flex-group {
            display: flex;
            justify-content: center;
            gap: 8px;
        }
        `;

        main.addHTML(HTML);
        main.addStyles(styles);

        const defaultButton = main.shadow.getElementById('settings-default-button');
        const openButton = main.shadow.getElementById('settings-button');
        const closeButton = main.shadow.getElementById('settings-close-button');
        
        this.menu = main.shadow.getElementById('settings-container');
        this.numberOfCloudsInput = new NumberOfCloudsInput(main);
        this.orbColorInput = new OrbColorInput(main);
        this.defaultButton = new DefaultButton(main, defaultButton);
        this.openButton = new OpenMenuButton(main, openButton, this);
        this.closeButton = new CloseMenuButton(main, closeButton, this);
    }
    get numberOfClouds() {
        return this.numberOfCloudsInput.value;
    }
    reset() {
        this.numberOfCloudsInput.reset();
        this.orbColorInput.reset();
    }
}