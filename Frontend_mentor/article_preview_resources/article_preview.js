const articleInfo = document.getElementById("article-info");
const shareList = document.getElementById("share-list");
const iconOneBackground = document.getElementById("icon-one-background"); 
const iconTwoBackground = document.getElementById("icon-two-background");
const iconOneImg = document.getElementById("icon-one-img");
const iconTwoImg = document.getElementById("icon-two-img");

iconOneBackground.addEventListener("mouseenter", startIconHoverStateOne);
iconOneBackground.addEventListener("mouseleave", stopIconHoverStateOne);

iconTwoBackground.addEventListener("mouseenter", startIconHoverStateTwo);
iconTwoBackground.addEventListener("mouseleave", stopIconHoverStateTwo);

iconOneBackground.addEventListener("click", showShareList);
iconTwoBackground.addEventListener("click", showArticleInfo);

function startIconHoverStateOne() {
    iconOneBackground.style.backgroundColor = "var(--Desaturated-Dark-Blue)";
    iconOneImg.src = "./article_preview_resources/images/icon-share-two.svg";
}

function stopIconHoverStateOne() {
    iconOneBackground.style.backgroundColor = "var(--Light-Grayish-Blue)";
    iconOneImg.src = "./article_preview_resources/images/icon-share.svg";
}

function startIconHoverStateTwo() {
    iconTwoBackground.style.backgroundColor = "var(--Light-Grayish-Blue)";
    iconTwoImg.src = "./article_preview_resources/images/icon-share.svg";
}

function stopIconHoverStateTwo() {
    iconTwoBackground.style.backgroundColor = "var(--Desaturated-Dark-Blue)";
    iconTwoImg.src = "./article_preview_resources/images/icon-share-two.svg";
}

function showShareList() {
    articleInfo.style.display = "none";
    shareList.style.display = "block";
    iconTwoBackground.style.backgroundColor = "var(--Desaturated-Dark-Blue)";
}

function showArticleInfo() {
    shareList.style.display = "none";
    articleInfo.style.display = "block";
}