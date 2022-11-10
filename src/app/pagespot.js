/*
 * pagespot.js 
 */


class SpotPage extends Page {
    constructor() {
        super();
    }

    header(instanceState) {
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

    labels(instanceState) {
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

    summary(instanceState) {
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

    async weather() {
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

    orgs(spotcode) {
        let spots = data.spots;
        let orgs = data.orgs;
    
        let uicontainer = document.getElementById("collection-orgs");
    
        for (spot in spots) {
            currentSpot = spots[spot];
            if (currentSpot.code == spotcode) {
                let orgsArr = currentSpot.metadata.orgs_ids;
                console.log("ORGS ARR: ", orgsArr);
    
                for (item in orgsArr) {
                    itemID = orgsArr[item];
                    for (org in orgs) {
                        currentOrg = orgs[org];
                        if (currentOrg.id == itemID) {
                            console.log("MATCH: ", currentOrg.name);
    
                            let uicard = new UICardSimple();
                            uicard.overline = currentOrg.metadata.type;
                            uicard.primaryText = currentOrg.name;
                            uicard.secondaryText = currentOrg.metadata.summary;
    
                            uicontainer.appendChild(uicard);
                        }
                    }
                }
            }
        }
    }

    
}