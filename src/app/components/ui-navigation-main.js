/**
 * ui-navigation-main.js
 */

/**
 * UINavigationMain
 */
class UINavigationMain extends HTMLElement {

    constructor() {
        super();
    }

    _setup() {
        let navbar = document.getElementById("toolbar-topnav-menu");
        let btnOpen = document.getElementById("toolbar-topnav-menubutton");
        let btnClose = document.getElementById("toolbar-topnav-menubutton--close");
        let appSurface = document.getElementById("app-content");
        
        btnClose.addEventListener("click", () => {
            navbar.style.display = "none"; // closing menu
            //this.toggle();
        });
        btnOpen.addEventListener("click", () => {
            navbar.style.display = "flex";
            //this.toggle();
        });
        /* appSurface.addEventListener("click", function() {
            if (navbar.style.display == "flex") {

            }
            navbar.style.display = "none"; // closing menu
        }); */
    }

    /**
     * Toggle main nav
     */
    toggle() {
        let navbar = document.getElementById("toolbar-topnav-menu");
        let appSurface = document.getElementById("app-content");
        
        if (navbar.style.display === "flex") {
            navbar.style.display = "none";
        } else {
            navbar.style.display = "flex";
            appSurface.addEventListener("click", function() {
                navbar.style.display = "none"; // closing menu
            });
        }
    }

    show() {}

    hide() {}

    /**
     * Render the component
     */
    render() {
        this.innerHTML = `
        <div><a href="javascript:void(0);" id="toolbar-topnav-menubutton--close">✕</a></div>
        <div class="uix-layout--vbox">
            <!-- Logo -->
            <div class="logo-container">
                <img src="media/main-logo.png" style="height:100%; width:auto" />
            </div>
            <!-- /Logo -->
            <div class="main-nav-divider"></div>
            <!-- CitySelector -->
            <div>
                <label class="body" for="list-cities">Россия,</label>
                <select class="body uix-dropdown" id="list-cities" name="list-cities">
                    <option class="uix-dropdown--option" value="spb">Санкт-Петербург</option>
                    <option class="uix-dropdown--option" value="konig">Калининград</option>
                </select>
                <script>page.cityList();</script>
            </div>
            <!-- /CitySelector -->
            <div class="main-nav-divider"></div>
            <!-- Links -->
            <div class="uix-layout--grid--wrapped id="">    
                <nav class="" id="">
                    <ul class="uix-layout--vbox--compact uix-tabbar--navlinks" id="">
                        <li class="uix-tabview--tablink active" onclick="page.openTab(event, 'main-spots')">Споты</li>
                        <!--<li class="" onclick="openTab(event, 'main-equp')">Экипировка</li>-->
                        <li class="uix-tabview--tablink" onclick="page.openTab(event, 'main-communication')">Общение</li>
                        <li class="uix-tabview--tablink" onclick="page.openTab(event, 'main-organisations')">Прокаты, школы, инструкторы</li>
                        <li class="uix-tabview--tablink" onclick="page.openTab(event, 'main-stores')">Магазины</li>
                        <li class="uix-tabview--tablink" onclick="page.openTab(event, 'main-persons')">Шейперы, мастерские</li>
                    </ul>
                </nav>
            </div>
            <!-- /Links -->
        </div>
        `
    }

    connectedCallback() {
        this.render();
        this._setup();
    }

}

customElements.define("ui-navigation--main", UINavigationMain);