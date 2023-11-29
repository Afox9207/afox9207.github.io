const btns = document.getElementsByClassName("btn-row__btn");
const activeBtns = document.getElementsByClassName("btn-row__btn--active");
const submitBtn = document.getElementById("submit-btn");

const ratingScreen = document.getElementById("rating");
const thankYouScreen = document.getElementById("thank-you");
const scoreArea = document.getElementById("score-area");

let score;

// loop through btns array and add event listeners

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", setActiveClass);
}

function setActiveClass() {
    // remove the active class from any btn that has it
    if (activeBtns.length > 0) {
        activeBtns[0].className = activeBtns[0].className.replace(" btn-row__btn--active", "");
    }
    // add active class to clicked btn
    this.className += " btn-row__btn--active";
};

// submit score and switch screens
submitBtn.addEventListener("click", submitScore);

function submitScore() {
    // check if there is a btn with an active class
    if (activeBtns.length > 0) {
        // find data attribute of active btn
        score = activeBtns[0].dataset.score;
        // place score on screen
        scoreArea.innerHTML = score;
        //change screens
        ratingScreen.style.display = "none";
        thankYouScreen.style.display = "grid";
    }
};
