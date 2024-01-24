const birthDayInput = document.getElementById("day");
const birthMonthInput = document.getElementById("month");
const birthYearInput = document.getElementById("year");

const errorMessageDay = document.getElementById("error-message-day");
const errorMessageMonth = document.getElementById("error-message-month");
const errorMessageYear = document.getElementById("error-message-year");

const btn = document.getElementById("btn");

const yearResult = document.getElementById("result-years");
const monthResult = document.getElementById("result-months");
const dayResult = document.getElementById("result-days");

btn.addEventListener("click", function() {

    // reset styles
    birthDayInput.classList.remove("age-calculator__input--error");
    birthMonthInput.classList.remove("age-calculator__input--error");
    birthYearInput.classList.remove("age-calculator__input--error");

    errorMessageDay.innerText = "";
    errorMessageMonth.innerText = "";
    errorMessageYear.innerText = "";

    // get user input and convert it to a number
    const birthDay = parseInt(birthDayInput.value, 10);
    const birthMonth = parseInt(birthMonthInput.value, 10);
    const birthYear = parseInt(birthYearInput.value, 10);


    // get current date and find difference
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let dayDifference = currentDay - birthDay;
    let monthDifference = currentMonth - birthMonth;
    let yearDifference = currentYear - birthYear;

    console.log(yearDifference);

    // validate user input
    
    // check if values exist
    if (birthDay && birthMonth && birthYear) {
        // check if inputs are in range
        if (birthDay < 1 || birthDay > 31) {
            birthDayInput.classList.add("age-calculator__input--error");
            errorMessageDay.innerText = "Must be a valid day";
        }
        if (birthMonth < 1 || birthMonth > 12) {
            birthMonthInput.classList.add("age-calculator__input--error");
            errorMessageMonth.innerText = "Must be a valid month";
        }
        // check if date is in past 
        if (yearDifference < 0) {
            birthYearInput.classList.add("age-calculator__input--error");
            birthMonthInput.classList.add("age-calculator__input--error");
            birthDayInput.classList.add("age-calculator__input--error");
            errorMessageYear.innerText = "Must be in the past";
        } else if (yearDifference = 0 && monthDifference < 0) {
            birthYearInput.classList.add("age-calculator__input--error");
            birthMonthInput.classList.add("age-calculator__input--error");
            birthDayInput.classList.add("age-calculator__input--error");
            errorMessageYear.innerText = "Must be in the past";
        } else if (yearDifference === 0 && monthDifference === 0 && dayDifference < 0) {
            birthYearInput.classList.add("age-calculator__input--error");
            birthMonthInput.classList.add("age-calculator__input--error");
            birthDayInput.classList.add("age-calculator__input--error");
            errorMessageYear.innerText = "Must be in the past";
        }
        // check if date is valid 
        if (birthMonth === 2) {
            // check if it's a leap year
            // must be divisible by 4
            if (birthYear % 4 === 0) {
                // if it a century birth year it must be divisible by 400
                if (birthYear % 100 === 0 && birthYear % 400 !== 0) {
                    if (birthDay > 28) {
                        birthDayInput.classList.add("age-calculator__input--error");
                        errorMessageDay.innerText = "Must be a valid date";
                    }
                } else {
                    if (birthDay > 29) {
                        birthDayInput.classList.add("age-calculator__input--error");
                        errorMessageDay.innerText = "Must be a valid date";
                    }
                }
            } else {
                if (birthDay > 28) {
                    birthDayInput.classList.add("age-calculator__input--error");
                    errorMessageDay.innerText = "Must be a valid date";
                }
            }
        } else if (birthMonth === 4 || birthMonth === 6 || birthMonth === 9 || birthMonth === 11) {
            if (birthDay > 30) {
                birthDayInput.classList.add("age-calculator__input--error");
                errorMessageDay.innerText = "Must be a valid date";
            }
        } else {
            if (birthDay > 31) {
                birthDayInput.classList.add("age-calculator__input--error");
                errorMessageDay.innerText = "Must be a valid date";
            }
        }
        
    } else {
        // if inputs don't exist
        if (!birthDay) {
            birthDayInput.classList.add("age-calculator__input--error");
            errorMessageDay.innerText = "This field is required";
        }
        if (!birthMonth) {
            birthMonthInput.classList.add("age-calculator__input--error");
            errorMessageMonth.innerText = "This field is required";
        }
        if (!birthYear) {
            birthYearInput.classList.add("age-calculator__input--error");
            errorMessageYear.innerText = "This field is required";
        }
    }

    // calculate age
    // get years

    // display on screen
    yearResult.innerText = yearDifference;
    monthResult.innerText = monthDifference;
    dayResult.innerText = dayDifference;

    // logs
    console.log("birth day: " + birthDay);
    console.log("birth month: " + birthMonth);
    console.log("birth year: " + birthYear);

    console.log("year difference: " + yearDifference);
    console.log("month difference: " + monthDifference);
    console.log("day difference: " + dayDifference);
});

