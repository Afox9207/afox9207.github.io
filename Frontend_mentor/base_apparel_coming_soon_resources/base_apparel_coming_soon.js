const textInput = document.getElementById("text-input");
const errorImg = document.getElementById("error-img");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

submitBtn.addEventListener("click", validateEmail);

function validateEmail() {
    if(textInput.value) {
        message.style.color = "var(--Desaturated-Red)";
        message.innerHTML = "Thank You";
        textInput.style.borderColor = "var(--Desaturated-Red)";
        errorImg.style.display = "none";
    } else {
        message.style.color = "var(--Soft-Red)";
        message.innerHTML = "Please provide a valid email";
        textInput.style.borderColor = "var(--Soft-Red)";
        errorImg.style.display = "inline";
    }
}

