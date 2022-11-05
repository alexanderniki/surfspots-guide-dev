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
    if (theme.getAttribute('href') == 'app/theme-light.css') {
        theme.setAttribute('href', 'app/theme-dark.css');
        sessionStorage.setItem('theme', "app/theme-dark.css");
    } else {
        theme.setAttribute('href', 'app/theme-light.css');
        sessionStorage.setItem('theme', "app/theme-light.css");
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
        theme = 'app/theme-light.css';
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


function displayShops() {
    let stores = data.stores;
    let storesContainer = document.getElementById("collection-stores");

    for (store in stores) {
        if (stores[store].is_active == true) {
            console.log("STORES: ", stores[store]);
            storeName = stores[store].name;
            storeSummary = stores[store].metadata.summary;
            storeType = stores[store].metadata.type;
            storeHomepage = stores[store].metadata.homepage;

            let uicardstore = new UICardStore();
            uicardstore.overline = storeType;
            uicardstore.primaryText = storeName;
            uicardstore.secondaryText = storeSummary;
            uicardstore.openURL = storeHomepage;

            storesContainer.appendChild(uicardstore);
        }
    }
}

/* Get and display Schools, Rents and Instructors */
function displayOrgs() {
    let orgs = data.orgs;
    let storesContainer = document.getElementById("collection-orgs");

    for (org in orgs) {
        if (orgs[org].is_active == true) {
            console.log("Orgs: ", orgs[org]);
            orgName = orgs[org].name;
            orgSummary = orgs[org].metadata.summary;
            orgType = orgs[org].metadata.type;
            orgHomepage = orgs[org].metadata.homepage;

            let uicardorg = new UICardStore();
            uicardorg.overline = orgType;
            uicardorg.primaryText = orgName;
            uicardorg.secondaryText = orgSummary;
            uicardorg.openURL = orgHomepage;

            storesContainer.appendChild(uicardorg);
        }
    }
}