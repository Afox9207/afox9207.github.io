const emailInput = document.querySelector(".form__email");
const errorMessage = document.querySelector(".form__error-message");
const btn = document.querySelector(".btn");

btn.addEventListener("click", function() {
    if (!emailInput.value || !emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailInput.style.outline = "2px solid var(--clr-secondary-2)";
        
        errorMessage.style.display = "block";
    }
});

emailInput.addEventListener("keyup", function() {
    emailInput.style.outline = "1px solid var(--clr-secondary-1)";
    
    errorMessage.style.display = "none";
});
