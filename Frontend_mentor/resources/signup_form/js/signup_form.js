const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password"); 
const formBtn = document.querySelector(".form__btn");

const firstNameErrorMessage = document.getElementById("first-name__error-message");
const lastNameErrorMessage = document.getElementById("last-name__error-message");
const emailErrorMessage = document.getElementById("email__error-message");
const passwordErrorMessage = document.getElementById("password__error-message");

formBtn.addEventListener("click", function() {

    if (!firstName.value) {
        firstNameErrorMessage.innerHTML = "First Name cannot be empty";

        firstName.style.backgroundImage = "url('./resources/signup_form/images/icon-error.svg')";
        firstName.style.backgroundPosition = "calc(100% - 1em)";
        firstName.style.backgroundRepeat = "no-repeat";
        
    } else {
        firstNameErrorMessage.innerHTML = "";

        firstName.style.background = "none";
    }
    
    if (!lastName.value) {
        lastNameErrorMessage.innerHTML = "Last Name cannot be empty";

        lastName.style.backgroundImage = "url('./resources/signup_form/images/icon-error.svg')";
        lastName.style.backgroundPosition = "calc(100% - 1em)";
        lastName.style.backgroundRepeat = "no-repeat";
    } else {
        lastNameErrorMessage.innerHTML = "";

        lastName.style.background = "none";
    }
    
    if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailErrorMessage.innerHTML = "Looks like this is not an email";

        email.style.backgroundImage = "url('./resources/signup_form/images/icon-error.svg')";
        email.style.backgroundPosition = "calc(100% - 1em)";
        email.style.backgroundRepeat = "no-repeat";
    } else {
        emailErrorMessage.innerHTML = "";

        email.style.background = "none";
    }
    
    if (!password.value) {
        passwordErrorMessage.innerHTML = "Password cannot be empty";

        password.style.backgroundImage = "url('./resources/signup_form/images/icon-error.svg')";
        password.style.backgroundPosition = "calc(100% - 1em)";
        password.style.backgroundRepeat = "no-repeat";
    } else {
        passwordErrorMessage.innerHTML = "";

        password.style.background = "none";
    }
});

firstName.addEventListener("keyup", function() {
    if (firstName.value) {
        firstNameErrorMessage.innerHTML = "";
        
        firstName.style.background = "none";
    }
});

lastName.addEventListener("keyup", function() {
    if (lastName.value) {
        lastNameErrorMessage.innerHTML = "";
        
        lastName.style.background = "none";
    }
});

email.addEventListener("keyup", function() {
    if (email.value) {
        emailErrorMessage.innerHTML = "";
        
        email.style.background = "none";
    }
});

password.addEventListener("keyup", function(){
    if (password.value) {
        passwordErrorMessage.innerHTML = "";
        
        password.style.background = "none";
    }
});

