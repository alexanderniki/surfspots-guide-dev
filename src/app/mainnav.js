/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleNavigation() {
    var x = document.getElementById("toolbar-topnav-menu");
    let appSurface = document.getElementById("app-content");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
        appSurface.addEventListener("click", function() {
            x.style.display = "none"; // closing menu
        });
    }
}