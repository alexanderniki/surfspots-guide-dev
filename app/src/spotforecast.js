/*
 * spotforecast.js
 * Predict working spot by wind direction
 */


class SpotForecast {


    constructor() {
        this.days = [];

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
                    if (windspeed[wind] > this.windspeedThreshold) {
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
                                this.workingSpots.push(workingSpot);
                            }
                        }
                    }
                }
            }
        }
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
        spots.forEach((e) => {
            let item = document.createElement("span") 
            item.innerHTML = `${e.strdate} - ${e.name} - ${Math.round(e.windspeed)} км/ч, ${WeatherUtils.windDirection(e.winddirection)}`;
            UIForecastView.appendChild(item);
        });

        
    }
}


function testCityForecast() {
    let sf = new SpotForecast();
    sf.getWorkingSpots();
}