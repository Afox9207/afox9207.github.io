export class GameArea extends HTMLElement {
    constructor() {
        super();
        const src = this.getAttribute('src');
        const script = document.createElement('script');
        
        script.setAttribute('type', 'module');
        script.setAttribute('defer', '');
        script.setAttribute('src', src);
        
        this.append(script);
        this.attachShadow({mode: 'open'});
    }
}

customElements.define('game-area', GameArea);