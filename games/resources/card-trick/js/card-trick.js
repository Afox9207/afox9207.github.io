'use strict';

import { CardDeck } from "../../../../resources/js/modules/modules.js";

const gameContainer = {
    element: document.getElementById('game'),
    style: function() {
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
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

const dialog = {
    transitionTime: 250,
    textArray: [
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
        p.textContent = this.textArray[0];
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
        setTimeout(() => {
            this.setOpacity(1);
            this.element.textContent = string;
        }, this.transitionTime);

    }
};

const drawPile = {
    minWidth: 128,
    create: function() {
        const div = document.createElement('div');
        gameContainer.element.appendChild(div);
        this.element = div;
    },
    style: function(width) {
        this.element.style.position = 'absolute';
        this.element.style.top = this.posTop + 'px';
        this.element.style.left = this.posLeft + 'px';
        this.element.style.aspectRatio = '5 / 7';
        this.element.style.width = width + 'px';
    },
    calculatePosition: function() {
        this.posLeft = cardColumns.columnPositions[3] + cards.cardWidth + this.minWidth;
        this.posTop = cardColumns.columnPositions[0];
    }
};

const cardColumns = {
    marginTop: 16,
    marginBottom: 16,
    gap: 16,
    elements: [],
    columnPositions: [],
    create: function() {
        const flex = document.createElement('flex');
        gameContainer.element.appendChild(flex);
        this.flex = flex;
        for (let i = 0; i < 3; ++i) {
            const column = document.createElement('div');
            this.flex.appendChild(column);
            this.elements.push(column)
        }
    },
    style: function(cardWidth) {
        this.flex.style.display = 'flex';
        this.flex.style.justifyContent = 'center';
        this.flex.style.marginTop = this.marginTop + 'px';
        this.flex.style.marginBottom = this.marginBottom + 'px';
        this.flex.style.gap = this.gap + 'px';
        this.elements.forEach(column => {
            column.style.width = cardWidth + 'px';
            column.style.height = cards.stackOffSet * 6 + cardWidth * (7 / 5) + 'px';
            column.style.zIndex = '7';
        });
    },
    addCursorStyle: function() {
        this.elements.forEach(column => {
            column.style.cursor = 'pointer';
        });
    },
    removeCursorStyle: function() {
        this.elements.forEach(column => {
            column.style.cursor = 'default';
        });
    },
    calculateColumnPositions: function() {
        this.columnPositions.push(this.elements[0].offsetTop);
        this.columnPositions.push(this.elements[0].offsetLeft);
        this.columnPositions.push(this.elements[1].offsetLeft);
        this.columnPositions.push(this.elements[2].offsetLeft);
    }
};

const hocusPocus = {
    gap: 16,
    transitionTime: 250,
    create: function() {
        const magicWord = ['H','O','C','U','S','P','O','C','U','S'];
        const grid = document.createElement('div');
        gameContainer.element.appendChild(grid);
        this.grid = grid;
        this.elements = [];
        magicWord.forEach(letter => {
            const box = document.createElement('div');
            box.textContent = letter;
            grid.appendChild(box);
            this.elements.push(box);
        });
    },
    style: function() {
        this.grid.style.display = 'grid';
        this.grid.style.position = 'absolute';
        this.grid.style.left = cardColumns.flex.offsetLeft + 'px';
        this.grid.style.top = cardColumns.flex.offsetTop + 'px';
        this.grid.style.gridTemplateColumns = `repeat(5, ${cards.cardWidth}px)`
        this.grid.style.gridTemplateRows = `repeat(2, ${cards.cardHeight}px)`;
        this.grid.style.gap = this.gap + 'px';
        this.grid.style.opacity = '0';
        this.grid.style.transition = `opacity ${this.transitionTime}ms linear`;
        this.elements.forEach(box => {
            box.style.display = 'grid'
            box.style.placeContent = 'center';
            box.style.outline = '1px solid black';
        });
    },
    setOpacity: function(opacity) {
        this.grid.style.opacity = opacity;
    },
    calculatePositions: function() {
        this.positions = [];
        const titleHeight = parseFloat(getComputedStyle(title.element).height);
        const titleMargins = title.marginTop + title.marginBottom;
        const dialogHeight = parseFloat(getComputedStyle(dialog.element).height);
        const offset = titleHeight + titleMargins + dialogHeight + cards.cardPadding;
        this.elements.forEach(box => {
            const leftPos = box.offsetLeft;
            const topPos = box.offsetTop + offset;
            this.positions.push([leftPos, topPos]);
        });
    }
}

const cards = {
    cardWidth: 96,
    cardHeight: 96 * (7 / 5),
    cardPadding: 16,
    moveTime: 200,
    flipTime: 200,
    stackOffSet: 48,
    perspective: 300,
    fullDeck: [],
    drawPile: [],
    stackOne: [],
    stackTwo: [],
    stackThree: [],
    hocusPocusStack: [],
    cardsAreInDrawPile: true,
    cardsAreInColumns: false,
    initialize: function() {
        this.drawPile = [];
        deck.shuffle(this.fullDeck);
        deck.draw(this.fullDeck, this.drawPile, 21);
        deck.createCards(this.drawPile, this.cardWidth, this.flipTime, this.perspective);
        this.drawPile.forEach(card => {
            this.setCardPositionToAbsolute(card);
            this.appendCardToContainer(card);
            deck.flipCard(card);
            this.moveCardToDrawPile(card);
            this.setMoveTransition(card);
        });
    },
    layoutCards: function() {
        this.stackOne = [];
        this.stackTwo = [];
        this.stackThree = [];
        this.drawPile.forEach((card, index) => {
            this.putCardsInStacksArrays(card, index);
            this.moveCardsToColumns(card, index);
        });
    },
    moveCardsBackToDrawPile: function(columnNumber) {
        this.cardsAreInColumns = false;
        let piles = [];
        cardColumns.removeCursorStyle();
        this.determineOrderOfStacks(columnNumber, piles);
        this.pushStackArraysToDrawPileArray(piles)
        this.drawPile.forEach((card, index) => {
            setTimeout(() => {
                this.setZIndex(card, index);
                deck.flipCard(card);
                this.moveCardToDrawPile(card)
                if (index === 20) this.cardsAreInDrawPile = true;
            }, this.moveTime * index);
        });
    },
    guessCard: function() {
        let value;
        this.drawElevenCards();
        this.hocusPocusStack.forEach((card, index) => {
            this.moveCardToHocusPocusArea(card, index);
            setTimeout(() => {
                if (index === 10) {
                    deck.flipCard(card);
                    switch(card.value) {
                        case 'A':
                            value = 'Ace';
                            break;
                        case 'J':
                            value = 'Jack';
                            break;
                        case 'Q':
                            value = 'Queen';
                            break;
                        case 'K':
                            value = 'King';
                            break;
                    }
                    if (value) {
                        dialog.write(`Your card is the ${value} of ${card.suit}`);
                    } else {
                        dialog.write(`Your card is the ${card.value} of ${card.suit}`);
                    }
                }
            }, this.moveTime * 10);
        });
        
    },
    setCardPositionToAbsolute: function(card) {
        card.space.style.position = 'absolute';
    },
    appendCardToContainer: function(card) {
        gameContainer.element.appendChild(card.space);
    },
    setMoveTransition: function(card) {
        card.space.style.transition = `top ${this.moveTime}ms linear, left ${this.moveTime}ms linear`;
    },
    setZIndex: function(card, zIndex) {
        card.space.style.zIndex = zIndex;
    },
    moveCardToDrawPile: function(card) {
        card.space.style.left = drawPile.posLeft + 'px';
        card.space.style.top = drawPile.posTop + 'px';
    },
    putCardsInStacksArrays: function(card, index) {
        if (index % 3 === 2) {
            this.stackThree.push(card);
        } else if (index % 3 === 1) {
            this.stackTwo.push(card);
        } else {
            this.stackOne.push(card);
        }
    },
    moveCardsToColumns: function(card, index) {
        this.cardsAreInDrawPile = false;
        cardColumns.addCursorStyle();
        const columnNumber = index % 3 + 1;
        const rowNumber = Math.floor(index / 3);
        setTimeout(() => {
            card.space.style.top = cardColumns.columnPositions[0] + (this.stackOffSet * rowNumber) + 'px';
            card.space.style.left = cardColumns.columnPositions[columnNumber] + 'px';
            card.space.style.zIndex = rowNumber;
            setTimeout(() => {
                deck.flipCard(card);
            }, this.moveTime * 0.75);
            if (index === 20) this.cardsAreInColumns = true;
        }, this.moveTime * index);
    },
    determineOrderOfStacks: function(columnNumber, piles) {
        if (columnNumber === 1) {
            piles.push(this.stackThree, this.stackOne, this.stackTwo);
        } else if (columnNumber === 2) {
            piles.push(this.stackOne, this.stackTwo, this.stackThree);
        } else {
            piles.push(this.stackTwo, this.stackThree, this.stackOne);
        }
        
    },
    pushStackArraysToDrawPileArray: function(piles) {
        this.drawPile = [];
        piles.forEach(pile => {
            pile.forEach(card => {
                this.drawPile.push(card);
            });
        });
    },
    drawElevenCards: function() {
        deck.draw(this.drawPile, this.hocusPocusStack, 11);
    },
    moveCardToHocusPocusArea: function(card, index) {
        setTimeout(() => {
            if (index < 10) {
                card.space.style.left = hocusPocus.positions[index][0] + 'px';
                card.space.style.top = hocusPocus.positions[index][1] + 'px';
            } else {
                card.space.style.left = hocusPocus.positions[2][0] + 'px';
                card.space.style.top =  hocusPocus.positions[6][1] - hocusPocus.positions[2][1] / 2 + 'px';
            }
        }, this.moveTime * index - 1);
    }
};

const eventListeners = {
    addContinueListener: function() {
        gameContainer.element.addEventListener('click', () => {
            if (cards.cardsAreInDrawPile) gameLogic.handleContinue();
        });
    },
    addColumnOneListener: function() {
        cardColumns.elements[0].addEventListener('click', () => {
            if (cards.cardsAreInColumns) gameLogic.handleSelection(1);
        });
    },
    addColumnTwoListener: function() {
        cardColumns.elements[1].addEventListener('click', () => {
            if (cards.cardsAreInColumns) gameLogic.handleSelection(2);
        });
    },
    addColumnThreeListener: function() {
        cardColumns.elements[2].addEventListener('click', () => {
            if (cards.cardsAreInColumns) gameLogic.handleSelection(3);
        });
    },
    add: function() {
        this.addContinueListener();
        this.addColumnOneListener();
        this.addColumnTwoListener();
        this.addColumnThreeListener();
    }
};

const gameLogic = {
    continuePresses: 0,
    columnSelections: 0,
    moveTime: cards.moveTime * 21,
    handleContinue: function() {
        if (this.continuePresses === 0) {
            cards.initialize();
            cards.layoutCards();
            dialog.setOpacity(0);
            setTimeout(() => {
                dialog.write(dialog.textArray[1]);
                ++this.continuePresses;
            }, this.moveTime)
        } else if (this.continuePresses === 1) {
            dialog.setOpacity(0);
            setTimeout(() => {
                dialog.write(dialog.textArray[5]);
                this.continuePresses = 0;
            }, dialog.transitionTime);
        }
    },
    handleSelection: function(columnNumber) {
        if (this.columnSelections < 2) {
            cards.moveCardsBackToDrawPile(columnNumber);
            dialog.setOpacity(0);
            setTimeout(() => {
                cards.layoutCards();
            }, this.moveTime);
            setTimeout(() => {
                dialog.write(dialog.textArray[this.columnSelections + 2]);
                ++this.columnSelections;
            }, this.moveTime * 2);
        } else if (this.columnSelections === 2) {
            cards.moveCardsBackToDrawPile(columnNumber);
            dialog.setOpacity(0);
            setTimeout(() => {
                dialog.write(dialog.textArray[4]);
                hocusPocus.setOpacity(1);
                cards.guessCard();
                cards.cardsAreInColumns = false;
                cards.cardsAreInDrawPile = true;
                this.columnSelections = 0;
            }, this.moveTime);
        }
    }
};

const deck = new CardDeck();
cards.fullDeck = deck.build(cards.fullDeck);

gameContainer.style();

title.create();
title.style();

dialog.create();
dialog.style();

cardColumns.create();
cardColumns.style(cards.cardWidth);
cardColumns.calculateColumnPositions();

hocusPocus.create();
hocusPocus.style();
hocusPocus.calculatePositions();


drawPile.create();
drawPile.calculatePosition();
drawPile.style(cards.cardWidth);

eventListeners.add();
