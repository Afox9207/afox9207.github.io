const template = document.createElement('template');
template.innerHTML = 
`
<style>
    
</style>

<li>
    <a><slot></a>
</li>
`;

export class GameLink extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});        
        shadow.append(template.content.cloneNode(true));
        
        const href = this.getAttribute('href');
        const anchor = shadow.querySelector('a');

        anchor.setAttribute('href', href);
    }
}

customElements.define('game-link', GameLink);