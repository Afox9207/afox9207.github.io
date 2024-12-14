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
    createHtmlElements(card, suit) {
        const body = document.createElement('div');
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
            body.appendChild(element);
            card.body = body;
        });
    }
    styleHtmlElements(card, color, width) {
        const elements = card.body.querySelectorAll('span');
        card.body.style.display = 'grid';
        card.body.style.outline = '1px solid black';
        card.body.style.borderRadius = '4px';
        card.body.style.padding = '8px';
        card.body.style.aspectRatio = '5 / 7';
        card.body.style.width = width + 'px';
        card.body.style.backgroundColor = 'white';
        card.body.style.fontSize = (width / 6) + 'px';
        card.body.style.color = color;
        elements.forEach((element, index) => {
            if (index === 2) {
                element.style.justifySelf = 'center'
                element.style.fontSize = '200%';
            } else if (index > 2) {
                element.style.justifySelf = 'end'
                element.style.scale = '-1 -1'
            }
        });
    }
    createCards(width) {
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
            this.createHtmlElements(card, suit);
            this.styleHtmlElements(card, color, width);
        });
    }
}