/*
 * spotforecast.js
 * Predict working spot by wind direction
 */

class SpotForecast {
    constructor() {
        this.weatherProvider = new WeatherProvider("ruspb");
        this.windspeedThreshold = 29;  // Windspeed 29 km/h
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
                this.workingSpots.push(currentSpot);                
            }
        }
    }

    async getWorkingSpots() {
        console.log("getWorkingSpot2()");
        let spots = data.spots;
        let currentSpot = '';

        let UIForecastView = document.getElementById("spot-forecast");

        for (let i = 0; i < spots.length; i++) {
            currentSpot = spots[i];

            if (currentSpot.is_active == true) {
                let weather = new WeatherProvider(currentSpot.code);
                let result = await weather.fetchWeather();
                
                let winddirection = result.daily.winddirection_10m_dominant;
                let windspeed = result.daily.windspeed_10m_max;
                let time = result.daily.time
                
                for (let j = 0; j < windspeed.length; j++) {
                    if (windspeed[j] > this.windspeedThreshold) {
                        // Check wind direction
                        let bestWind = currentSpot.metadata.wind_direction;
                        for (let m = 0; m < bestWind.length; m++) {
                            if (bestWind[m] == WeatherUtils.windDirection(winddirection[j])) {
                                let parcedDate = Date.parse(time[j]);  // Unix time
                                let newDate = new Date(parcedDate);
                                let weekday = DateUtils.weekday(newDate.getDay());
                                let strdate = `${weekday}, ${newDate.getDate()}`;

                                let item = document.createElement("span") 
                                item.innerHTML = `${strdate} - ${currentSpot.name} - ${Math.round(windspeed[j])} км/ч, ${WeatherUtils.windDirection(winddirection[j])}`;
                                //UIForecastView.innerHTML += `<br>${strdate} - ${currentSpot.name} - ${Math.round(windspeed[j])} км/ч, ${WeatherUtils.windDirection(winddirection[j])}`;
                                UIForecastView.appendChild(item);
                            }
                        }
                    }
                }
            }
        }
    }
}


function testCityForecast() {
    let sf = new SpotForecast();
    sf.forecast();
    sf.getWorkingSpots();
}