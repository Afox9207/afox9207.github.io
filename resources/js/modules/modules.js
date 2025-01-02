
export function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomFloatingPoint(min, max) {
    return Math.random() * (max - min) + min;
}

export function shuffleArray(array) {
    for (let currentIndex = array.length - 1; currentIndex > 0; --currentIndex) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

export class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isCardFlipped = true;
    }
}

export const cardDeck = {
    suits: ['Spades', 'Diamonds', 'Clubs', 'Hearts'],
    values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    build: function(deck) {
        for (let suit = 0; suit < 4; ++suit) {
            if (suit < 2) {
                for (let value = 0; value < 13; ++value) {
                    deck.push(new Card(this.suits[suit], this.values[value]));
                }
            } else {
                for (let value = 12; value >= 0; --value) {
                    deck.push(new Card(this.suits[suit], this.values[value]));
                }
            }
        }
        return deck;
    },
    addJokers: function(deck) {
        deck.unshift(new Card('None', 'Joker'), new Card('None', 'Joker'));
    },
    shuffle: function(deck) {
        shuffleArray(deck);
    },
    draw: function(deck, arrayToPushTo, numberOfCards = 1) {
        for (let i = 0; i < numberOfCards; ++i) {
            arrayToPushTo.push(deck[i]);
        }
    },
    create3dSpace: function(card) {
        const div = document.createElement('div');
        card.space = div;
    },
    createBody: function(card) {
        const body = document.createElement('div');
        card.space.appendChild(body);
        card.body = body;
    },
    createFront: function(card, suit) {
        const front = document.createElement('div');
        const topValue = document.createElement('span');
        const bottomValue = document.createElement('span');
        const topSuit = document.createElement('span');
        const middleSuit = document.createElement('span');
        const bottomSuit = document.createElement('span');
        const elements = [topValue, topSuit, middleSuit, bottomSuit, bottomValue];
        elements.forEach((element, index) => {
            if (index === 0 || index === 4) {
                element.innerHTML = card.value;
            } else {
                element.innerHTML = suit;
            }
            front.appendChild(element);
        });
        card.body.appendChild(front);
        card.front = front;
    },
    createBack: function(card) {
        const back = document.createElement('div');
        card.body.appendChild(back);
        card.back = back;
    },
    createCard: function(card, suit) {
        this.create3dSpace(card);
        this.createBody(card);
        this.createFront(card, suit);
        this.createBack(card);
    },
    style3dSpace: function(card, width, perspective) {
        card.space.style.aspectRatio = '5 / 7';
        card.space.style.width = width + 'px';
        card.space.style.fontSize = (width / 6) + 'px';
        card.space.style.perspective = perspective + 'px';
    },
    styleBody: function(card, color, flipTime) {
        card.body.style.outline = '1px solid black';
        card.body.style.borderRadius = '4px';
        card.body.style.width = '100%';
        card.body.style.height = '100%';
        card.body.style.backgroundColor = 'white';
        card.body.style.color = color;
        card.body.style.position = 'relative';
        card.body.style.transformStyle = 'preserve-3d';
        card.body.style.transition = `transform ${flipTime}ms linear`;
    },
    styleFront: function(card) {
        const elements = card.front.querySelectorAll('span');
        card.front.style.display = 'grid';
        card.front.style.position = 'absolute';
        card.front.style.padding = '8px';
        card.front.style.width = '100%';
        card.front.style.height = '100%';
        card.front.style.backfaceVisibility = 'hidden';
        elements.forEach((element, index) => {
            if (index < 2) {
                element.style.justifySelf = 'left';
            } else if (index === 2) {
                element.style.justifySelf = 'center';
                element.style.fontSize = '200%';;
            } else {
                element.style.justifySelf = 'right';
                element.style.scale = '-1 -1';
            }
        });
    },
    styleBack: function(card) {
        card.back.style.position = 'absolute';
        card.back.style.width = '100%';
        card.back.style.height = '100%';
        card.back.style.background = 'url(../resources/images/card-back.jpg)';
        card.back.style.backgroundSize = 'cover';
        card.back.style.backfaceVisibility = 'hidden';
        card.back.style.transform = 'rotateY(180deg)';
    },
    styleCard: function(card, color, width, flipTime, perspective) {
        this.style3dSpace(card, width, perspective);
        this.styleBody(card, color, flipTime);
        this.styleFront(card);
        this.styleBack(card);
    },
    createCards: function(deck, width, flipTime = 100, perspective = 300) {
        deck.forEach(card => {
            let suit;
            let color;
            switch(card.suit) {
                case 'Hearts':
                    suit = '♥';
                    color = 'red';                    
                    break;
                case 'Diamonds':
                    suit = '♦';
                    color = 'red';
                    break;
                case 'Spades':
                    suit = '♠';
                    color = 'black';
                    break;
                case 'Clubs':
                    suit = '♣';
                    color = 'black';
                    break;
            }
            this.createCard(card, suit);
            this.styleCard(card, color, width, flipTime, perspective);
        });
    },
    flipCard: function(card) {
        if (card.isCardFlipped) {
            card.body.style.transform = 'rotateY(180deg)';
            card.isCardFlipped = false;
        } else {
            card.body.style.transform = 'rotateY(0deg)';
            card.isCardFlipped = true;
        }
    }
}

