const shareBtn = document.getElementsByClassName("card__share-btn")[0];
const shareBtnImg = document.getElementsByClassName("card__share-btn-img")[0];

const cardBottom = document.getElementsByClassName("card__bottom")[0];
const cardCredit = document.getElementsByClassName("card__credit")[0];
const cardShare = document.getElementsByClassName("card__share")[0];

let isBtnFocused = false;
let isBtnActive = false;

// callback functions

function changeBtnStyle() {
    if (!isBtnActive && !isBtnFocused) {
        shareBtn.style.backgroundColor = "var(--clr-2)";
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    } else if (!isBtnActive && isBtnFocused) {
        shareBtn.style.backgroundColor = "var(--clr-4)";
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else if (isBtnActive && !isBtnFocused) {
        shareBtn.style.backgroundColor = "var(--clr-4)";
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else {
        shareBtn.style.backgroundColor = "var(--clr-2)";
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    }
}

function changeCardBottom() {
    if (!isBtnActive) {
        cardBottom.style.backgroundColor = "var(--clr-5)";

        cardCredit.style.display = "none";
        cardShare.style.display = "flex";

        isBtnActive = true;
    } else {
        cardBottom.style.backgroundColor = "var(--clr-1)";

        cardCredit.style.display = "flex";
        cardShare.style.display = "none";

        isBtnActive = false;
    }
}

function popOutShareSection() {
    if (!isBtnActive) {
        cardShare.classList += " card__share--active";
        isBtnActive = true;
    } else {
        cardShare.classList.remove("card__share--active");
        isBtnActive = false;
    }
    
}

// event listeners

shareBtn.addEventListener("mouseenter", function() {
    isBtnFocused = true;
    changeBtnStyle();
});

shareBtn.addEventListener("mouseleave", function() {
    isBtnFocused = false;
    changeBtnStyle();
});

shareBtn.addEventListener("click", function() {
    if (window.innerWidth < 800) {
        changeCardBottom();
        changeBtnStyle();
    } else {
        popOutShareSection();
        changeBtnStyle();
    }
});