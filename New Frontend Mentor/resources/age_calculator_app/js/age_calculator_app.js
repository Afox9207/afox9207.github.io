const btn = document.getElementById("btn");

const yearResult = document.getElementById("result-years");
const monthResult = document.getElementById("result-months");
const dayResult = document.getElementById("result-days");

btn.addEventListener("click", function() {
    
    // user input
    const birthDay = document.getElementById("day").value;
    const birthMonth = document.getElementById("month").value;
    const birthYear = document.getElementById("year").value;

    // get current date and find difference
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let dayDifference = currentDay - birthDay;
    let monthDifference = currentMonth - birthMonth;
    let yearDifference = currentYear - birthYear;

    // calculate age
    if (yearDifference < 0) {
        
    } else if (monthDifference > 0) {
        
    } else if (monthDifference === 0 && dayDifference >= 0) {

    } else {
        yearDifference -= 1;
        if (monthDifference <= 0) {
            if (dayDifference > 0) {
                monthDifference += 12;
            } else {
                monthDifference = 11 - monthDifference
            }
        }
    }

    if (dayDifference < 0) {
        dayDifference += 30;
        monthDifference -= 1;
    }

    // display on screen
    yearResult.innerText = yearDifference;
    monthResult.innerText = monthDifference;
    dayResult.innerText = dayDifference;

    // logs

    // console.log("currentYear: " + currentYear);
    // console.log("currentMonth: " + currentMonth);
    // console.log("currentDay: " + currentDay);

    // console.log("birthYear: " + birthYear);
    // console.log("birthMonth: " + birthMonth);
    // console.log("birthDay: " + birthDay);

    // console.log("yearDifference: " + yearDifference);
    // console.log("monthDifference: " + monthDifference);
    // console.log("dayDifference: " + dayDifference);

});
