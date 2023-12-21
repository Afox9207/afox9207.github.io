const shareBtn = document.getElementsByClassName("article-preview-footer__btn")[0];
const shareBtnImg = document.getElementsByClassName("article-preview-footer__btn-img")[0];

const footer = document.getElementsByClassName("article-preview-footer")[0];
const footerInactive = document.getElementsByClassName("flex-group--inactive")[0];
const footerActive = document.getElementsByClassName("flex-group--active")[0];

let isShareBtnActive = false;
let isShareBtnFocused = false;

// functions

function changeFooter() {
    if (!isShareBtnActive) {
        // change elements
        footerInactive.style.display = "none";
        footerActive.style.display = "flex";
        // change background color
        footer.style.backgroundColor = "var(--clr-5)";
        // make true
        isShareBtnActive = true;
    } else {
        // change elements
        footerInactive.style.display = "flex";
        footerActive.style.display = "none";
        // change background color
        footer.style.backgroundColor = "var(--clr-1)";
        // make false
        isShareBtnActive = false;
    }
}
function changeShareBtn() {
    if (!isShareBtnActive && !isShareBtnFocused) {
    // if btn is not active and not focused
    shareBtn.style.backgroundColor = "var(--clr-2)";
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    } else if (!isShareBtnActive && isShareBtnFocused) {
    // if btn is not active and is focused
    shareBtn.style.backgroundColor = "var(--clr-4)";
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else if (isShareBtnActive && !isShareBtnFocused) {
    // if btn is active and not focused
    shareBtn.style.backgroundColor = "var(--clr-4)";
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else {
    shareBtn.style.backgroundColor = "var(--clr-2)";
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg");
    }
}


shareBtn.addEventListener("click", function() {
    changeFooter();
    changeShareBtn()
});

shareBtn.addEventListener("mouseenter", function() {
    isShareBtnFocused = true;
    changeShareBtn();
});

shareBtn.addEventListener("mouseleave", function() {
    isShareBtnFocused = false;
    changeShareBtn();
});
