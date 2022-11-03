/*
 * gallery.js
 * Taken from https://dev.to/wepukhulutimothy/image-gallery-with-vanilla-javascript-518g
 */


let current = document.getElementById("current");
let opacity = 0.6;
let imgs = document.querySelectorAll(".img");

imgs.forEach(img => {
  img.addEventListener("click", (e) => {
    //reset opacity
    imgs.forEach(img => {img.style.opacity = 1;
    });
  current.src = e.target.src;
  //adding class 
  //current.classList.add("fade-in");
  //opacity
  e.target.style.opacity = opacity; 
  });
});

/*
 * Modal fullscreen popup window
 * Taken from: https://www.w3schools.com/howto/howto_css_modal_images.asp
 */

// Get the modal
var modal = document.getElementById("gallery-modal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("current");
var modalImg = document.getElementById("gallery-image");
/* Don't need caption right now */
// var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    document.body.style.overflow = "hidden";
    /* Don't need caption right now */
    // captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("uix-button--gallery--close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
}
/*
 * label.js
 * UILabel
 */


class UILabelSimple extends HTMLElement {

    constructor() {
        super();
        this._text = "";
    }

    get text() {
        return this._text;
    }

    set text(str) {
        if (str) {
            this._text = str;
        }
        else {
            console.log("UILabelSimple: ", "No text given");
        }
    }

    render() {
        
    }
}

customElements.define("ui-label--simple", UILabel);
/* 
 * footer.js 
 */

class Footer extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <section class="main-footer caption">
            <p>КОНТАКТЫ:</p>
            <ul>
                <li>Telegram/Whatsapp: @alexanderniki</li>
                <li>Instagram: <a href="https://instagram.com/alexanderniki">@alexanderniki</a></li>
            </ul>
            <p><button onclick="toggleTheme()">Тема: день/ночь</button>
        </section>
        `;
    }
}

customElements.define("footer-component", Footer);
/* 
 * equiplist.js
 */


class Equiplist extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <ul>
            <li><a href="equip-board.html">Доска</a></li>
            <li><a href="equip-apparel.html">Одежда</a></li>
            <li><a href="equip-accessories.html">Аксесуары</a></li>
        </ul>
        `
    }
}

customElements.define("equiplist-component", Equiplist);
/*
 * spotlist.js
 */


class Spotlist extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.innerHTML = `
        <ul>
            <li><a href="spot-atlantis.html">Атлантис</a></li>
            <li><a href="spot-osinovets.html">Осиновец</a></li>
            <li><a href="spot-lighthouse.html">Маяк</a></li>
            <li><a href="spot-bigsands.html">Большие пески</a></li>
            <li><a href="spot-motor.html">Бухта Моторная</a></li>
            <li><a href="spot-battery.html">Батарейная бухта</a></li>
            <!--<li>Мыс Флотский</li>
            <li>Спот "Парковка"</li>
            <li>Липово</li>
            <li><a href="">Бухта Желтая</a></li>-->
        </ul>
        `
    }

}

customElements.define("spotlist-component", Spotlist);
/*
 * utils.js
 * Various useful functions and classed
 */



/* Toggle CSS style using sessionStorage to store current theme */
function toggleTheme() {
    // Obtains an array of all <link>
    // elements.
    // Select your element using indexing.
    var theme = document.getElementsByTagName('link')[0];

    // Change the value of href attribute 
    // to change the css sheet.
    if (theme.getAttribute('href') == 'style/theme-light.css') {
        theme.setAttribute('href', 'style/theme-dark.css');
        sessionStorage.setItem('theme', "style/theme-dark.css");
    } else {
        theme.setAttribute('href', 'style/theme-light.css');
        sessionStorage.setItem('theme', "style/theme-light.css");
    }
}

function setTheme(value) {
  
    // Obtain the name of stylesheet 
    // as a parameter and set it 
    // using href attribute.
    // https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/

    var sheets = document.getElementsByTagName('link');
    sheets[0].href = value;
}

function getCurrentTheme() {

    // Initialize current theme
    // @TODO: rename the function

    var theme = sessionStorage.getItem('theme');
    if (theme != null) {
        setTheme(theme);
    }
    else {
        theme = 'style/theme-light.css';
        sessionStorage.setItem('theme', theme);
        setTheme(theme);
    }
    
}


function setBrowserDecodation() {
    
    // set Chrome toolbar color
}


function copyToClipboard(element) {
    let copyText = document.getElementById(element);
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText.innerText).then(() => alert("Координаты скопированы"));
      } else {
        console.log("Clipboard is not supported");
      }
}
/*
 * dateutils.js
 * Useful tools for working with date and time.
 */

class DateUtils {
    constructor() {
        // do nothing
    }

    static weekday(number) {
        const days = [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
        ]

        return days[number];
    }
}

/* 
 * footer.js 
 */

class Footer extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="uix-layout--hbox--wrapped"  id="footer--container--main">
                <span>
                    Контакты:
                    <ul>
                        <li>Telegram/WhatsApp: @alexanderniki</li>
                        <li>Instagram: <a href="https://instagram.com/alexanderniki">@alexanderniki</a></li>
                        <li><a href="mailto:inbox@alexanderniki.name">inbox@alexanderniki.name</a></li>
                    </ul>
                </span>
                <span>
                    Информация:
                    <ul>
                        <li><a href="about.html">О проекте</a></li>
                        <li><a href="contribute.html">Помочь проекту</a></li>
                        <li><a href="https://t.me/surflbot">Телеграм-бот @surflbot</a></li>
                    </ul>
                </span>
            </div>
            <span>Made with ❤ in Russia</span>
        `;
    }
}

customElements.define("component-footer", Footer);
/*
 * inlinenotification.js
 */


class UINotification {
    constructor() {
        this._title = "";     // Title, optional
        this._text = "";      // Text, optional
        this._overline = "";  // Overline, optional
        this._link = "";      // Link, optional
        this._action = "";    // Callback, optional
    }

    get title() {
        return this._title;
    }

    get text() {
        return this._text;
    }

    get overline() {
        return this._overline;
    }

    get link() {
        return this._link;
    }

    get action() {
        this._action();
    }

    set title(text) {
        this._title = text;
        return this;
    }

    set text(text) {
        this._text = text;
        return this;
    }

    set overline(text) {
        this._overline = text;
        return this;
    }

    set link(text) {
        this._link = text;
        return this;
    }

    set action(callback) {
        this._action = callback;
    }
}


class InlineNotificationView extends HTMLElement {
    constructor(uinotification) {
        super();
        this.notification = uinotification;
        this.card = "";
    }

    connectedCallback() {
        //console.log("connectedCallback");
        this.render();
    }

    createDOM() {

        //console.log("createDOM");
        
        // Create elements
        this.card = document.createElement("div");
        let link = document.createElement("a");
        let container = document.createElement("div");
        let notificationOverline = document.createElement("span");
        let notificationTitle = document.createElement("span");
        let notificationText = document.createElement("span");
        let btnClose = document.createElement("a");

        // Style elements
        this.card.classList.add("uix-layout--hbox");
        this.card.setAttribute("id", "inline-notification-card")
        link.setAttribute("href", this.notification.link);
        container.classList.add("uix-layout--vbox-compact");

        notificationOverline.innerHTML = this.notification.overline;
        notificationTitle.classList.add("title");
        notificationTitle.innerHTML = this.notification.title;
        notificationText.innerHTML = this.notification.text;

        btnClose.setAttribute("href", "#");
        btnClose.innerHTML = "✕";
        btnClose.setAttribute("onclick", "InlineNotificationView.hide()");

        // Pack elements
        container.appendChild(notificationOverline);
        container.appendChild(notificationTitle);
        container.appendChild(notificationText);

        link.appendChild(container);
        this.card.appendChild(link);
        this.card.appendChild(btnClose);

        this.appendChild(this.card);
    }

    static hide() {
        let notification = document.getElementById("inline-notification-card"); 
        notification.style.display = "none";
    }

    render() {
        this.createDOM();
    }
}

customElements.define("inline-notification", InlineNotificationView);
function main() {
    getCurrentTheme();
    setPreviousPage("index.html");
    setDonationFlag();
}
/*
 * spotforecast.js
 * Predict working spot by wind direction
 */


class SpotForecast {


    constructor() {
        this.days = [];

        this.weatherProvider = new WeatherProvider("ruspb");
        this.windspeedThreshold = 8;  // Windspeed 8 m/s (29 km/h)
        this.workingSpots = [];
    }


    async forecast() {
        let result = await this.weatherProvider.fetchWeather();

        let time = result.daily.time;
        let winddirection = result.daily.winddirection_10m_dominant;
        let windspeed = result.daily.windspeed_10m_max;
        let mintemp = result.daily.temperature_2m_min;
        let maxtemp = result.daily.temperature_2m_max;

        for (let i = 0; i < time.length; i++) {
            // Prepare data
            if (Math.round(windspeed[i]) > this.windspeedThreshold) {
                let parcedDate = Date.parse(time[i]);  // Unix time
                let newDate = new Date(parcedDate);
                let weekday = DateUtils.weekday(newDate.getDay());
                let strdate = `${weekday}, ${newDate.getDate()}`;
                let strwind = `${Math.round(windspeed[i])} км/ч • ${Math.round(winddirection[i])}° • ${WeatherUtils.windDirection(winddirection[i])}`;
                let currentSpot = {}
                currentSpot["wind"] = strwind;
                currentSpot["date"] = strdate;
                currentSpot["wind_direction"] = WeatherUtils.windDirection(winddirection[i]);
                //this.workingSpots.push(currentSpot);                
            }
        }
    }


    async getWorkingSpots() {
        let spots = data.spots;
        let currentSpot = '';

        // For each spot
        for (let spot = 0; spot < spots.length; spot++) {
            currentSpot = spots[spot];

            // Take active spots
            if (currentSpot.is_active == true) {
                let weather = new WeatherProvider(currentSpot.code);
                let result = await weather.fetchWeather();
                
                let winddirection = result.daily.winddirection_10m_dominant;
                let windspeed = result.daily.windspeed_10m_max;
                let time = result.daily.time;
                
                // Check wind speed
                for (let wind = 0; wind < windspeed.length; wind++) {
                    if (Math.round(windspeed[wind]) > this.windspeedThreshold) {
                        // Check wind direction
                        let bestWind = currentSpot.metadata.wind_direction;
                        for (let direction = 0; direction < bestWind.length; direction++) {
                            if (bestWind[direction] == WeatherUtils.windDirection(winddirection[wind])) {
                                let parcedDate = Date.parse(time[wind]);  // Unix time
                                let newDate = new Date(parcedDate);
                                let weekday = DateUtils.weekday(newDate.getDay());
                                let strdate = `${weekday}, ${newDate.getDate()}`;

                                let workingSpot = {};
                                workingSpot.originalDate = Date.parse(time[wind]);
                                workingSpot.strdate = strdate;
                                workingSpot.name = currentSpot.name;
                                workingSpot.windspeed = windspeed[wind];
                                workingSpot.winddirection = bestWind[direction];
                                this.workingSpots.push(workingSpot);
                            }
                        }
                    }
                }
            }
        }
        console.log("WORKING SPOTS: ", this.workingSpots);
        this.prepareForecast();
    }


    async getDays() {
        let result = await this.weatherProvider.fetchWeather();

        console.log(result.daily.time);
        for (let i = 0; i < result.daily.time.length; i++) {
            this.days.push(result.daily.time[i]);
        }
        //console.log("DAYS: ", result.daily.time.length, this.days);
    }


    prepareForecast() {
        
        let spots = this.workingSpots;

        spots.sort((a, b) => {
            let da = new Date(a.originalDate),
                db = new Date(b.originalDate);
            return da - db;
        });

        let UIForecastView = document.getElementById("spot-forecast");
        let forecastLoader = document.getElementById("forecast-loader");
        UIForecastView.removeChild(forecastLoader);
        spots.forEach((e) => {
            let item = document.createElement("span") 
            item.innerHTML = `${e.strdate} - ${e.name} - ${Math.round(e.windspeed)} м/с, ${e.winddirection}`;
            UIForecastView.appendChild(item);
        });

        
    }
}


function testCityForecast() {
    let sf = new SpotForecast();
    sf.getWorkingSpots();
}
/*
 * spotlist.js
 */


class Spotlist extends HTMLElement {


    constructor() {
        super();
    }


    connectedCallback() {
        this.render();
    }


    buildList() {
        let spots = data.spots;
        let list = document.createElement("ul");

        for (let i = 0; i < spots.length; i++) {
            // create list
            if (spots[i].is_active == true) {
                let item = document.createElement("li");
                let link = document.createElement("a");
                let linkText = document.createTextNode(spots[i].name);
                link.setAttribute("href", spots[i].page_link);

                link.appendChild(linkText);
                item.appendChild(link);
                list.appendChild(item);
            }
        }
        console.log(list);
        return list;
    }


    render() {
        this.appendChild(this.buildList());
    }


}


customElements.define("spotlist-component", Spotlist);
/*
 * uicardminimal.js
 */


class UICardMinimal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'
        
        this._overline = "";
        this._title = "";
        this._subtitle = "";

        return this;
    }

    connectedCallback() {
        this.render();
    }

    new(overline, title, subtitle) {
        this.overline = overline;
        this.title = title;
        this.subtitle = subtitle;

        return this;
    }

    get overline() {
        return this._overline;
    }

    get title() {
        return this._title;
    }

    get subtitle() {
        return this._subtitle;
    }

    set overline(text) {
        if (text) {
            this._overline = text;
            this.update();
        }
        else {
            // do nothig
        }
    }

    set title(text) {
        if (text) {
            this._title = text;
            this.update();
        }
        else {
            // do nothing
        }
    }

    set subtitle(text) {
        if (text) {
            this._subtitle = text;
            this.update();
        }
        else {
            // do nothing
        }
    }

    update() {
        // update
    }

    render() {
        let container = document.getElementById("spot-forecast");

        let uicard = document.createElement("div");
        uicard.classList.add("uix-card--spot--minimal");
        // uicard.classList.add("uix-card--link--overall");

        let cardContent = document.createElement("div");
        cardContent.classList.add("uix-layout--vbox");

        let cardOverline = document.createElement("span");
        cardOverline.innerText = this.overline;

        let cardTitle = document.createElement("span");
        cardTitle.classList.add("headline-6");
        cardTitle.classList.add("typography-bold");
        cardTitle.innerText = this.title;

        let cardSubtitle = document.createElement("span");
        cardSubtitle.classList.add("uix-card--secondary-text");
        cardContent.innerText = this.subtitle;

        // Pack elements
        cardContent.appendChild(cardOverline);
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardSubtitle);

        uicard.appendChild(cardContent);
        //container.appendChild(uicard);

        this.appendChild(uicard);
    }
}

customElements.define("uicard--minimal", UICardMinimal);
/* 
 * uix-labels.js
 * Labels components
 */


/* const UILabelTemplate = document.createElement("template");
UILabelTemplate.innerHTML = `
    <span class="
        uix-label--simple 
        body-2 
        typography-uppercase
        ">
        <slot name="uilabel--text"></slot>
    </span>
`;*/


class UILabel extends HTMLElement {
    

    constructor() {
        super();
        /*let shadow = this.attachShadow(
            {
                mode: 'open'
            }
        );
        shadow.appendChild(UILabelTemplate.content.cloneNode(true));*/
        return this;
    }


    connectedCallback() {
        this.text = this.getAttribute("ui-text");
        this.render();
    }


    get text() {
        return this._text;
    }


    set text(str) {
        if (str) {
            this._text = str;
            //this.render();
        }
        else {
            // do nothing
        }
    }


    render() {
        let label = document.createElement("span");
        label.className += " uix-label--simple";
        label.className += " body-2";
        label.className += " typography-uppercase";
        label.innerHTML = this.text;
        this.appendChild(label);

        //console.log(this.innerHTML);

        //this.innerHTML = this.text;
    }

    
}


customElements.define("ui-label", UILabel);
/*
 * tabview.js
 * TabView
 * Taken from: https://www.w3schools.com/howto/howto_js_tabs.asp
 */

function openTab(evt, tabID) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
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
}
/*
 * utils.js
 * Various useful functions and classed
 */

class AppInstanceState {
    locale = "";
    city = "";
    theme = "";
    prevPage = "";
    
    constructor() {}

    get locale() {
        // get locale from sessionStorage
    }

    get city() {
        // get city from sessionStorage
    }

    get theme() {
        // get theme from sessionStorage
    }

    get prevPage() {

    }

    set locale(locale) {
        sessionStorage.setItem('locale', 'ru_RU');
    }

    set city(city) {
        sessionStorage.setItem('city', 'Санкт-Петербург');
    }

    set theme(themeStyle) {
        sessionStorage.setItem('theme', themeStyle);
    }

    set prevPage(pageLink) {
        sessionStorage.setItem('prevPage', prevPage);
    }
}

let appInstanceState = {
    locale: "",
    city: "",
    theme: "",
    prevPage: "",
};

function setLocale(locale) {
    sessionStorage.setItem('locale', 'ru_RU');
    appInstanceState.locale = 'ru_RU';
}

function setCity(city) {
    sessionStorage.setItem('city', 'Санкт-Петербург');
    appInstanceState.city = 'Санкт-Петербург';
}

function setPreviousPage(pageLink) {
    console.log("setPreviousPage()");
    sessionStorage.setItem('prevPage', pageLink);
    appInstanceState.prevPage = pageLink;
}

function getPreviousPage() {

    // TODO: можно сделать через два параметра: currentPage и previousPage
    try {
        let prevPage = sessionStorage.getItem("prevPage");
    }
    catch (err) {
        return "index.html";
    }

    return prevPage;
}

function navigateToPage(page) {
    window.location.href = page;
}

function adjustBackButton() {
    let backButton = document.getElementById("button--back");
    backButton.onclick = window.history.back();
    /*
    if (window.history.length === 1) {
        // Direct link
        console.log("DIRECT LINK");
        backButton.onclick = navigateToPage("index.html");
    }
    else if (window.history.length != 1 && sessionStorage.getItem('prevPage') == null){
        backButton.onclick = navigateToPage("index.html");
        //backButton.onclick = window.history.back();
        console.log("FROM SITE");
        alert("FROM SITE");
    }
    else {
        backButton.onclick = window.history.back();
    }
    console.log("BACK"); */
}


/* Toggle CSS style using sessionStorage to store current theme */
function toggleTheme() {
    // Obtains an array of all <link>
    // elements.
    // Select your element using indexing.
    var theme = document.getElementsByTagName('link')[0];

    // Change the value of href attribute 
    // to change the css sheet.
    if (theme.getAttribute('href') == 'dist/theme-light.css') {
        theme.setAttribute('href', 'dist/theme-dark.css');
        sessionStorage.setItem('theme', "dist/theme-dark.css");
    } else {
        theme.setAttribute('href', 'dist/theme-light.css');
        sessionStorage.setItem('theme', "dist/theme-light.css");
    }
}

function setTheme(value) {
  
    // Obtain the name of stylesheet 
    // as a parameter and set it 
    // using href attribute.
    // https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/

    var sheets = document.getElementsByTagName('link');
    sheets[0].href = value;
}

function getCurrentTheme() {

    // Initialize current theme
    // @TODO: rename the function

    var theme = sessionStorage.getItem('theme');
    if (theme != null) {
        setTheme(theme);
    }
    else {
        theme = 'dist/theme-light.css';
        sessionStorage.setItem('theme', theme);
        setTheme(theme);
    }
    
}


function setBrowserDecodation() {
    // set Chrome toolbar color
}


function copyToClipboard(element) {
    let copyText = document.getElementById(element);
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText.innerText).then(() => alert("Координаты скопированы"));
      } else {
        console.log("Clipboard is not supported");
      }
}


function getHistoryLength() {
    // For debug purpose only
    console.log("HISTORY: " + window.history.length);
    return window.history.length;
}


/* 
 * Utils for pages
 */

/*
 * Labels in the header at a spot page
 */
function getSpotLabels(instanceState) {
    let spots = data.spots;
    let currentSpot = '';
    for (let i = 0; i < spots.length; i++) {
        if (spots[i].code == instanceState.spotcode) {
            currentSpot = spots[i];
        }
        else {
            // do nothing
            console.log("The spot not found");
        }
    }

    let output = document.getElementById("labels");
    try {
        let items = currentSpot.metadata.labels;
        for (let i = 0; i < items.length; i++) {
            //label = document.createElement('span');
            //label.innerHTML = items[i];
            // label.classList.add('uix-label--simple');
            //label.className += "uix-label--simple";
            //label.className += " body-2";
            //label.className += " typography-uppercase";
            //output.appendChild(label);

            label = document.createElement('ui-label');
            label.setAttribute("ui-text", items[i]);
            output.appendChild(label);

        }
    }
    catch(error) {
        console.log(error);
        console.log("no labels");
    }
}

function getPageHeader(instanceState) {
    let spots = data.spots;
    let currentSpot = '';

    for (let i = 0; i < spots.length; i++) {

        if (spots[i].code == instanceState.spotcode) {
            currentSpot = spots[i];
            console.log(spots[i]);
        }
        else {
            // do nothing
            console.log("getPageHeader(): spot not found");
        }
    }

    let output = document.getElementById("place-title");
    try {
        let item = currentSpot.name;
        console.log(item);
        output.innerHTML = item;
    }
    catch(error) {
        // console.log(error);
        console.log("no header");
    }
}

function getPageSummary(instanceState) {
    let spots = data.spots;
    let currentSpot = '';

    for (let i = 0; i < spots.length; i++) {

        if (spots[i].code == instanceState.spotcode) {
            currentSpot = spots[i];
        }
        else {
            // do nothing
            console.log("The spot not found");
        }
    }

    let output = document.getElementById("place-summary");
    try {
        let item = currentSpot.summary;
        console.log(item);
        output.innerHTML = item;
    }
    catch(error) {
        // console.log(error);
        console.log("no summary");
    }
}

/*
 * Get weather forecast
 */
async function getWeather() {
    let weatherProvider = new WeatherProvider(instanceState.spotcode)
    let result = await weatherProvider.fetchWeather();
    //console.log("FETCH WEATHER RESULT");
    //console.log(result);

    let time = result.daily.time;
    let winddirection = result.daily.winddirection_10m_dominant;
    let windspeed = result.daily.windspeed_10m_max;
    let mintemp = result.daily.temperature_2m_min;
    let maxtemp = result.daily.temperature_2m_max;

    // Container
    let weatherForecast = document.getElementById("weather-data");

    for (let i = 0; i < time.length; i++) {
        // Prepare data
        let parcedDate = Date.parse(time[i]);  // Unix time
        let newDate = new Date(parcedDate);
        let weekday = DateUtils.weekday(newDate.getDay());
        let strdate = `${weekday}, ${newDate.getDate()}`;
        let strwind = `${Math.round(windspeed[i])} м/с • ${Math.round(winddirection[i])}° • ${WeatherUtils.windDirection(winddirection[i])}`;
        let strtemperarure = `${WeatherUtils.temperatureSign(WeatherUtils.avgTemp(mintemp[i], maxtemp[i]))} ${Math.round(WeatherUtils.avgTemp(mintemp[i], maxtemp[i]))} °C`;

        // Card
        let forecastCard = document.createElement("div");
        forecastCard.classList.add("uix-layout--vbox-compact");
        forecastCard.classList.add("uix-card--weather--day");

        // Items
        let dateElement = document.createElement("span");
        dateElement.innerHTML = strdate;

        let windElement = document.createElement("span");
        windElement.classList.add("body-2");
        windElement.innerHTML = strwind;

        let temperatureElement = document.createElement("span");
        temperatureElement.innerHTML = strtemperarure;
        
        // Layout
        forecastCard.appendChild(dateElement);
        forecastCard.appendChild(windElement);
        forecastCard.appendChild(temperatureElement);
        weatherForecast.appendChild(forecastCard);
    }
}


function getPopularSpots() {
    let spots = data.spots;

    for (let i = 0; i < spots.length; i++) {
        if (data.spots[i].is_popular == true) {
            // container
            let container = document.getElementById("spots-popular");

            // create card
        }
    }
}


function getSessionFlag(flag) {
    /*
     * Check if given flag exists and if so, return it value (0 or 1)
     * flag: String
     */

    let value = sessionStorage.getItem(flag);
    return value;
}

function setSessioFlag(flag, value) {
    /*
     * Set a flag to 
     */

    if (value == 0 || value == 1) {
        sessionStorage.setItem(flag, value)
    } else {
        // do nothing
    }
}


function setDonationFlag() {
    setSessioFlag('DonationAlertViewed', 0);
}


function toggleDonationFlag() {
    let flag = getSessionFlag('DonationAlertViewed');
    if (flag == 0) {
        setSessioFlag('DonationAlertViewed', 1);  // Viewed
    }
}


function toggleDonationAlert() {
    let flag = getSessionFlag('DonationAlertViewed');
    let donationAlert = document.getElementById('donation-alert');
    if (flag == 0) {
        donationAlert.style.display = "none";  // hide alert
        toggleDonationFlag();
    }
}

function displayNotification() {

    console.log("displayNotification");

    let notifications = data.notifications[0];
    console.log(notifications);

    let notification = new UINotification();
    console.log(notification);
    notification.overline = notifications.overline;
    notification.title = notifications.title;
    notification.text = notifications.text;
    notification.link = notifications.link
    console.log(notification);
    let uinotification = new InlineNotificationView(notification);
    console.log("uinotification:");
    console.log(uinotification);

    document.getElementById("inline-notification").appendChild(uinotification);
    //document.body.appendChild(uinotification);
}
/*
 * weatherprovider.js
 * Work with weather. 
 */

class WeatherProvider {


    constructor(placecode) {

        this.placeCode = placecode;
        this.baseURL = "https://api.open-meteo.com/v1/forecast";
        this.params = {
            latitude: this.getPlaceGeo()[0],
            longitude: this.getPlaceGeo()[1],
            daily: "temperature_2m_max,temperature_2m_min,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant",
            windspeed_unit: "ms",
            timezone: "Europe/Moscow",
        }
        
        //this.fetchWeather();
    }


    buildRequest() {
        let request = this.baseURL;
        let paramCounter = 0;
        for (let param = 0; param < Object.keys(this.params).length; param++) {
            let tmp = Object.keys(this.params)[param] + "=" + Object.values(this.params)[param];
            if (paramCounter == 0) {
                request += "?" + tmp;
            }
            else {
                request += "&" + tmp;
            }
            paramCounter += 1;
        }
        console.log("WATHER API REQUEST: ", request);
        return request;
    }


    async fetchWeather() {
        let response = await fetch(this.buildRequest());
        let json = await response.json();
        return json;
    }


    getPlaceGeo() {
        // get place coordinates to build correct request
        let coordinates = [];
        let spots = data.spots;
        let currentSpot = '';
        for (let i = 0; i < spots.length; i++) {
            if (spots[i].code == this.placeCode) {
                currentSpot = spots[i];
            }
            else {
                // do nothing
                console.log("The spot not found");
            }
        }

        try {
            let lat = currentSpot.metadata.location.lat;
            let long = currentSpot.metadata.location.long;
            coordinates.push(lat);
            coordinates.push(long);
        }
        catch (error) {
            console.log(error);
        }
        return coordinates;
    }
    

}
/*
 * weatherutils.js
 * Useful tools for working with weather forecast.
 */

 class WeatherUtils {


    constructor () {
        // do nothing
    }


    static windDirection(degrees) {
        let direction = "";
        if (degrees > 22.5 && degrees < 67.5 ) {
            direction = "NE ↙";
        }
        else if (degrees >= 67.5 && degrees < 112.5) {
            direction = "E ←";
        }
        else if (degrees >= 112.5 && degrees < 157.5) {
            direction = "SE ↖";
        }
        else if (degrees >= 157.5 && degrees < 202.5) {
            direction = "S ↑";
        }
        else if (degrees >= 202.5 && degrees < 247.5) {
            direction = "SW ↗";
        }
        else if (degrees >= 247.5 && degrees < 292.5) {
            direction = "W →";
        }
        else if (degrees >= 292.5 && degrees < 337.5) {
            direction = "NW ↘";
        }
        else {
            direction = "N ↓"
        }
        return direction;
    }

    
    static avgTemp(bottom, top) {
        let avg = (bottom + top) / 2;
        return avg
    }


    static temperatureSign(temperature) {
        let sign = "";
        if (temperature < 0) {
            sign = "-";
        } else if (temperature > 0) {
            sign = "+";
        } else {
            sign = "";
        }
        return sign;
    }


}
