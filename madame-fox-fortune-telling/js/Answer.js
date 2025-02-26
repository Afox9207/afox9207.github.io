export class Answer {
    constructor(main) {
        const transitionTime = 1000;

        const styles = 
        `
        .answer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            place-content: center;
            font-size: 24px;
            font-weight: 900;
            text-align: center;
            color: white;
            scale: 0;
            z-index: -1;
            transition: scale ${transitionTime}ms linear;
        }
        .answer--active {
            scale: 1;
        }
        `;

        main.addStyles(styles);

        this.answer = main.shadow.getElementById('answer');
    }
    generate() {
        const answers = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            `Don’t count on it`,
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful'
        ];
        const answerNumber = Math.floor(Math.random() * 20);
        this.answer.innerText = answers[answerNumber];
        this.show();
    }
    show() {
        this.answer.classList.add('answer--active');
    }
    hide() {
        if (this.answer.classList.contains('answer--active')) {
            this.answer.classList.remove('answer--active');
        }
    }
}