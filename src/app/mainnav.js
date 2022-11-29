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

  /*function openTab(evt, tabID) {
    // Declare all variables
    var i, tabcontent, tablinks;


    console.log("mainnav.js::openTab()");
    let tabMenu = document.getElementById("toolbar-topnav-menu");
    console.log("TAB MENU: ", tabMenu);
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("uix-tabview--tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("uix-tabview--tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabID).style.display = "flex";
    evt.currentTarget.className += " active";
    
    // Close menu
    tabMenu.style.display = none;
}*/