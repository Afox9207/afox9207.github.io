const cardBtn = document.getElementsByClassName("card__btn")[0];
const cardBtnImg = document.getElementsByClassName("card__btn-img")[0];

const cardBottom = document.getElementsByClassName("card__bottom")[0];
const cardCredit = document.getElementsByClassName("card__credit")[0];
const cardShare = document.getElementsByClassName("card__share")[0];

let isBtnFocused;
let isBtnActive = false;

// functions

function changeBtnStyle() {
    if (!isBtnActive && !isBtnFocused) {
        cardBtn.style.backgroundColor = "var(--clr-2)";
        cardBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    } else if (!isBtnActive && isBtnFocused) {
        cardBtn.style.backgroundColor = "var(--clr-4)";
        cardBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else if (isBtnActive && !isBtnFocused) {
        cardBtn.style.backgroundColor = "var(--clr-4)";
        cardBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else {
        cardBtn.style.backgroundColor = "var(--clr-2)";
        cardBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    }
}

function changeCardBottom() {
    if (isBtnActive) {
        // change background color
        cardBottom.style.backgroundColor = "var(--clr-5)";
        // switch displays
        cardCredit.style.display = "none";
        cardShare.style.display = "flex";
    } else {
        cardBottom.style.backgroundColor = "var(--clr-1)";

        cardCredit.style.display = "flex";
        cardShare.style.display = "none";
    }
}

function addActiveClass() {
    if (isBtnActive) {
        cardShare.classList += " card__share--active";
    } else {
        cardShare.classList.remove("card__share--active");
    }
}

// event listeners

cardBtn.addEventListener("mouseenter", function() {
    isBtnFocused = true;
    changeBtnStyle();
});

cardBtn.addEventListener("mouseleave", function() {
    isBtnFocused = false;
    changeBtnStyle();
});

cardBtn.addEventListener("click", function() {
    
    if (!isBtnActive) {
        isBtnActive = true;
    } else {
        isBtnActive = false;
    }
    
    changeBtnStyle();
    
    if (window.innerWidth < 900) {
        changeCardBottom();
    } else {
        addActiveClass();
    }
});

window.addEventListener("resize", function() {
    this.location.reload();
});