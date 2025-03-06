import { Menu } from "./Menu.js";
import { NumberOfCloudsInput } from "../inputs/NumberOfCloudsInput.js";
import { OrbColorInput } from "../inputs/OrbColorInput.js";
import { DefaultButton } from "../buttons/DefaultButton.js";
import { SettingsButton } from "../buttons/SettingsButton.js";
import { SettingsCloseButton } from "../buttons/SettingsCloseButton.js";


export class Settings extends Menu {
    constructor(main) {
        super(main);
        const HTML = 
        `
        <div id='settings-container' class='menu-container menu-container--closed'>
            <div id='settings' class='menu'>
                <h2 class='menu-title'>Settings</h2>
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
                        <input id='orb-color-input' class='input-flex-group__item' type='number' min='1' max='360' step='1'>
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

        this.defaultButtonElement = main.shadow.getElementById('settings-default-button');
        this.openButtonElement = main.shadow.getElementById('settings-button');
        this.closeButtonElement = main.shadow.getElementById('settings-close-button');
        
        this.menuElement = main.shadow.getElementById('settings-container');
        this.numberOfCloudsInput = new NumberOfCloudsInput(main);
        this.orbColorInput = new OrbColorInput(main);
        this.defaultButton = new DefaultButton(this);
        this.openButton = new SettingsButton(this);
        this.closeButton = new SettingsCloseButton(this);
    }
    get numberOfClouds() {
        return this.numberOfCloudsInput.value;
    }
    reset() {
        this.numberOfCloudsInput.reset();
        this.orbColorInput.reset();
    }
}