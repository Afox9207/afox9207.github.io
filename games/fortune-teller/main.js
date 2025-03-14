import { addHTMLCode } from "./js/functions/addHTMLCode.js";
import { startAnimating } from "./js/functions/startAnimating.js";

import { Menu } from "./js/classes/menus/Menu.js";

import { OpenInfoButton } from "./js/classes/buttons/OpenInfoButton.js";
import { CloseInfoButton } from "./js/classes/buttons/CloseInfoButton.js";

import { FullscreenButton } from "./js/classes/buttons/FullscreenButton.js";

import { OpenSettingsButton } from "./js/classes/buttons/OpenSettingsButton.js";
import { CloseSettingsButton } from "./js/classes/buttons/CloseSettingsButton.js";
import { SmokeCloudsPerCycleSetting } from "./js/classes/menus/SmokeCloudsPerCycleSetting.js";
import { OrbColorSetting } from "./js/classes/menus/OrbColorSetting.js";

import { Orb } from "./js/classes/orb/Orb.js";

import { AskButton } from "./js/classes/buttons/AskButton.js";

class Main {
    constructor() {
        const shadow = document.querySelector('game-area').shadowRoot;
        const info = shadow.getElementById('info');
        const settings = shadow.getElementById('settings');

        this.shadow = shadow;

        this.info = new Menu(info);
        this.openInfoButton = new OpenInfoButton(this);
        this.closeInfoButton = new CloseInfoButton(this);

        this.fullscreenButton = new FullscreenButton(this);

        this.settings = new Menu(settings);
        this.openSettingsButton = new OpenSettingsButton(this);
        this.closeSettingsButton = new CloseSettingsButton(this);
        this.smokeCloudsPerCycleSetting = new SmokeCloudsPerCycleSetting(this);
        this.orbColorSetting = new OrbColorSetting(this);

        this.orb = new Orb(this);

        this.askButton = new AskButton(this);
    }
}

addHTMLCode();
const main = new Main();
startAnimating(main);
