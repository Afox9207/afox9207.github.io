const rowOne = document.getElementById("row-one");
const rowTwo = document.getElementById("row-two");
const rowThree = document.getElementById("row-three");
const rowFour = document.getElementById("row-four");
const rowFive = document.getElementById("row-five");

const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const questionFour = document.getElementById("question-four");
const questionFive = document.getElementById("question-five");

const arrowOne = document.getElementById("arrow-one");
const arrowTwo = document.getElementById("arrow-two");
const arrowThree = document.getElementById("arrow-three");
const arrowFour = document.getElementById("arrow-four");
const arrowFive = document.getElementById("arrow-five");

const box = document.getElementById("box-img");

let isOneActive;
let isTwoActive;
let isThreeActive;
let isFourActive;
let isFiveActive;

rowOne.addEventListener("click", showAnswerOne);
rowTwo.addEventListener("click", showAnswerTwo);
rowThree.addEventListener("click", showAnswerThree);
rowFour.addEventListener("click", showAnswerFour);
rowFive.addEventListener("click", showAnswerFive);

rowOne.addEventListener("mouseenter", enterHoverStateOne);
rowOne.addEventListener("mouseleave", leaveHoverStateOne);

rowTwo.addEventListener("mouseenter", enterHoverStateTwo);
rowTwo.addEventListener("mouseleave", leaveHoverStateTwo);

rowThree.addEventListener("mouseenter", enterHoverStateThree);
rowThree.addEventListener("mouseleave", leaveHoverStateThree);

rowFour.addEventListener("mouseenter", enterHoverStateFour);
rowFour.addEventListener("mouseleave", leaveHoverStateFour);

rowFive.addEventListener("mouseenter", enterHoverStateFive);
rowFive.addEventListener("mouseleave", leaveHoverStateFive);

function resetClasses() {

    rowOne.className = "faq__btn";
    rowTwo.className = "faq__btn";
    rowThree.className = "faq__btn";
    rowFour.className = "faq__btn";
    rowFive.className = "faq__btn";
    
    questionOne.className = "faq__question";
    questionTwo.className = "faq__question";
    questionThree.className = "faq__question";
    questionFour.className = "faq__question";
    questionFive.className = "faq__question";

    arrowOne.className = "faq__arrow";
    arrowTwo.className = "faq__arrow";
    arrowThree.className = "faq__arrow";
    arrowFour.className = "faq__arrow";
    arrowFive.className = "faq__arrow";

}

//show answers

function showAnswerOne() {
    if(isOneActive) {
        resetClasses();
        isOneActive = false;
    } else {
        resetClasses();
        rowOne.className += " faq__btn--expand";
        questionOne.className += " faq__question--bold";
        arrowOne.className += " faq__arrow--180";
        isOneActive = true;
    }
}

function showAnswerTwo() {
    if(isTwoActive) {
        resetClasses();
        isTwoActive = false;
    } else {
        resetClasses();
        rowTwo.className += " faq__btn--expand";
        questionTwo.className += " faq__question--bold";
        arrowTwo.className += " faq__arrow--180";
        isTwoActive = true;
    }
}

function showAnswerThree() {
    if(isThreeActive) {
        resetClasses();
        isThreeActive = false;
    } else {
        resetClasses();
        rowThree.className += " faq__btn--expand";
        questionThree.className += " faq__question--bold";
        arrowThree.className += " faq__arrow--180";
        isThreeActive = true;
    }
}

function showAnswerFour() {
    if(isFourActive) {
        resetClasses();
        isFourActive = false;
    } else {
        resetClasses();
        rowFour.className += " faq__btn--expand";
        questionFour.className += " faq__question--bold";
        arrowFour.className += " faq__arrow--180";
        isFourActive = true;
    }
}

function showAnswerFive() {
    if(isFiveActive) {
        resetClasses();
        isFiveActive = false;
    } else {
        resetClasses();
        rowFive.className += " faq__btn--expand";
        questionFive.className += " faq__question--bold";
        arrowFive.className += " faq__arrow--180";
        isFiveActive = true;
    }
}

//enter hover state

function enterHoverStateOne() {
    box.className += " faq__img-box--translate";
    questionOne.className += " faq__question--red";
}

function enterHoverStateTwo() {
    box.className += " faq__img-box--translate";
    questionTwo.className += " faq__question--red";
}

function enterHoverStateThree() {
    box.className += " faq__img-box--translate";
    questionThree.className += " faq__question--red";
}

function enterHoverStateFour() {
    box.className += " faq__img-box--translate";
    questionFour.className += " faq__question--red";
}

function enterHoverStateFive() {
    box.className += " faq__img-box--translate";
    questionFive.className += " faq__question--red";
}

//leave hover state

function leaveHoverStateOne() {
    box.className = "faq__img-box";
    if(isOneActive) {
        questionOne.className = "faq__question faq__question--bold"
    } else {
        questionOne.className = "faq__question";
    }
}


function leaveHoverStateTwo() {
    box.className = "faq__img-box";
    if(isTwoActive) {
        questionTwo.className = "faq__question faq__question--bold"
    } else {
        questionTwo.className = "faq__question";
    }
}

function leaveHoverStateThree() {
    box.className = "faq__img-box";
    if(isThreeActive) {
        questionThree.className = "faq__question faq__question--bold"
    } else {
        questionThree.className = "faq__question";
    }
}

function leaveHoverStateFour() {
    box.className = "faq__img-box";
    if(isFourActive) {
        questionFour.className = "faq__question faq__question--bold"
    } else {
        questionFour.className = "faq__question";
    }
}

function leaveHoverStateFive() {
    box.className = "faq__img-box";
    if(isFiveActive) {
        questionFive.className = "faq__question faq__question--bold"
    } else {
        questionFive.className = "faq__question";
    }
}
