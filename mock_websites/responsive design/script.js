const bars = document.getElementById("bars");
bars.addEventListener("click", openNav);

function openNav() {
    
    const nav = document.querySelector(".nav").style;

    (!nav.maxHeight) ? nav.maxHeight = "14em" : nav.maxHeight = "";

}
