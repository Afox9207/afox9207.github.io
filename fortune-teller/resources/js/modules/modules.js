export class GameContainer {
    constructor(height = 'auto', width = '100%', id = 'gameContainer', parentId = null) {
        this.createGameContainer(height, width, id, parentId);
    }
    createGameContainer(height, width, id, parentId) {
        const div = document.createElement('div');
        div.id = id;
        div.classList.add('gameContainer');
        div.style.width = width;
        div.style.height = height;
        parentId === null ? document.querySelector('main').insertBefore(div, document.getElementById('gameCode')) :
        document.getElementById(parentId).appendChild(div);
    }
}

export class Canvas {
    constructor(width = 300, height = 150, parentId = null, id = 'gameCanvas') {
        this.width = width;
        this.height = height;
        this.createCanvasElement(parentId, id);
    }
    createCanvasElement(parentId, id) {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.classList.add('gameCanvas');
        if (parentId === null) {
            document.querySelector('main').insertBefore(canvas, document.getElementById('gameCode'));
        } else {
            document.getElementById(parentId).appendChild(canvas);
        }
    }
}

export class RandomIntegerGenerator {
    constructor() {
        
    }
    generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export class RandomFloatingPointGenerator {
    constructor() {
        
    }
    generateNumber(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}