export class RandomIntegerGenerator {
    constructor() {
        
    }
    generate(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export class RandomFloatingPointGenerator {
    constructor() {
        
    }
    generate(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isCardFlipped = true;
    }
}

export class CardDeck {
    constructor() {
        this.suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts'];
        this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.deck = [];
    }
    build() {
        for (let suit = 0; suit < 4; ++suit) {
            if (suit < 2) {
                for (let value = 0; value < 13; ++value) {
                    this.deck.push(new Card(this.suits[suit], this.values[value]));
                }
            } else {
                for (let value = 12; value >= 0; --value) {
                    this.deck.push(new Card(this.suits[suit], this.values[value]));
                }
            }
        }
    }
    addJokers() {
        this.deck.unshift(new Card('None', 'Joker'), new Card('None', 'Joker'));
    }
    shuffle() {
        for (let currentIndex = this.deck.length - 1; currentIndex > 0; --currentIndex) {
            const randomCard = Math.floor(Math.random() * (currentIndex + 1));
            [this.deck[currentIndex], this.deck[randomCard]] = [this.deck[randomCard], this.deck[currentIndex]];
        }
    }
    draw(arrayToPushTo, numberOfCards = 1) {
        for (let i = 0; i < numberOfCards; ++i) {
            arrayToPushTo.push(this.deck[i]);
        }
    }
    create3dSpace(card) {
        const div = document.createElement('div');
        card.space = div;
    }
    createBody(card) {
        const body = document.createElement('div');
        card.space.appendChild(body);
        card.body = body;
    }
    createFront(card, suit) {
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
    }
    createBack(card) {
        const back = document.createElement('div');
        card.body.appendChild(back);
        card.back = back;
    }
    createCard(card, suit) {
        this.create3dSpace(card);
        this.createBody(card);
        this.createFront(card, suit);
        this.createBack(card);
    }
    style3dSpace(card, width, perspective) {
        card.space.style.aspectRatio = '5 / 7';
        card.space.style.width = width + 'px';
        card.space.style.fontSize = (width / 6) + 'px';
        card.space.style.perspective = perspective + 'px';
    }
    styleBody(card, color, flipSpeed) {
        card.body.style.outline = '1px solid black';
        card.body.style.borderRadius = '4px';
        card.body.style.width = '100%';
        card.body.style.height = '100%';
        card.body.style.backgroundColor = 'white';
        card.body.style.color = color;
        card.body.style.position = 'relative';
        card.body.style.transformStyle = 'preserve-3d';
        card.body.style.transition = `transform ${flipSpeed}ms linear`;
    }
    styleFront(card) {
        const elements = card.front.querySelectorAll('span');
        card.front.style.display = 'grid';
        card.front.style.position = 'absolute';
        card.front.style.padding = '8px';
        card.front.style.width = '100%';
        card.front.style.height = '100%';
        card.front.style.backfaceVisibility = 'hidden';
        elements.forEach((element, index) => {
            if (index === 2) {
                element.style.justifySelf = 'center';
                element.style.fontSize = '200%';;
            } else if (index > 2) {
                element.style.justifySelf = 'end';
                element.style.scale = '-1 -1';
            }
        });
    }
    styleBack(card) {
        card.back.style.position = 'absolute';
        card.back.style.width = '100%';
        card.back.style.height = '100%';
        card.back.style.background = 'url(../resources/images/card-back.jpg)';
        card.back.style.backgroundSize = 'cover';
        card.back.style.backfaceVisibility = 'hidden';
        card.back.style.transform = 'rotateY(180deg)';
    }
    styleCard(card, color, width, flipSpeed, perspective) {
        this.style3dSpace(card, width, perspective);
        this.styleBody(card, color, flipSpeed);
        this.styleFront(card);
        this.styleBack(card);
    }
    createCards(width, flipSpeed = 100, perspective = 300) {
        this.deck.forEach(card => {
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
            this.styleCard(card, color, width, flipSpeed, perspective);
        });
    }
    flipCard(card) {
        if (card.isCardFlipped) {
            card.body.style.transform = 'rotateY(180deg)';
            card.isCardFlipped = false;
        } else {
            card.body.style.transform = 'rotateY(0deg)';
            card.isCardFlipped = true;
        }
    }
}