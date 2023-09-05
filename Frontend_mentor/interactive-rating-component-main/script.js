const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");

let isOneActive = false;
let isTwoActive = false;
let isThreeActive = false;
let isFourActive = false;
let isFiveActive = false;

let score;

one.addEventListener("click", selectOne);
one.addEventListener("mouseenter", hoverOne);
one.addEventListener("mouseleave", stopHoverOne);

two.addEventListener("click", selectTwo);
two.addEventListener("mouseenter", hoverTwo);
two.addEventListener("mouseleave", stopHoverTwo);

three.addEventListener("click", selectThree);
three.addEventListener("mouseenter", hoverThree);
three.addEventListener("mouseleave", stopHoverThree);

four.addEventListener("click", selectFour);
four.addEventListener("mouseenter", hoverFour);
four.addEventListener("mouseleave", stopHoverFour);

five.addEventListener("click", selectFive);
five.addEventListener("mouseenter", hoverFive);
five.addEventListener("mouseleave", stopHoverFive);

//hover

    //one

function hoverOne() {
    one.style.backgroundColor = "var(--orange)";
    one.style.color = "var(--white)";
}

function stopHoverOne() {
    if(isOneActive) {
        one.style.backgroundColor = "var(--light-grey)";
        one.style.color = "var(--white)";
    } else {
    one.style.backgroundColor = "var(--dark-blue)";
    one.style.color = "var(--light-grey)";
    }
}

    //two

function hoverTwo() {
    two.style.backgroundColor = "var(--orange)";
    two.style.color = "var(--white)";
}

function stopHoverTwo() {
    if(isTwoActive) {
        two.style.backgroundColor = "var(--light-grey)";
        two.style.color = "var(--white)";
    } else {
        two.style.backgroundColor = "var(--dark-blue)";
        two.style.color = "var(--light-grey)";
    }
}

    //three

function hoverThree() {
    three.style.backgroundColor = "var(--orange)";
    three.style.color = "var(--white)";
}

function stopHoverThree() {
    if(isThreeActive) {
        three.style.backgroundColor = "var(--light-grey)";
        three.style.color = "var(--white)";
    } else {
        three.style.backgroundColor = "var(--dark-blue)";
        three.style.color = "var(--light-grey)";
    }
}

    //four

function hoverFour() {
    four.style.backgroundColor = "var(--orange)";
    four.style.color = "var(--white)";
}

function stopHoverFour() {
    if(isFourActive) {
        four.style.backgroundColor = "var(--light-grey)";
        four.style.color = "var(--white)";
    } else {
        four.style.backgroundColor = "var(--dark-blue)";
        four.style.color = "var(--light-grey)";
    }
}

    //five

function hoverFive() {
    five.style.backgroundColor = "var(--orange)";
    five.style.color = "var(--white)";
}

function stopHoverFive() {
    if(isFiveActive) {
        five.style.backgroundColor = "var(--light-grey)";
        five.style.color = "var(--white)";
    } else {
        five.style.backgroundColor = "var(--dark-blue)";
        five.style.color = "var(--light-grey)";
    }
}

//select

    //one

function selectOne() {
    
    isOneActive = true;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = false;

    score = "1";

    two.style.backgroundColor = "var(--dark-blue)"; //reset colors
    three.style.backgroundColor = "var(--dark-blue)";
    four.style.backgroundColor = "var(--dark-blue)";
    five.style.backgroundColor = "var(--dark-blue)";

    one.style.backgroundColor = "var(--light-grey)"; //set active colors
    one.style.color = "var(--white)";

}

    //two

function selectTwo() {
    
    isOneActive = false;
    isTwoActive = true;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = false;

    score = "2";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    three.style.backgroundColor = "var(--dark-blue)";
    four.style.backgroundColor = "var(--dark-blue)";
    five.style.backgroundColor = "var(--dark-blue)";

    two.style.backgroundColor = "var(--light-grey)"; //set active colors
    two.style.color = "var(--white)";

}

    //three

function selectThree() {
    
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = true;
    isFourActive = false;
    isFiveActive = false;

    score = "3";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    two.style.backgroundColor = "var(--dark-blue)";
    four.style.backgroundColor = "var(--dark-blue)";
    five.style.backgroundColor = "var(--dark-blue)";

    three.style.backgroundColor = "var(--light-grey)"; //set active colors
    three.style.color = "var(--white)";

}

    //four

function selectFour() {
    
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = true;
    isFiveActive = false;

    score = "4";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    two.style.backgroundColor = "var(--dark-blue)";
    three.style.backgroundColor = "var(--dark-blue)";
    five.style.backgroundColor = "var(--dark-blue)";

    four.style.backgroundColor = "var(--light-grey)"; //set active colors
    four.style.color = "var(--white)";

}

    //five

function selectFive() {
    
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = true;

    score = "5";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    two.style.backgroundColor = "var(--dark-blue)";
    three.style.backgroundColor = "var(--dark-blue)";
    four.style.backgroundColor = "var(--dark-blue)";

    five.style.backgroundColor = "var(--light-grey)"; //set active colors
    five.style.color = "var(--white)";

}

const rating = document.getElementById("rating");
const thankYou = document.getElementById("thank_you");
const scoreArea = document.getElementById("score");

const btn = document.getElementById("btn");
btn.addEventListener("click", sendRating);

function sendRating() {

    rating.style.display = "none";
    thankYou.style.display = "flex"
    scoreArea.innerHTML = score;
    
}

