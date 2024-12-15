'use strict';

import { CardDeck } from "../../../../resources/js/modules/modules.js";

const gameContainer = {
    element: document.getElementById('game'),
    style: function() {
        this.element.style.position = 'relative';
    }
};

const title = {
    marginTop: 16,
    marginBottom: 16,
    create: function() {
        const h1 = document.createElement('h1');
        h1.textContent = 'Can I guess Your Card?';
        gameContainer.element.appendChild(h1);
        this.element = h1;
    },
    style: function() {
        gameContainer.element.style.paddingTop = this.marginTop + 'px';
        this.element.style.marginBottom = this.marginBottom + 'px';
        this.element.style.textAlign = 'center';
        this.element.style.fontSize = '32px';
        this.element.style.fontWeight = '700';
    }
};

const text = {
    transitionTime: 1000,
    texts: [
        'After three questions, I will guess your card. Click or touch anywhere to continue',
        'Pick any card and remember it. Which column is it in?',
        'Now which column is it in',
        'One last time, which column is it in',
        `Now to spell out the Magic Words 'Hocus Pocus'`,
        'Try Again?'
    ],
    create: function() {
        const p = document.createElement('p');
        gameContainer.element.appendChild(p);
        this.element = p;
        p.textContent = this.texts[0];
    },
    style: function() {
        this.element.style.fontSize = '16px';
        this.element.style.textAlign = 'center';
        this.element.style.transition = `opacity ${this.transitionTime}ms linear`;
    },
    setOpacity: function(opacity) {
        this.element.style.opacity = opacity;
    },
    write: function(string) {
        this.setOpacity(0);
        setTimeout(() => {
            this.setOpacity(1);
            this.element.textContent = string;
        }, this.transitionTime);

    }
};

const drawPile = {
    top: 32,
    right: 32,
    create: function() {
        const div = document.createElement('div');
        gameContainer.element.appendChild(div);
        this.element = div;
    },
    style: function(width) {
        this.element.style.position = 'absolute';
        this.element.style.top = this.top + 'px';
        this.element.style.right = this.right + 'px';
        this.element.style.aspectRatio = '5 / 7';
        this.element.style.width = width + 'px';
        this.element.style.transition = `opacity ${text.transitionTime}ms linear`;
    }
};

class CardColumn {
    constructor(column) {
        this.column = column;
        this.cards = [];
    }
}

const cardColumns = {
    marginTop: 16,
    marginBottom: 16,
    gap: 16,
    columns: [],
    create: function() {
        const flex = document.createElement('flex');
        gameContainer.element.appendChild(flex);
        this.flex = flex;
        for (let i = 0; i < 3; ++i) {
            const column = document.createElement('div');
            this.flex.appendChild(column);
            this.columns.push(new CardColumn(column));
        }
    },
    style: function(cardWidth) {
        this.flex.style.display = 'flex';
        this.flex.style.justifyContent = 'center';
        this.flex.style.marginTop = this.marginTop + 'px';
        this.flex.style.marginBottom = this.marginBottom + 'px';
        this.flex.style.gap = this.gap + 'px';
        this.columns.forEach(item => {
            item.column.style.width = cardWidth + 'px';
            item.column.style.height = cardStacks.stackOffSet * 6 + cardWidth * (7 / 5) + 'px';
            item.column.style.zIndex = '7';
            item.column.style.cursor = 'pointer';
        });
    }
};

const cardStacks = {
    cardPadding: 16,
    transitionTime: 100,
    stackOffSet: 48,
    drawPile: [],
    stackOne: [],
    stackTwo: [],
    stackThree: [],
    appendCardsToContainer: function() {
        for (let i = 20; i >= 0; --i) {
            gameContainer.element.appendChild(this.drawPile[i].space);
            this.drawPile[i].space.style.position = 'absolute';
        }
    },
    setTransitions: function() {
        this.drawPile.forEach(card => {
            card.space.style.transition = `top ${this.transitionTime}ms linear, left ${this.transitionTime}ms linear`;
        });
    },
    placeInDrawPile: function(cardStack) {
        const topPos = drawPile.element.offsetTop;
        const leftPos = drawPile.element.offsetLeft + this.cardPadding;
        for (let i = cardStack.length - 1; i >= 0; --i) {
            cardStack[i].space.style.left = leftPos + 'px';
            cardStack[i].space.style.top = topPos + 'px';
        }
        
    },
    putCardsInStackArrays: function() {
        this.drawPile.forEach((card, index) => {
            if (index % 3 === 2) {
                this.stackThree.push(this.drawPile[index]);
            } else if (index % 3 === 1) {
                this.stackTwo.push(this.drawPile[index]);
            } else {
                this.stackOne.push(this.drawPile[index]);
            }
        });
        this.drawPile = [];
    },
    moveCardsToStacks: function() {
        const topPos = cardColumns.columns[0].column.offsetTop;
        const columnOneLeftPos = cardColumns.columns[0].column.offsetLeft;
        const columnTwoLeftPos = cardColumns.columns[1].column.offsetLeft;
        const columnThreeLeftPos = cardColumns.columns[2].column.offsetLeft;
        for (let i = 0; i < 7; ++i) {
            setTimeout(() => {
                this.stackOne[i].space.style.left = columnOneLeftPos + 'px';
                this.stackOne[i].space.style.top = topPos + this.stackOffSet * i + 'px';
                this.stackOne[i].space.style.zIndex = i;
                deck.flipCard(this.stackOne[i]);
                setTimeout(() => {
                    this.stackTwo[i].space.style.left = columnTwoLeftPos + 'px';
                    this.stackTwo[i].space.style.top = topPos + this.stackOffSet * i + 'px';
                    this.stackTwo[i].space.style.zIndex = i;
                    deck.flipCard(this.stackTwo[i]);
                }, this.transitionTime);
                setTimeout(() => {
                    this.stackThree[i].space.style.left = columnThreeLeftPos + 'px';
                    this.stackThree[i].space.style.top = topPos + this.stackOffSet * i + 'px';
                    this.stackThree[i].space.style.zIndex = i;
                    deck.flipCard(this.stackThree[i]);
                }, this.transitionTime * 2);
            }, i * 3 * this.transitionTime);
        }
    },
    slideCardsIntoPile: function(stack) {
        stack.forEach(card => {
            card.space.style.top = cardColumns.columns[0].column.offsetTop + 'px';
            deck.flipCard(card);
        });
    },
    putStacksBackIntoDrawPileArray: function(stackOne, stackTwo, stackThree) {
        stackOne.forEach(card => {
            this.drawPile.push(card);
        });
        stackTwo.forEach(card => {
            this.drawPile.push(card);
        });
        stackThree.forEach(card => {
            this.drawPile.push(card);
        });
        this.stackOne = [];
        this.stackTwo = [];
        this.stackThree = [];
    },
    sendBackToDrawPile: function(columnNumber) {
        let firstPile;
        let secondPile;
        let thirdPile;
        switch (columnNumber) {
            case 1:
                firstPile = this.stackThree;
                secondPile = this.stackOne;
                thirdPile = this.stackTwo;
                break;
            case 2:
                firstPile = this.stackOne;
                secondPile = this.stackTwo;
                thirdPile = this.stackThree;
                break;
            case 3:
                firstPile = this.stackTwo;
                secondPile = this.stackThree;
                thirdPile = this.stackOne;
                break;
        }
        this.putStacksBackIntoDrawPileArray(firstPile, secondPile, thirdPile);
        this.slideCardsIntoPile(firstPile);
        setTimeout(() => {
            this.placeInDrawPile(firstPile);
        }, this.transitionTime);
        setTimeout(() => {
            this.slideCardsIntoPile(secondPile);
            setTimeout(() => {
                this.placeInDrawPile(secondPile);
            }, this.transitionTime);
        }, this.transitionTime * 2);
        setTimeout(() => {
            this.slideCardsIntoPile(thirdPile);
            setTimeout(() => {
                this.placeInDrawPile(thirdPile);
            }, this.transitionTime);
        }, this.transitionTime * 4);
    },
    guessCard: function() {
        const columnHeight = parseInt(window.getComputedStyle(cardColumns.columns[0].column).height, 10);
        const middlePos = cardColumns.columns[0].column.offsetTop + columnHeight / 2;
        const leftPos = cardColumns.columns[1].column.offsetLeft;
        cardStacks.drawPile[10].space.style.left = leftPos + 'px';
        cardStacks.drawPile[10].space.style.top = middlePos + 'px';
        deck.flipCard(cardStacks.drawPile[10]);
    }
};

const eventListeners = {
    addContinueListeners: function() {
        gameContainer.element.addEventListener('mousedown', () => {
            gameLogic.handleContinue(true);
        });
        gameContainer.element.addEventListener('mouseup', () => {
            gameLogic.handleContinue(false);
        });
    },
    addColumnOneListeners: function() {
        cardColumns.columns[0].column.addEventListener('mousedown', () => {
            gameLogic.handleColumnSelection(true, 1)
        });
        cardColumns.columns[0].column.addEventListener('mouseup', () => {
            gameLogic.handleColumnSelection(false);
        });
    },
    addColumnTwoListeners: function() {
        cardColumns.columns[1].column.addEventListener('mousedown', () => {
            gameLogic.handleColumnSelection(true, 2)
        });
        cardColumns.columns[1].column.addEventListener('mouseup', () => {
            gameLogic.handleColumnSelection(false);
        });
    },
    addColumnThreeListeners: function() {
        cardColumns.columns[2].column.addEventListener('mousedown', () => {
            gameLogic.handleColumnSelection(true, 3)
        });
        cardColumns.columns[2].column.addEventListener('mouseup', () => {
            gameLogic.handleColumnSelection(false);
        });
    },
    add: function() {
        this.addContinueListeners();
        this.addColumnOneListeners();
        this.addColumnTwoListeners();
        this.addColumnThreeListeners();
    }
};

const gameLogic = {
    continuePresses: 0,
    columnPresses: 0,
    handleContinue: function(isMouseDown) {
        if (!isMouseDown) {
            if (this.continuePresses === 0) {
                deck.shuffle();
                deck.draw(cardStacks.drawPile, 21);
                deck.deck.forEach(card => deck.flipCard(card));
                cardStacks.placeInDrawPile(cardStacks.drawPile);
                cardStacks.setTransitions();
                cardStacks.appendCardsToContainer();
                cardStacks.putCardsInStackArrays();
                cardStacks.moveCardsToStacks();
                text.write(text.texts[1]);
                ++this.continuePresses;
            } else if (this.continuePresses === 1 && this.columnPresses === 1) {
                cardStacks.putCardsInStackArrays();
                text.write(text.texts[2]);
                setTimeout(() => {
                    cardStacks.moveCardsToStacks();
                    ++this.continuePresses;
                }, cardStacks.transitionTime * 6);
            } else if (this.continuePresses === 2 && this.columnPresses === 2) {
                cardStacks.putCardsInStackArrays();
                text.write(text.texts[3]);
                setTimeout(() => {
                    cardStacks.moveCardsToStacks();
                    ++this.continuePresses;
                }, cardStacks.transitionTime * 6);
            } else if (this.continuePresses === 3 && this.columnPresses === 3) {
                text.write(text.texts[4]);
                ++this.continuePresses;
            } else if (this.continuePresses === 4) {
                text.write(`Your card is the ${cardStacks.drawPile[10].value} of ${cardStacks.drawPile[10].suit}`);
                cardStacks.guessCard();
                ++this.continuePresses;
            } else if (this.continuePresses === 5) {
                text.write(text.texts[5]);
                deck.flipCard(cardStacks.drawPile[10]);
                this.continuePresses = 0;
                this.columnPresses = 0;
                cardStacks.drawPile.forEach(card => {
                    deck.flipCard(card);
                });
            }
        }
    },
    handleColumnSelection: function(isMouseDown, columnNumber) {
        if (isMouseDown) {
            if (this.continuePresses === 1) {
                cardStacks.sendBackToDrawPile(columnNumber);
                ++this.columnPresses;
            } else if (this.continuePresses === 2) {
                cardStacks.sendBackToDrawPile(columnNumber);
                ++this.columnPresses;
            } else if (this.continuePresses === 3) {
                cardStacks.sendBackToDrawPile(columnNumber);
                ++this.columnPresses;
            }
        }
    }
};

const cardWidth = 96;

const deck = new CardDeck();
deck.build();
deck.createCards(cardWidth, 150);

gameContainer.style();

title.create();
title.style();

drawPile.create();
drawPile.style(cardWidth);

text.create();
text.style();

cardColumns.create();
cardColumns.style(cardWidth);

eventListeners.add();