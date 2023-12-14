const accordionBtns = document.getElementsByClassName("accordion-list__btn");

for (let i = 0; i < accordionBtns.length; i++) {
    // click event
    accordionBtns[i].addEventListener("click", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        const accordionArrow = this.getElementsByClassName("accordion-list__arrow")[0];
        const accordionAnswer = this.getElementsByClassName("accordion-list__answer")[0];
        
        const maxHeight = accordionAnswer.scrollHeight + "px";
        accordionAnswer.style.setProperty("--max-height", maxHeight);
        
        accordionQuestion.classList.toggle("accordion-list__question--active");
        accordionArrow.classList.toggle("accordion-list__arrow--active");
        accordionAnswer.classList.toggle("accordion-list__answer--active");
    });
    // mouse enter event
    accordionBtns[i].addEventListener("mouseenter", function() {
        if (window.matchMedia("(hover: hover)").matches) {
            const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
            accordionQuestion.style.color = "var(--clr-primary-1)";
    
            const orangeBox = document.getElementsByClassName("accordion-img__box")[0];
            orangeBox.style.translate = "-75% -25%"
        }
    });
    // mouse leave event
    accordionBtns[i].addEventListener("mouseleave", function() {
        if (window.matchMedia("(hover: hover)").matches) {
            const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
            
            if (accordionQuestion.className === "accordion-list__question accordion-list__question--active") {
                accordionQuestion.style.color = "var(--clr-primary-2)";
            } else {
                accordionQuestion.style.color = "var(--clr-neutral-3";
            }
    
            const orangeBox = document.getElementsByClassName("accordion-img__box")[0];
            orangeBox.style.translate = "-50% -25%"
        }
    });
    // focus in event
    accordionBtns[i].addEventListener("focusin", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        accordionQuestion.style.color = "var(--clr-primary-1)";

        const orangeBox = document.getElementsByClassName("accordion-img__box")[0];
        orangeBox.style.translate = "-75% -25%"
    });
    // focus out event
    accordionBtns[i].addEventListener("focusout", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        
        if (accordionQuestion.className === "accordion-list__question accordion-list__question--active") {
            accordionQuestion.style.color = "var(--clr-primary-2)";
        } else {
            accordionQuestion.style.color = "var(--clr-neutral-3";
        }

        const orangeBox = document.getElementsByClassName("accordion-img__box")[0];
        orangeBox.style.translate = "-50% -25%"
    });
}

// img padding
const accordionImgContainer = document.getElementsByClassName("accordion-img__container")[0];
const accordionImg = document.getElementsByClassName("accordion-img")[0];

let accordionImgHeight = window.getComputedStyle(accordionImg).height;
// remove px from string
accordionImgHeight = accordionImgHeight.slice(0, accordionImgHeight.length - 2);
// turn string into number
accordionImgHeight = Number(accordionImgHeight);
// take %40 of height
let accordionImgHeightInside = accordionImgHeight * 0.4;
// add px back to number
if (window.innerWidth < 600) {
    accordionImgContainer.style.height = accordionImgHeightInside + "px";
}

// main layout padding
const mainLayout = document.getElementsByClassName("main-layout")[0];

if (window.innerWidth < 600) {
    let accordionImgHeightOutside = accordionImgHeight * 0.6;
    mainLayout.style.paddingTop = accordionImgHeightOutside  + "px";
}

// window resize
window.addEventListener("resize", function() {

    if (window.innerWidth < 600) {
        accordionImgContainer.style.height = accordionImgHeightInside + "px";
    } else {
        accordionImgContainer.style.height = "auto";
    }

    if (window.innerWidth < 600) {
        let accordionImgHeightOutside = accordionImgHeight * 0.6;
        mainLayout.style.paddingTop = accordionImgHeightOutside  + "px";
    } else {
        mainLayout.style.paddingTop = "0";
    }

});



