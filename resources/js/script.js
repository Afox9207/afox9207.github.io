const mockWebsiteTitle = document.getElementById("mock_website_title");
mockWebsiteTitle.addEventListener("mouseenter", openMockWebsiteList);
mockWebsiteTitle.addEventListener("mouseleave", closeMockWebsiteList);

const javaFunTitle = document.getElementById("java_fun_title");
javaFunTitle.addEventListener("mouseenter", openJavaFunList);
javaFunTitle.addEventListener("mouseleave", closeJavaFunList);

const mockWebsiteList = document.getElementById("mock_website_list").style;

const javaFunList = document.getElementById("java_fun_list").style;

function openMockWebsiteList() {
    mockWebsiteList.maxHeight = "8rem";
}

function closeMockWebsiteList() {
    mockWebsiteList.maxHeight = "";
}

function openJavaFunList() {
    javaFunList.maxHeight = "8rem";
}

function closeJavaFunList() {
    javaFunList.maxHeight = "";
}