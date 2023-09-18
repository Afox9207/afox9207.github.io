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

const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");
const answerFour = document.getElementById("answer-four");
const answerFive = document.getElementById("answer-five");

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

function resetClasses() {

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

    answerOne.className = "faq__answer";
    answerTwo.className = "faq__answer";
    answerThree.className = "faq__answer";
    answerFour.className = "faq__answer";
    answerFive.className = "faq__answer";

}

function showAnswerOne() {
    if(isOneActive) {
        resetClasses();
        isOneActive = false;
    } else {
        resetClasses();
        questionOne.className = "faq__question--bold";
        arrowOne.className = "faq__arrow--180";
        answerOne.className = "faq__answer--shown";
        isOneActive = true;
    }
}

function showAnswerTwo() {
    if(isTwoActive) {
        resetClasses();
        isTwoActive = false;
    } else {
        resetClasses();
        questionTwo.className = "faq__question--bold";
        arrowTwo.className = "faq__arrow--180";
        answerTwo.className = "faq__answer--shown";
        isTwoActive = true;
    }
}

function showAnswerThree() {
    if(isThreeActive) {
        resetClasses();
        isThreeActive = false;
    } else {
        resetClasses();
        questionThree.className = "faq__question--bold";
        arrowThree.className = "faq__arrow--180";
        answerThree.className = "faq__answer--shown";
        isThreeActive = true;
    }
}

function showAnswerFour() {
    if(isFourActive) {
        resetClasses();
        isFourActive = false;
    } else {
        resetClasses();
        questionFour.className = "faq__question--bold";
        arrowFour.className = "faq__arrow--180";
        answerFour.className = "faq__answer--shown";
        isFourActive = true;
    }
}

function showAnswerFive() {
    if(isFiveActive) {
        resetClasses();
        isFiveActive = false;
    } else {
        resetClasses();
        questionFive.className = "faq__question--bold";
        arrowFive.className = "faq__arrow--180";
        answerFive.className = "faq__answer--shown";
        isFiveActive = true;
    }
}

