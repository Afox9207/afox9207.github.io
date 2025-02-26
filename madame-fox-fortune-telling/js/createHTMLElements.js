export function createHTMLElements() {
    const gameArea = document.getElementById('game-area');
    const shadow = gameArea.attachShadow({mode: 'open'});
    const template = document.createElement('template');

    template.innerHTML = 
    `
    <style id='style'>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font: inherit;
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>

    <div id='game-container' class='game-container'>
        <div class='button-container'>
            <button id='info-button' class='icon-button' type='button'></button>
            <button id='settings-button' class='icon-button' type='button'></button> 
        </div>
        <div id='info-container' class='menu-container menu-container--closed'>
            <div id='info' class='menu'></div>
        </div>
        <div id ='settings-container' class='menu-container menu-container--closed'>
            <div id='settings' class='menu'></div>
        </div>
        <div id='background' class='background'></div>
        <div id='orb' class='orb'>
        <p id='answer' class='answer'></p>
        <canvas id='canvas' class='canvas'></canvas>
        </div>
        <button id='ask-button' class='button' type='button'>ASK</button>
    </div>
    `;

    shadow.append(template.content.cloneNode(true));
}