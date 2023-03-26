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

        this.test();  // DEBUGGIG
    }

    select() {
        let rawdata = this.data.organisations;
        let collection = new Collection();

        for (let item in rawdata) {
            let org = new Organisation();
            org.id = rawdata[item].id;
            org.active = rawdata[item].is_active;
            org.popular = rawdata[item].is_popular;
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
                    console.log("RENT.CITY",collection);
                    return true;
                }
                else {
                    return false;
                }
            }
        }).filter((item) => {  // Type
            for (let i in item.type) {
                console.log("TYPE", collection);
                if (item.type[i].code == "rent") {
                    console.log("RENT.TYPE", collection);
                    return true;
                }
                else {
                    return false;
                }
            }
        });

        return collection;
    }

    schools() {

    }

    workshops() {
        
    }

    test() {
        console.log("ORGANISATIONS: ", this.select());
        console.log("RENTS: ", this.rents());
    }
}