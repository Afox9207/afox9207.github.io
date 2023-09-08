const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");

const scoreArea = document.getElementById("score_area");

const btn = document.getElementById("btn-submit");

const ratingArea = document.getElementById("rating");
const thankYouArea = document.getElementById("thank_you");

let isOneActive;
let isTwoActive;
let isThreeActive;
let isFourActive;
let isFiveActive;

let score;

one.addEventListener("mouseenter", startHoverStateOnOne);
one.addEventListener("mouseleave", stopHoverStateOnOne);
one.addEventListener("click", makeOneActive);

two.addEventListener("mouseenter", startHoverStateOnTwo);
two.addEventListener("mouseleave", stopHoverStateOnTwo);
two.addEventListener("click", makeTwoActive);

three.addEventListener("mouseenter", startHoverStateOnThree);
three.addEventListener("mouseleave", stopHoverStateOnThree);
three.addEventListener("click", makeThreeActive);

four.addEventListener("mouseenter", startHoverStateOnFour);
four.addEventListener("mouseleave", stopHoverStateOnFour);
four.addEventListener("click", makeFourActive);

five.addEventListener("mouseenter", startHoverStateOnFive);
five.addEventListener("mouseleave", stopHoverStateOnFive);
five.addEventListener("click", makeFiveActive);

btn.addEventListener("click", submit);

//one

function makeOneActive() {
    isOneActive = true;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = false;

    score = "1";

    two.style.backgroundColor = "var(--dark-blue)"; //reset colors
    two.style.color = "var(--light-grey)";
    three.style.backgroundColor = "var(--dark-blue)";
    three.style.color = "var(--light-grey)";
    four.style.backgroundColor = "var(--dark-blue)";
    four.style.color = "var(--light-grey)";
    five.style.backgroundColor = "var(--dark-blue)";
    five.style.color = "var(--light-grey)";

    one.style.backgroundColor = "var(--medium-grey)"; //set colors
    one.style.color = "var(--white)";
}

function startHoverStateOnOne() {
    one.style.backgroundColor = "var(--orange)";
    one.style.color = "var(--white)";
}

function stopHoverStateOnOne() {
    
    if (isOneActive) {
        one.style.backgroundColor = "var(--medium-grey)";
    } else {
        one.style.backgroundColor = "var(--dark-blue)"
        one.style.color = "var(--light-grey)";
    }

}

//two

function makeTwoActive() {
    isOneActive = false;
    isTwoActive = true;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = false;

    score = "2";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    one.style.color = "var(--light-grey)";
    three.style.backgroundColor = "var(--dark-blue)";
    three.style.color = "var(--light-grey)";
    four.style.backgroundColor = "var(--dark-blue)";
    four.style.color = "var(--light-grey)";
    five.style.backgroundColor = "var(--dark-blue)";
    five.style.color = "var(--light-grey)";

    two.style.backgroundColor = "var(--medium-grey)";
    two.style.color = "var(--white)";
}

function startHoverStateOnTwo() {
    two.style.backgroundColor = "var(--orange)";
    two.style.color = "var(--white)";
}

function stopHoverStateOnTwo() {
    
    if (isTwoActive) {
        two.style.backgroundColor = "var(--medium-grey)";
    } else {
        two.style.backgroundColor = "var(--dark-blue)"
        two.style.color = "var(--light-grey)";
    }
    
}

//three

function makeThreeActive() {
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = true;
    isFourActive = false;
    isFiveActive = false;

    score = "3";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    one.style.color = "var(--light-grey)";
    two.style.backgroundColor = "var(--dark-blue)";
    two.style.color = "var(--light-grey)";
    four.style.backgroundColor = "var(--dark-blue)";
    four.style.color = "var(--light-grey)";
    five.style.backgroundColor = "var(--dark-blue)";
    five.style.color = "var(--light-grey)";

    three.style.backgroundColor = "var(--medium-grey)";
    three.style.color = "var(--white)";
}

function startHoverStateOnThree() {
    three.style.backgroundColor = "var(--orange)";
    three.style.color = "var(--white)";
}

function stopHoverStateOnThree() {
    
    if (isThreeActive) {
        three.style.backgroundColor = "var(--medium-grey)";
    } else {
        three.style.backgroundColor = "var(--dark-blue)"
        three.style.color = "var(--light-grey)";
    }
    
}

//four

function makeFourActive() {
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = true;
    isFiveActive = false;

    score = "4";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    one.style.color = "var(--light-grey)";
    two.style.backgroundColor = "var(--dark-blue)";
    two.style.color = "var(--light-grey)";
    three.style.backgroundColor = "var(--dark-blue)";
    three.style.color = "var(--light-grey)";
    five.style.backgroundColor = "var(--dark-blue)";
    five.style.color = "var(--light-grey)";

    four.style.backgroundColor = "var(--medium-grey)";
    four.style.color = "var(--white)";
}

function startHoverStateOnFour() {
    four.style.backgroundColor = "var(--orange)";
    four.style.color = "var(--white)";
}

function stopHoverStateOnFour() {
    
    if (isFourActive) {
        four.style.backgroundColor = "var(--medium-grey)";
    } else {
        four.style.backgroundColor = "var(--dark-blue)"
        four.style.color = "var(--light-grey)";
    }
    
}

//five

function makeFiveActive() {
    isOneActive = false;
    isTwoActive = false;
    isThreeActive = false;
    isFourActive = false;
    isFiveActive = true;

    score = "5";

    one.style.backgroundColor = "var(--dark-blue)"; //reset colors
    one.style.color = "var(--light-grey)";
    two.style.backgroundColor = "var(--dark-blue)";
    two.style.color = "var(--light-grey)";
    three.style.backgroundColor = "var(--dark-blue)";
    three.style.color = "var(--light-grey)";
    four.style.backgroundColor = "var(--dark-blue)";
    four.style.color = "var(--light-grey)";

    five.style.backgroundColor = "var(--medium-grey)";
    five.style.color = "var(--white)";
}

function startHoverStateOnFive() {
    five.style.backgroundColor = "var(--orange)";
    five.style.color = "var(--white)";
}

function stopHoverStateOnFive() {
    
    if (isFiveActive) {
        five.style.backgroundColor = "var(--medium-grey)";
    } else {
        five.style.backgroundColor = "var(--dark-blue)"
        five.style.color = "var(--light-grey)";
    }
    
}

//submit

function submit() {
    scoreArea.innerHTML = score;
    ratingArea.style.display = "none";
    thankYouArea.style.display = "block";
}