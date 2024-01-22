const signUpScreen = document.getElementById("sign-up-screen");
const confirmationScreen = document.getElementById("confirmation-screen");

const errorMessage = document.getElementById("error-message");
const emailInput = document.getElementById("email-input")

const userEmail = document.getElementById("user-email");

const subscribeBtn = document.getElementById("subscribe-btn");
const dismissBtn = document.getElementById("dismiss-btn");

subscribeBtn.addEventListener("click", function() {
    if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailInput.classList.add("email__input--error");

        errorMessage.innerText = "Valid email required";
    } else {
        userEmail.innerText = emailInput.value;

        signUpScreen.style.display = "none";
        confirmationScreen.style.display = "grid";
    }
});

dismissBtn.addEventListener("click", function() {
    signUpScreen.style.display = "grid";
        confirmationScreen.style.display = "none";
});

emailInput.addEventListener("keyup", function() {
    emailInput.classList.remove("email__input--error");

        errorMessage.innerText = "";
});