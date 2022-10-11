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
            timezone: "Europe/Moscow",
        }
        
        this.fetchWeather();
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
        console.log(request);
        return request;
    }

    /*fetchWeather() {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", this.buildRequest(), false); // false for synchronous request
        xmlHttp.send(null);
        let result = JSON.parse(xmlHttp.responseText);
        console.log(result.daily.time);
        return result;
    }

    fetchWeatherAsync() {
        console.log("fetchweather2: init");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = JSON.parse(xhr.responseText);
                console.log("fetchWeather() async:");
                console.log(result.daily.time);
            }
        }
        xhr.open('GET', this.buildRequest(), true);
        xhr.send();
        return;
    }*/

    async fetchWeather() {
        let response = await fetch(this.buildRequest());
        console.log("WEATHER WITH FETCH:")
        console.log(response);
        let json = await response.json();
        console.log(json.daily.time);
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
            console.log("no data");
        }
        return coordinates;
    }

}