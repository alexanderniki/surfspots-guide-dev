/**
 * dataprovider.js
 */


class DataProvider {

    constructor() {
        this.data = data;
        this.citycode = "";  // City code

        return this;
    }

    fromCity(citycode) {
        this.citycode = citycode;
        return this;
    }

    spots() {
        let cities = this.data.cities;
        let spots = [];
        let cityName = "";
        console.log("DataProvider().cities: ", cities);
        
        for (let item in cities) {
            if (cities[item].code == this.citycode) {
                console.log("DataProvider.spots().citycode", cities[item].code);
                cityName = cities[item].name;
                console.log("DataProvider.spots().cityname", cities[item].name);
            }
            else {
                // do nothing
            }
        }

        for (let item in this.data.spots) {  // For every spot
            console.log("DataProvider().spots().items: ", this.data.spots[item]);
            if (this.data.spots[item].is_active == true) {  // Take only active spots
                console.log("DataProvider().spots().active: ", this.data.spots[item]);
                console.log("DataProvider().spots().city: ", this.data.spots[item].metadata.location.city, cityName);
                if (this.data.spots[item].metadata.location.city === cityName) {
                    console.log("DataProvider().spots().spot: ", this.data.spots[item]);
                    spots.push(this.data.spots[item]);
                }
                else {
                    // do nothing
                }
            }
        }
        console.log("DataProvider().spots(): ", spots);
        return spots;
    }

    popularSpots() {
        let spotsData = this.spots();
        let spots = [];
        for (let item in spotsData) {  // For every spot
            if (spotsData[item].is_active == true) {  // Take only active spots
                if (spotsData[item].is_popular == true) {
                    spots.push(spotsData[item]);
                }
                else {
                    // do nothing
                }
            }
        }
        console.log("POPULAR SPOTS: ", spots);
        return spots;
    }

    orgs() {

    }

    stores() {

    }

    workshops() {

    }

    otherSpots () {

    }

    communications() {

    }


}