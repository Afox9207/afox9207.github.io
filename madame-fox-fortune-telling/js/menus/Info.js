import { Menu } from "./Menu.js";
import { InfoButton } from "../buttons/InfoButton.js";
import { InfoCloseButton } from "../buttons/InfoCloseButton.js";

export class Info extends Menu {
    constructor(main) {
        super(main);
        const HTML = 
        `
        <div id='info-container' class='menu-container menu-container--closed'>
            <div class='menu'>
                <h2 class='menu-title'>How To Use</h2>
                <p>
                    Madame Fox welcomes you, and offers her services. 
                    Think of a <em>YES</em> or <em>NO</em> question and press the <em>ASK</em> button.
                    She will use her mystical orb and answer the question that you seek.
                </p>
                <button id='info-close-button' class='button button--center' type='button'>Close</button>
            </div>
        </div>
        `;
        
        main.addHTML(HTML);
        
        this.menuElement = main.shadow.getElementById('info-container');
        this.openButtonElement = main.shadow.getElementById('info-button');
        this.closeButtonElement = main.shadow.getElementById('info-close-button');

        this.openButton = new InfoButton(this);
        this.closeButton = new InfoCloseButton(this);
    }
}