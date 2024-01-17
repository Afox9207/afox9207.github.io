const signUpScreen = document.getElementById("sign-up-form");
const confirmationScreen = document.getElementById("confirmation-message");

const emailInput = document.getElementById("email");
const errorMessage = document.querySelector(".newsletter__error-message");

const subscribeBtn = document.getElementById("subscribe-btn");
const dismissBtn = document.getElementById("dismiss-btn");

const userEmail = document.querySelector(".newsletter__user-email");

subscribeBtn.addEventListener("click", function() {
    if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        errorMessage.innerHTML = "Valid email required";

        emailInput.classList.add("newsletter__email-input--error");
    } else {
        signUpScreen.style.display = "none";
        confirmationScreen.style.display = "block";

        userEmail.innerHTML = emailInput.value;
    }
});

dismissBtn.addEventListener("click", function() {
    signUpScreen.style.display = "grid";
        confirmationScreen.style.display = "none";
});

emailInput.addEventListener("keyup", function() {
    emailInput.classList.remove("newsletter__email-input--error");

    errorMessage.innerHTML = "";
});