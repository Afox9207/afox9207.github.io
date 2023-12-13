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
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        accordionQuestion.style.color = "var(--clr-primary-1)";
    });
    // mouse leave event
    accordionBtns[i].addEventListener("mouseleave", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        
        if (accordionQuestion.className === "accordion-list__question accordion-list__question--active") {
            accordionQuestion.style.color = "var(--clr-primary-2)";
        } else {
            accordionQuestion.style.color = "var(--clr-neutral-3";
        }
    });
    // focus in event
    accordionBtns[i].addEventListener("focusin", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        accordionQuestion.style.color = "var(--clr-primary-1)";
    });
    // focus out event
    accordionBtns[i].addEventListener("focusout", function() {
        const accordionQuestion = this.getElementsByClassName("accordion-list__question")[0];
        
        if (accordionQuestion.className === "accordion-list__question accordion-list__question--active") {
            accordionQuestion.style.color = "var(--clr-primary-2)";
        } else {
            accordionQuestion.style.color = "var(--clr-neutral-3";
        }
    });
}
