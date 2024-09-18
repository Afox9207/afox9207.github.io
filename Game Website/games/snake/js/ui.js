export class UI {
    constructor(game) {
        this.game = game;
    }
    update(input) {
        // start Screen
        if (!this.game.gameHasStarted) {
            if (input.includes('Enter')) {
                this.game.gameHasStarted = true;
            }
        }
        if (this.game.gameIsOver) {
            if (input.includes('Enter')) {
                this.game.gameIsOver = false;
            }
        }
    
    }
    draw(ctx) {
        // start screen
        if (!this.game.gameHasStarted && !this.game.gameIsOver) {
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Press Enter to Start', this.game.width / 2, this.game.height / 2);
        }
        // draw score
        if (this.game.gameHasStarted || this.game.gameIsOver) {
            ctx.fillText('Score: ' + this.game.score, this.game.width - 128, 64);
        }
        // game is over
        if (this.game.gameIsOver) {
            ctx.fillText('Game Over, Press Enter to Play Again', this.game.width / 2, this.game.height / 2);
        }
    }
}