'use strict';

const template = document.createElement('template');
template.innerHTML = 
`
<li>
    <a><slot></a>
</li>
`;

export class GameLink extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(template.content.cloneNode(true));
        
        // get href from custom element
        const gameLink = document.querySelector('game-link');
        const href = gameLink.getAttribute('href');
        // set anchor href
        const anchor = shadow.querySelector('a');
        anchor.setAttribute('href', href);
    }
}

customElements.define('game-link', GameLink);