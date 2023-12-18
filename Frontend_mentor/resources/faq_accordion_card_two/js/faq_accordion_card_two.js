const accordionBtns = document.getElementsByClassName("accordion-btn");

for (let i = 0; i < accordionBtns.length; i++) {
    // hover states
    accordionBtns[i].addEventListener("mouseenter", function() {
        const accordionQuestion = this.getElementsByClassName("accordion__question")[0];
        accordionQuestion.classList.toggle("accordion__question--hover");
    });

    accordionBtns[i].addEventListener("mouseleave", function() {
        const accordionQuestion = this.getElementsByClassName("accordion__question")[0];
        accordionQuestion.classList.toggle("accordion__question--hover");
    });

    // focus states
    accordionBtns[i].addEventListener("focusin", function() {
        const accordionQuestion = this.getElementsByClassName("accordion__question")[0];
        accordionQuestion.classList.toggle("accordion__question--hover");
    });

    accordionBtns[i].addEventListener("focusout", function() {
        const accordionQuestion = this.getElementsByClassName("accordion__question")[0];
        accordionQuestion.classList.toggle("accordion__question--hover");
    });

    // active states
    accordionBtns[i].addEventListener("click", function() {
        const accordionAnswer = this.getElementsByClassName("accordion__answer")[0];
        accordionAnswer.classList.toggle("accordion__answer--active");

        // set max height
        const maxHeight = accordionAnswer.scrollHeight + "px";
        accordionAnswer.style.setProperty("--max-height", maxHeight);

        // change icon
        const accordionIcon = this.getElementsByClassName("accordion-btn__icon")[0];
        if (accordionIcon.getAttribute("src") !== "./resources/faq_accordion_card_two/images/icon-minus.svg") {
            accordionIcon.setAttribute("src", "./resources/faq_accordion_card_two/images/icon-minus.svg");
        } else {
            accordionIcon.setAttribute("src", "./resources/faq_accordion_card_two/images/icon-plus.svg");
        }
    });
}