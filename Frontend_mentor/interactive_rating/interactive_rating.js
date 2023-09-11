const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");

const submitBtn = document.getElementById("submit-btn");

const ratingArea = document.getElementById("rating-area");

const ratingState = document.getElementById("rating-state");
const thankYouState = document.getElementById("thank-you-state");

let rating;

one.addEventListener("click", makeOneActive);
two.addEventListener("click", makeTwoActive);
three.addEventListener("click", makeThreeActive);
four.addEventListener("click", makeFourActive);
five.addEventListener("click", makeFiveActive);

submitBtn.addEventListener("click", submitRating);

function resetStyle() {
    one.className = "rating__circle";
    two.className = "rating__circle";
    three.className = "rating__circle";
    four.className = "rating__circle";
    five.className = "rating__circle";
}

function makeOneActive() {
    resetStyle();
    one.className += " rating__circle--active";
    rating = "1";
}

function makeTwoActive() {
    resetStyle();
    two.className += " rating__circle--active";
    rating = "2";
}

function makeThreeActive() {
    resetStyle();
    three.className += " rating__circle--active";
    rating = "3";
}

function makeFourActive() {
    resetStyle();
    four.className += " rating__circle--active";
    rating = "4";
}

function makeFiveActive() {
    resetStyle();
    five.className += " rating__circle--active";
    rating = "5";
}

function submitRating() {
    ratingArea.innerHTML = rating;
    ratingState.style.display = "none";
    thankYouState.style.display = "block";
}