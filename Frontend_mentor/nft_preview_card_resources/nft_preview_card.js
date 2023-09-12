const image = document.getElementById("card-img-top");
const filter = document.getElementById("card-filter");
const filterImage = document.getElementById("card-filter-img");

image.addEventListener("mouseenter", turnFilterOn);
image.addEventListener("mouseleave", turnFilterOff);

function turnFilterOn() {
    filter.style.display = "block";
    filterImage.style.display = "block";
}

function turnFilterOff() {
    filter.style.display = "none";
    filterImage.style.display = "none";
}