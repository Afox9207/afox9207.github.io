const roll = document.getElementById("btn_roll");
roll.addEventListener("click", rollDice);

function rollDice(){
    
    const diceArea = document.getElementById("dice_area");
    diceArea.innerHTML = "";

    let numOfDice = document.getElementById("num_of_dice").value 
    
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;

    const diceOne = "./dice_roller/images/one.svg"
    const diceTwo = "./dice_roller/images/two.svg"
    const diceThree = "./dice_roller/images/three.svg"
    const diceFour = "./dice_roller/images/four.svg"
    const diceFive = "./dice_roller/images/five.svg"
    const diceSix = "./dice_roller/images/six.svg"

    for (let n = 0; n < numOfDice; n++){
        
        let diceValue = Math.ceil(Math.random() * 6);
        let src;

        if(diceValue === 1){
            src = diceOne;
        }
        if(diceValue === 2){
            two++;
            src = diceTwo;
        }
        if(diceValue === 3){
            two++;
            three++;
            src = diceThree;
        }
        if(diceValue === 4){
            two++;
            three++;
            four++;
            src = diceFour;
        }
        if(diceValue === 5){
            two++;
            three++;
            four++;
            five++;
            src = diceFive;
        }
        if(diceValue === 6){
            two++;
            three++;
            four++;
            five++;
            six++;
            src = diceSix;
        }

        const img = document.createElement("img"); //create node
        img.src = src; //set source
        diceArea.appendChild(img); //add child

    }

    document.getElementById("two").innerHTML = two;
    document.getElementById("three").innerHTML = three;
    document.getElementById("four").innerHTML = four;
    document.getElementById("five").innerHTML = five;
    document.getElementById("six").innerHTML = six;

}