/*
 * pagespot.js 
 */


class SpotPage extends Page {
    constructor() {
        super();

        if (app.city) {
            this.data = new DataProvider().fromCity(app.city);
        }
        else {
            app.city = "spb";
            this.data = new DataProvider().fromCity(app.city);
        }
        
        this._spotcode = "";
        this._parseurl();
        this._data = data.spots;
        this._currentSpot = {};
        this._getCurrentSpot();
        
        return this;
    }

    get spotCode() {
        return this._spotcode;
    }

    get currentSpot() {
        return this._currentSpot;
    }

    get data() {
        return this._data;
    }

    set spotCode(code) {
        if (code) {
            this._spotcode = code;
        }
        else {
            // do nothing
        }
    }

    set currentSpot(spot) {
        if (spot) {
            this._currentSpot = spot;
        }
        else {
            // do nothig
        }
    }

    set data(data) {
        if (data) {
            this._data = data;
        }
        else {
            // do nothing
        }
    }


    _parseurl() {
        let currentURL = window.location.href;
        let suffix = currentURL.split("#");
        if (suffix.length == 1) {  // If there is no #spotcode in URL
            window.location.href = "index.html";  // Go to index page
        }
        else {
            let pageCode = suffix[suffix.length - 1];  // Take spotcode
            instanceState.spotcode = pageCode;
            this.spotCode = pageCode;
        }
        
    }

    _getCurrentSpot() {
        for (let item in this.data) {                     // For every spot
            if (this.data[item].code == this.spotCode) {  // Checking spotcode
                if (this.data[item].is_active == true) {  // Take only active spots
                    this.currentSpot = this.data[item];
                    break;
                }
                else {
                    // do nothing
                }
            }
            else {
                // do nothing
            }
        }
    }

    /**
     * 
     * @param {dict} instanceState - instanceState
     * @returns this Instanse of SpotPage
     */
    fromcode(instanceState) {
        this.spotCode = instanceState.spotcode;
        return this;
    }

    header() {
        let uicontainer = document.getElementById("place-title");

        try {
            let item = this.currentSpot.name;
            uicontainer.innerHTML = item;
        }
        catch(error) {
            console.log(error);
        }
    }

    labels() {
        let uicontainer = document.getElementById("collection-labels");

        try {
            let items = this.currentSpot.metadata.labels;
            for (let i in items) {
    
                let label = document.createElement('ui-label');
                label.setAttribute("ui-text", items[i]);
                uicontainer.appendChild(label);
    
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    infrastructureLabels() {
        let uicontainer = document.getElementById("collection-labels");
        let uilistcontainer = document.createElement("ul");

        let collection = this.currentSpot.metadata.labels;
        for (let item in collection) {
            let uiitem = document.createElement("li");
            uiitem.innerText = collection[item];
            uilistcontainer.appendChild(uiitem);
        }

        uicontainer.appendChild(uilistcontainer);
    }

    summary() {
    
        let uicontainer = document.getElementById("place-summary");
        try {
            let item = this.currentSpot.summary;
            uicontainer.innerHTML = item;
        }
        catch(error) {
            console.log(error);
        }
    }

    async weather() {
        let weatherProvider = new WeatherProvider(this.spotCode);
        let result = await weatherProvider.fetchWeather();
        let wavedata = await weatherProvider.fetchWaveData();
    
        let time = result.daily.time;
        let winddirection = result.daily.winddirection_10m_dominant;
        let windspeed = result.daily.windspeed_10m_max;
        let mintemp = result.daily.temperature_2m_min;
        let maxtemp = result.daily.temperature_2m_max;
        let waveheight = wavedata.daily.wave_height_max;
    
        // Container
        let uicontainer = document.getElementById("weather-data-card");
    
        for (let i = 0; i < time.length; i++) {
            // Prepare data
            let parcedDate = Date.parse(time[i]);  // Unix time
            let newDate = new Date(parcedDate);
            let weekday = DateUtils.weekday(newDate.getDay());
            let strdate = `${weekday}, ${newDate.getDate()}`;
            let strwind = `${Math.round(windspeed[i])} м/с • ${Math.round(winddirection[i])}° • ${WeatherUtils.windDirection(winddirection[i])}`;
            let strtemperarure = `${WeatherUtils.temperatureSign(WeatherUtils.avgTemp(mintemp[i], maxtemp[i]))} ${Math.round(WeatherUtils.avgTemp(mintemp[i], maxtemp[i]))} °C`;
            let strWaveHeightMax = `${waveheight[i]} м`;

            let uilistitem = new UIListItem();
            uilistitem.primaryText = strwind;
            uilistitem.overline = strdate + ", " + strtemperarure;
            uilistitem.secondaryText = `Волна: ${strWaveHeightMax}`;

            uicontainer.appendChild(uilistitem);
        }
    }

    orgs() {
        let orgs = data.orgs;
        let uicontainer = document.getElementById("collection-orgs");

        let orgsArr = this.currentSpot.metadata.orgs_ids;
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

    specification() {
        let uicontainer = document.getElementById("collection-specification");

        let spec = this.currentSpot.metadata.specification;
        for (let prop in spec) {
            let uilistitem = new UIListItem();
            uilistitem.primaryText = spec[prop].value;
            uilistitem.overline = spec[prop].name;

            uicontainer.appendChild(uilistitem);
        }
    }

    rules() {
        let uicontainer = document.getElementById("collection-rules");

        let rules = this.currentSpot.metadata.rules;
        for (let rule in rules) {
            let uiitem = document.createElement("p");
            uiitem.innerText = rules[rule];
            uicontainer.appendChild(uiitem);
        }
    }

    transport() {
        let uicontainer = document.getElementById("collection-transport");
        //let uilistcontainer = document.createElement("ul");

        let coordinates = new UIListItem();
        coordinates.overline = "Координаты";
        coordinates.primaryText = this.currentSpot.metadata.location.coordinates;
        uicontainer.appendChild(coordinates);

        let listHeader = new UIListItem();
        listHeader.overline = "Как добраться:";
        uicontainer.appendChild(listHeader);

        let transport = this.currentSpot.metadata.transport;
        for (let item in transport) {
            let listitem = new UIListItem();
            listitem.primaryText = transport[item];
            let uiitem = document.createElement("li");
            uiitem.innerText = transport[item];
            uicontainer.appendChild(listitem);
        }

        //uicontainer.appendChild(uilistcontainer);
    }

    description() {
        let uicontainer = document.getElementById("collection-description");

        let description = this.currentSpot.metadata.description;
        for (let item in description) {
            let uiitem = document.createElement("p");
            uiitem.innerText = description[item];
            uicontainer.appendChild(uiitem);
        }
    }

    webcamLinks() {
        let uicontainer = document.getElementById("collection-webcams");
        let uilistcontainer = document.createElement("ul");

        let webcams = this.currentSpot.metadata.webcam_links;
        for (let cam in webcams) {
            let uiitem = document.createElement("li");
            let webcamLink = document.createElement("a");
            webcamLink.setAttribute("href", webcams[cam].link);
            webcamLink.innerText = webcams[cam].name;

            uiitem.appendChild(webcamLink);
            uilistcontainer.appendChild(uiitem);
        }
        uicontainer.appendChild(uilistcontainer);
    }

    forecastLinks() {
        let uicontainer = document.getElementById("collection-wind");
        let uilistcontainer = document.createElement("ul");

        let forecasts = this.currentSpot.metadata.forecast_links;
        for (let cast in forecasts) {
            let uiitem = document.createElement("li");
            let forecastLink = document.createElement("a");
            forecastLink.setAttribute("href", forecasts[cast].link);
            forecastLink.innerText = forecasts[cast].name;

            uiitem.appendChild(forecastLink);
            uilistcontainer.appendChild(uiitem);
        }

        uicontainer.appendChild(uilistcontainer);
    }

    /*location() {
        let uicontainer = document.getElementById("spot-location");
        uicontainer.innerText = this.currentSpot.metadata.location.coordinates;
    }*/

    mapCode() {
        let uicontainer = document.getElementById("spot-map");
        uicontainer.src = this.currentSpot.metadata.location.map_code;
    }

    extrainfo() {
        let uicontainer = document.getElementById("spot-extrainfo");

        let description = this.currentSpot.metadata.extras;
        for (let item in description) {
            let uiitem = document.createElement("p");
            uiitem.innerText = description[item];
            uicontainer.appendChild(uiitem);
        }
    }

    breadcrumbs() {
        let uicontainer = document.getElementById("place-breadcrumbs");

        let city = this.currentSpot.metadata.location.city;
        let water = this.currentSpot.metadata.location.water.name;

        //let strBreadcrumbs = `<a class="uix-link--header" href="index.html">${city}</a> › Споты › ${water}`;
        //let strBreadcrumbs = `<a class="uix-link--header" href="index.html">${city}</a> › ${water}`;
        let strBreadcrumbs = `<a class="uix-link--header" href="index.html">SURFL</a>&nbsp; › &nbsp;${water}`;
        uicontainer.innerHTML = strBreadcrumbs;

    }

    pros() {
        let uicontainer = document.getElementById("collection-pros");
        let uilistcontainer = document.createElement("ul");

        let pros = this.currentSpot.metadata.pros;
        for (let i in pros) {
            let uiitem = document.createElement("li");
            uiitem.innerText = pros[i];
            uilistcontainer.appendChild(uiitem);
        }
        
        uicontainer.appendChild(uilistcontainer);
    }

    cons() {
        let uicontainer = document.getElementById("collection-cons");
        let uilistcontainer = document.createElement("ul");

        let cons = this.currentSpot.metadata.cons;
        for (let i in cons) {
            let uiitem = document.createElement("li");
            uiitem.innerText = cons[i];
            uilistcontainer.appendChild(uiitem);
        }
        
        uicontainer.appendChild(uilistcontainer);
    }

    transportHowto() {
        let uicontainer = document.getElementById("collection-transport-howto");

        let howto = this.currentSpot.metadata.transport_howto;
        for (let item in howto) {
            let uiitem = document.createElement("p");
            uiitem.innerHTML = howto[item];
            uicontainer.appendChild(uiitem);
        }
    }

}