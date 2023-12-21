const shareBtn = document.getElementsByClassName("social__share-icon")[0];

// hover states
shareBtn.addEventListener("mouseenter", function() {
    const shareBtnImg = document.getElementsByClassName("social__share-icon-img")[0];

    shareBtn.classList.toggle("social__share-icon--inverse");
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg")
});

shareBtn.addEventListener("mouseleave", function() {
    const shareBtnImg = document.getElementsByClassName("social__share-icon-img")[0];

    shareBtn.classList.toggle("social__share-icon--inverse");
    shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg")
});

// click events

shareBtn.addEventListener("click", function() {
    const socialInactive = document.getElementsByClassName("social--inactive")[0];
    const socialActive = document.getElementsByClassName("social--active")[0];
    const footer = document.getElementsByClassName("article-preview-footer")[0];
    const shareImg = document.getElementsByClassName("social__share-icon-img")[0];

    if (window.getComputedStyle(socialInactive).display === "flex") {
        socialInactive.style.display = "none";
        socialActive.style.display = "flex";

        footer.style.backgroundColor = "var(--clr-5)";

        const shareBtnImg = document.getElementsByClassName("social__share-icon-img")[0];
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share-inverse.svg");
    } else {
        socialInactive.style.display = "flex";
        socialActive.style.display = "none";

        footer.style.backgroundColor = "var(--clr-1)";

        const shareBtnImg = document.getElementsByClassName("social__share-icon-img")[0];
        shareBtnImg.setAttribute("src", "./resources/article_preview/images/icon-share.svg")
    }
});