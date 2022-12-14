/**
 * dataprovider.js
 */


class DataProvider {

    constructor() {
        this.data = data;
        this.citycode = "";  // City code
        this.personcode = "";  // Person code

        return this;
    }

    fromCity(citycode) {
        this.citycode = citycode;
        return this;
    }

    _getCityByCode(code) {
        let result = {};
        if (code) {
            let collection = this.data.cities;
            for (let item in collection) {
                if (collection[item].code == code) {
                    if(collection[item].is_active == true) {
                        result = collection[item];
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
        else {
            // do nothing
        }
        return result;
    }

    getPersonByCode(code) {
        let result = {};

        if (code) {
            let collection = this.persons();
            for (let item in collection) {
                if (collection[item].code == code) {
                    result = collection[item];
                }
                else {
                    // do nothing
                }
            }
        }
        else {
            // do nothing
        }

        return result;
    }

    by(key, value) {
        // @TODO: make generic search function. Something like reference(this.data.cities().by(id, 1));
    }

    getReferenceItemById(reference, id) {
        let result = {};
        for (let item in reference) {
            if (reference[item].id == id) {
                result = reference[item];
                break;
            }
            else {
                // do nothing
            }
        }
        return result;
    }

    spots() {
        let spots = this.data.spots;
        let result = [];

        let currentCity = this._getCityByCode(this.citycode);
        let citySpots = currentCity.spot_ids;  // Take orgs IDs

        for (let item in citySpots) {
            for (let spot in spots) {
                if (citySpots[item] == spots[spot].id) {
                    if (spots[spot].is_active == true) {
                        result.push(spots[spot]);
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
        return result;
    }

    spots2() {
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
        //console.log("POPULAR SPOTS: ", spots);
        return spots;
    }

    orgs() {
        let orgs = this.data.orgs;
        let result = [];

        let currentCity = this._getCityByCode(this.citycode);

        let cityOrgs = currentCity.org_ids;  // Take orgs IDs
        for (let item in cityOrgs) {
            for (let org in orgs) {
                if (cityOrgs[item] == orgs[org].id) {
                    let currentOrg = orgs[org];
                    if (currentOrg.is_active == true) {
                        result.push(currentOrg);
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
        return result;
    }

    stores() {
        let stores = this.data.stores;
        let result = [];

        let currentCity = this._getCityByCode(this.citycode);
        let cityStores = currentCity.store_ids;

        for (let item in cityStores) {
            for (let store in stores) {
                if (cityStores[item] == stores[store].id) {
                    console.log("DataProvider.stores() :: stores[store]", stores[store]);
                    if (stores[store].is_active == true) {
                        result.push(stores[store]);
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
        //console.log("DataProvider.stores() :: result", result);
        return result;
    }

    workshops() {
        let workshops = this.data.workshops;
        let result = [];

        let currentCity = this._getCityByCode(this.citycode);
        let cityWorkshops = currentCity.workshop_ids;

        for (let item in cityWorkshops) {
            for (let workshop in workshops) {
                if (cityWorkshops[item] == workshops[workshop].id) {
                    let currentWorkshop = workshops[workshop]
                    if (currentWorkshop.is_active == true) {
                        result.push(currentWorkshop);
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
        //console.log("DataProvider.workshops() :: result", result);
        return result;
    }

    otherSpots () {

    }

    communications() {
        let communications = this.data.communications;
        let result = [];

        let currentCity = this._getCityByCode(this.citycode);
        let cityCommunications = currentCity.communication_ids;

        for (let item in cityCommunications) {
            for (let channel in communications) {
                if (cityCommunications[item] == communications[channel].id) {
                    if (communications[channel].is_active = true) {
                        result.push(communications[channel]);
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

        console.log("DataProvider.communications() :: result", result);
        return result;
    }

    persons() {

        let currentCity = this._getCityByCode(this.citycode);
        console.log("CityCode: ", this.citycode);
        let cityPersons = currentCity.persons_ids;
        console.log("City persons: ", cityPersons);

        let collection = data.persons;
        let result = [];

        for (let personId in cityPersons) {
            for (let item in collection) {
                if (cityPersons[personId] == collection[item].id) {
                    console.log("Personnnn: ", collection[item]);
                    if (collection[item].is_active == true) {
                        result.push(collection[item]);
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

        /*for(let item in collection) {
            if (collection[item].is_active == true) {
                console.log("Person: ", collection[item].code);
                result.push(collection[item]);
            }
            else {
                // do nothing
            }
        }*/

        return result;
    }

    static union(collection1, collection2) {
        let result = collection1;

        for (let item in collection2) {
            result.push(collection2[item]);
        }
        return result;
    }

}