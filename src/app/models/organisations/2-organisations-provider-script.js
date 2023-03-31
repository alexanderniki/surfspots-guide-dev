/**
 * organisations-provider-script.js
 */

/**
 * OrganisationsProviderScript
 * @extends {OrganisationsProvider}
 */
class OrganisationsProviderScript extends OrganisationsProvider {

    constructor() {
        super();

        this.data = data;  // Connecting to internal JS file

        // this.test();  // !DEBUGGING
    }

    select() {
        let rawdata = this.data.organisations;
        let collection = new Collection();

        for (let item in rawdata) {
            let org = new Organisation();
            org.id = rawdata[item].id;
            org.active = rawdata[item].is_active;
            org.popular = rawdata[item].is_popular;
            org.name = rawdata[item].name;
            org.code = rawdata[item].code;
            org.summary = rawdata[item].summary;
            org.description = rawdata[item].metadata.description;
            org.link = rawdata[item].metadata.link;

            // Getting types:
            if (rawdata[item].type) {
                for (let i in rawdata[item].type) {
                    let orgtype = new BaseReferenceEntry();
                    orgtype.id = rawdata[item].type[i].id;
                    orgtype.code = rawdata[item].type[i].code;
                    orgtype.name = rawdata[item].type[i].name;
                    org.type.push(orgtype);
                }
            }
            
            // Getting cities:
            if (rawdata[item].metadata.location.cities) {
                for (let i in rawdata[item].metadata.location.cities) {
                    let city = new City();
                    city.id = rawdata[item].metadata.location.cities[i].id;
                    city.code = rawdata[item].metadata.location.cities[i].code;
                    city.name = rawdata[item].metadata.location.cities[i].name;
                    org.cities.push(city);
                }
            }

            // Getting countries:
            if (rawdata[item].metadata.location.countries) {
                for (let i in rawdata[item].metadata.location.countries) {
                    let country = new Country();
                    country.id = rawdata[item].metadata.location.countries[i].id;
                    country.code = rawdata[item].metadata.location.countries[i].code;
                    country.name = rawdata[item].metadata.location.countries[i].name;
                    org.counries.push(country);
                }
            }

            // Getting contacts
            if (rawdata[item].metadata.contacts) {
                for (let i in rawdata[item].metadata.contacts) {
                    let contact = new Contact();
                    contact.name = rawdata[item].metadata.contacts[i].name;
                    contact.value = rawdata[item].metadata.contacts[i].value;
                    org.contacts.push(contact);
                }
            }

            if (rawdata[item].external_url) {
                org.externalUrl = rawdata[item].external_url;
            }

            collection.add(org);
        }

        return collection;
    }

    rents() {
        let collection = this.select();

        collection.filter((item) => {  // Active
            return item.active;
        }).filter((item) => { // City
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
            }
        }).filter((item) => {  // Type
            for (let i in item.type) {
                if (item.type[i].code == "rent") {
                    return true;
                }
            }
        }).each((item) => {
            item.activeType = "Прокат";
        });

        return collection;
    }

    schools() {
        let collection = this.select();

        collection.filter((item) => {  // Active
            return item.active;
        }).filter((item) => {  // In selected city
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
            }
        }).filter((item) => {  // Type
            for (let i in item.type) {
                if (item.type[i].code == "school") {
                    return true;
                }
            }
        }).each((item) => {
            item.activeType = "Школа";
        });

        return collection;
    }

    workshops() {
        let collection = this.select();

        collection.filter((item) => {  // Active
            return item.active;
        }).filter((item) => {  // In selected city
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }).filter((item) => {  // Type
            for (let i in item.type) {
                if (item.type[i].code == "workshop") {
                    return true;
                }
            }
        }).each((item) => {
            item.activeType = "Мастерская";
        });

        return collection;
    }

    shops() {
        let collection = this.select();

        collection.filter((item) => {  // Active
            return item.active;
        }).filter((item) => {  // In selected city
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
            }
        }).filter((item) => {  // Type
            for (let i in item.type) {
                if (item.type[i].code == "shop") {
                    return true;
                }
            }
        }).each((item) => {
            item.activeType = "Магазин";
        });

        return collection;
    }

    test() {
        console.log("ORGANISATIONS: ", this.select());
        console.log("RENTS: ", this.rents());
        console.log("WORKSHOPS: ", this.workshops());
        console.log("SCHOOLS: ", this.schools());
        console.log("SHOPS: ", this.shops());
    }
}