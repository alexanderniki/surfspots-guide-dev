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
    
                let label = document.createElement('ui-label');
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

    async weather(instanceState) {
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
    
        for (let spot in spots) {
            let currentSpot = spots[spot];
            if (currentSpot.code == spotcode) {
                let orgsArr = currentSpot.metadata.orgs_ids;
                console.log("ORGS ARR: ", orgsArr);
    
                for (let item in orgsArr) {
                    let itemID = orgsArr[item];
                    for (let org in orgs) {
                        let currentOrg = orgs[org];
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

    specification(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("collection-specification");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let spec = collection[item].metadata.specification;
                for (let prop in spec) {
                    let uilistitem = new UIListItem();
                    uilistitem.primaryText = spec[prop].value;
                    uilistitem.overline = spec[prop].name;

                    uicontainer.appendChild(uilistitem);
                }
            }
        }
    }

    rules(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("collection-rules");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let rules = collection[item].metadata.rules;
                for (let rule in rules) {
                    let uiitem = document.createElement("p");
                    uiitem.innerText = rules[rule];
                    uicontainer.appendChild(uiitem);
                }
            }
        }
    }

    transport(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("collection-transport");
        let uilistcontainer = document.createElement("ul");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let transport = collection[item].metadata.transport;
                for (let item in transport) {
                    let uiitem = document.createElement("li");
                    uiitem.innerText = transport[item];
                    uilistcontainer.appendChild(uiitem);
                }
            }
        }
        uicontainer.appendChild(uilistcontainer);
    }

    description(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("collection-description");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let description = collection[item].metadata.description;
                for (let item in description) {
                    let uiitem = document.createElement("p");
                    uiitem.innerText = description[item];
                    uicontainer.appendChild(uiitem);
                }
            }
        }
    }

    webcamLinks(spotcode) {
        let collection = data.spots;
        let uiwebcams = document.getElementById("collection-webcams");
        let uilistcontainer = document.createElement("ul");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let webcams = collection[item].metadata.webcam_links;
                for (let cam in webcams) {
                    let uiitem = document.createElement("li");
                    let webcamLink = document.createElement("a");
                    webcamLink.setAttribute("href", webcams[cam].link);
                    webcamLink.innerText = webcams[cam].name;

                    uiitem.appendChild(webcamLink);
                    uilistcontainer.appendChild(uiitem);
                }
            }
        }
        uiwebcams.appendChild(uilistcontainer);
    }

    forecastLinks(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("collection-wind");
        let uilistcontainer = document.createElement("ul");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let forecasts = collection[item].metadata.forecast_links;
                for (let cast in forecasts) {
                    let uiitem = document.createElement("li");
                    let forecastLink = document.createElement("a");
                    forecastLink.setAttribute("href", forecasts[cast].link);
                    forecastLink.innerText = forecasts[cast].name;

                    uiitem.appendChild(forecastLink);
                    uilistcontainer.appendChild(uiitem);
                }
            }
        }
        uicontainer.appendChild(uilistcontainer);
    }

    location(spotcode) {
        let collection = data.spots;
        let coordinates = document.getElementById("spot-location");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                coordinates.innerText = collection[item].metadata.location.coordinates;
            }
        }
    }

    mapCode(spotcode) {
        let collection = data.spots;
        let spotmap = document.getElementById("spot-map");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                spotmap.src = collection[item].metadata.location.map_code;
            }
        }
    }

    extrainfo(spotcode) {
        let collection = data.spots;
        let uicontainer = document.getElementById("spot-extrainfo");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let description = collection[item].metadata.extras;
                for (let item in description) {
                    let uiitem = document.createElement("p");
                    uiitem.innerText = description[item];
                    uicontainer.appendChild(uiitem);
                }
            }
        }
    }

    breadcrumbs(spotcode) {
        let config = data.config;
        let collection = data.spots;
        let uicontainer = document.getElementById("place-breadcrumbs");

        for (let item in collection) {
            if (collection[item].code == spotcode) {
                let city = collection[item].metadata.location.city;
                let water = collection[item].metadata.location.water.name;
                let spot = collection[item].name;

                let strBreadcrumbs = `<a class="uix-link--header" href="${config.home_url}">${city}</a> › ${water} › ${spot}`;
                uicontainer.innerHTML = strBreadcrumbs;
            }
        }
    }

    parseurl() {
        let currentURL = window.location.href;
        console.log("CURRENT URL: ", currentURL);
        let suffix = currentURL.split("#");
        console.log("URL SUFFIX: ", suffix);
        let pageCode = suffix[suffix.length - 1];
        console.log("PAGE CODE: ", pageCode);
        instanceState.spotcode = pageCode;
    }

}