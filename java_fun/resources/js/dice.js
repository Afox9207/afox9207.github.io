//take string value from input and convert it to a number. then roll that many dice.
function rollDice() {
    dice_area.replaceChildren(); //clear screen
    let twos = 0;
    let threes = 0;
    let fours = 0;
    let fives = 0;
    let sixes = 0;
    for (let diceNumber = parseInt(document.getElementById('dice_number').value, 10); diceNumber > 0; diceNumber--) {
        let diceValue = Math.ceil(Math.random() * 6);
        const newImage = document.createElement('img');
        switch (diceValue) {
            case 1: 
                newImage.src = './resources/images/dice/dice-six-faces-one.svg';
                document.getElementById('dice_area').appendChild(newImage);
                break;
            case 2: 
                newImage.src = './resources/images/dice/dice-six-faces-two.svg';
                document.getElementById('dice_area').appendChild(newImage);
                twos++;
                break;
            case 3: 
                newImage.src = './resources/images/dice/dice-six-faces-three.svg';
                document.getElementById('dice_area').appendChild(newImage);
                twos++;
                threes++;
                break;
            case 4: 
                newImage.src = './resources/images/dice/dice-six-faces-four.svg';
                document.getElementById('dice_area').appendChild(newImage);
                twos++;
                threes++;
                fours++;
                break;
            case 5: 
                newImage.src = './resources/images/dice/dice-six-faces-five.svg';
                document.getElementById('dice_area').appendChild(newImage);
                twos++;
                threes++;
                fours++;
                fives++;
                break;
            case 6: 
                newImage.src = './resources/images/dice/dice-six-faces-six.svg';
                document.getElementById('dice_area').appendChild(newImage);
                twos++;
                threes++;
                fours++;
                fives++;
                sixes++;
                break;
        }
    }
    document.getElementById('twos').innerHTML = twos;
    document.getElementById('threes').innerHTML = threes;
    document.getElementById('fours').innerHTML = fours;
    document.getElementById('fives').innerHTML = fives;
    document.getElementById('sixes').innerHTML = sixes;
}