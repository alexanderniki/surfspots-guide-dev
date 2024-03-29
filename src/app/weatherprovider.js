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

        this.waveParams = {
            latitude: this.getPlaceGeo()[0],
            longitude: this.getPlaceGeo()[1],
            timezone: "Europe/Moscow",
            daily: "wave_height_max",
            //past_days: 7,
        }
        
        //this.fetchWeather();
        //this.fetchWaveData();
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
        //console.log("WATHER API REQUEST: ", request);
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
                //console.log("The spot not found");
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

    async fetchWaveData() {
        /**
         * Fetching wave height from API
         */

        let request = "https://marine-api.open-meteo.com/v1/marine";
        let paramCounter = 0;

        for (let param = 0; param < Object.keys(this.waveParams).length; param++) {
            let tmp = Object.keys(this.waveParams)[param] + "=" + Object.values(this.waveParams)[param];
            if (paramCounter == 0) {
                request += "?" + tmp;
            }
            else {
                request += "&" + tmp;
            }
            paramCounter += 1;
        }

        let response = await fetch(request);
        let json = await response.json();
        return json;
    }
}