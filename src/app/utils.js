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
    let collection = data.stores;
    let uicontainer = document.getElementById("collection-stores");

    for (item in collection) {
        if (collection[item].is_active == true) {

            let uicard = new UICardSimple();

            uicard.overline = collection[item].metadata.type;
            uicard.primaryText = collection[item].name;
            uicard.secondaryText = collection[item].metadata.summary;
            uicard.openURL = collection[item].metadata.homepage;
            uicard.openNewPage = true;

            uicontainer.appendChild(uicard);
        }
    }
}


/* Get and display Schools, Rents and Instructors */
function displayOrgs() {
    let collection = data.orgs;
    let uicontainer = document.getElementById("collection-orgs");

    for (item in collection) {
        if (collection[item].is_active == true) {

            let uicard = new UICardSimple();

            uicard.overline = collection[item].metadata.type;
            uicard.primaryText = collection[item].name;
            uicard.secondaryText = collection[item].metadata.summary;
            uicard.openURL = collection[item].metadata.homepage;

            uicontainer.appendChild(uicard);
        }
    }
}


function displayCommunication() {
    let collection = data.communications;
    let uicontainer = document.getElementById("collection-communication");

    for (item in collection) {
        if (collection[item].is_active == true) {

            let uicard = new UICardCommunication();

            uicard.type = collection[item].metadata.type;
            uicard.channelType = collection[item].metadata.channel_type;
            uicard.primaryText = collection[item].name;
            uicard.secondaryText = collection[item].metadata.summary;
            uicard.link = collection[item].metadata.lin;
            uicard.linkText = collection[item].metadata.link_text;

            uicontainer.appendChild(uicard);
        }
    }
}


function displayPopularSpots() {
    let collection = data.spots;
    let uicontainer = document.getElementById("spots-popular");

    for (item in collection) {
        if (collection[item].is_popular == true) {

            //let uicard = new UICardSpot();
            let uicard = new UICardSimple();
            
            uicard.primaryText = collection[item].name;
            uicard.secondaryText = collection[item].metadata.location.water.name;
            uicard.openURL = collection[item].page_link;

            uicontainer.appendChild(uicard);
        }
    }
}


function groupSpots(){

    let waterTypes = data.water_types;
    let spots = data.spots;
    let groups = [];
    console.log("WATER TYPES:", waterTypes);

    // For every water type
    for(water in waterTypes) {
        console.log("water.id: ", waterTypes[water].id);
        let spotGroup = {};
        spotGroup.name = waterTypes[water].water;
        spotGroup.spots = [];
        // For every spot
        for (spot in spots) {
            // Take only active spots
            if(spots[spot].is_active == true) {
                // If ids are the same
                if (waterTypes[water].id == spots[spot].metadata.location.water.water_type_id) {
                    let currentSpot = {}
                    currentSpot.water = spots[spot].metadata.location.water.name;
                    currentSpot.name = spots[spot].name;
                    currentSpot.link = spots[spot].page_link;
                    if (spots[spot].metadata.location.water.water_type_id == 2) {
                        currentSpot.description = spots[spot].metadata.location.water.description;
                    }
                    spotGroup.spots.push(currentSpot);
                }
            }
        }
        groups.push(spotGroup);
        console.log(groups);
    }
    return groups;
}


function displaySpots() {
    let collection = groupSpots();
    let uicontainer = document.getElementById("collection-spots");

    for (item in collection) {

        let container = document.createElement("div");
        container.classList.add("uix-layout--grid--wrapped");
        
        let title = document.createElement("span");
        title.innerText = collection[item].name;
        uicontainer.appendChild(title);

        for (spot in collection[item].spots) {
            let uicard = new UICardSimple();
            uicard.primaryText = collection[item].spots[spot].name;
            if (collection[item].spots[spot].description) {
                uicard.secondaryText = collection[item].spots[spot].description;
            }
            uicard.openURL = collection[item].spots[spot].link;
            container.appendChild(uicard);
        }
    uicontainer.appendChild(container);
    }
}
