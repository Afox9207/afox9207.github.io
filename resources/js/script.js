let isMenuClosed = true;
let isMockMenuClosed = true;
let isJavaMenuClosed = true;

function openMenu() {
    const bars = document.getElementById("bars");
    const menu = document.getElementById("menu");
    if (isMenuClosed) {
        bars.style.transform = "rotate(90deg)";
        menu.style.left = "0";
        isMenuClosed = false;
    } else {
        bars.style.transform = "rotate(0deg)";
        menu.style.left = "-75%";
        isMenuClosed = true;
    }
}

function openMockMenu() {
    const mockArrow = document.getElementById("mock_arrow");
    const mockMenu = document.getElementById("mock_menu");
    if (isMockMenuClosed) {
        mockArrow.style.transform = "rotate(90deg)";
        mockMenu.style.maxHeight = "10rem"; /*number bigger than menu*/
        isMockMenuClosed = false;
    } else {
        mockArrow.style.transform = "rotate(0deg)";
        mockMenu.style.maxHeight = "0";
        isMockMenuClosed = true;
    }
}

function openJavaMenu() {
    const javaArrow = document.getElementById("java_arrow");
    const javaMenu = document.getElementById("java_menu");
    if (isJavaMenuClosed) {
        javaArrow.style.transform = "rotate(90deg)";
        javaMenu.style.maxHeight = "5rem"; /*number bigger than menu*/
        isJavaMenuClosed = false;
    } else {
        javaArrow.style.transform = "rotate(0deg)";
        javaMenu.style.maxHeight = "0";
        isJavaMenuClosed = true;
    }
}