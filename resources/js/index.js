//Menu

let isClosed = true;

function openMenu() {
    const menu = document.getElementById("menu");
    const bars = document.getElementById("bars");
    if (isClosed) {
        bars.style.transform = "rotate(90deg)";
        menu.style.left = "0";
        isClosed = false;
    } else {
        bars.style.transform = "rotate(0deg)";
        menu.style.left = "calc(-75% - 4px)";
        isClosed = true;
    }
}

//dropdown menu

let mockIsClosed = true;
let javaIsClosed = true;

function dropMockMenu() {
    const mockArrow = document.getElementById("mock_arrow");
    const mockList = document.getElementById("mock_list");
    if (mockIsClosed) {
        mockArrow.style.transform = "rotate(90deg)";
        mockList.style.display = "block";
        mockIsClosed = false;
    } else {
        mockArrow.style.transform = "rotate(0deg)";
        mockList.style.display = "none";
        mockIsClosed = true;
    }
}

function dropJavaMenu() {
    const javaArrow = document.getElementById("java_arrow");
    const javaList = document.getElementById("java_list");
    if (javaIsClosed) {
        javaArrow.style.transform = "rotate(90deg)";
        javaList.style.display = "block";
        javaIsClosed = false;
    } else {
        javaArrow.style.transform = "rotate(0deg)";
        javaList.style.display = "none";
        javaIsClosed = true;
    }
}
