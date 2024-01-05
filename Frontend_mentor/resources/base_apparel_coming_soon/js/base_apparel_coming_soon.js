const formInput = document.querySelector(".form__input");
const formBtn = document.querySelector(".form__btn");
const formErrorIcon = document.querySelector(".form__error-icon");
const formErrorMessage = document.querySelector(".form__error-message");

formInput.addEventListener("keyup", validateEmail);

function validateEmail() {
    if (!formInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && formInput.value) {
        formErrorMessage.style.visibility = "visible";
        formErrorIcon.style.visibility = "visible";
        return false;
    } else {
        formErrorMessage.style.visibility = "hidden";
        formErrorIcon.style.visibility = "hidden";
        return true;
    }
}

