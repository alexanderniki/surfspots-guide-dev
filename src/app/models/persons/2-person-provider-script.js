/**
 * person_provider_script.js
 */

/**
 * PersonProviderScript - provided by in-app JavaScript file
 */
class PersonProviderScript extends PersonProvider {

    constructor() {
        super();

        this.data = data;

        this.test();
    }

    select() {
        let rawdata = this.data.persons2;
        let collection = new Collection();

        for (let item in rawdata) {
            let person = new Person();
            person.id = rawdata[item].id;
            person.active = rawdata[item].is_active;
            person.popular = rawdata[item].is_popular;
            person.name = rawdata[item].name;
            person.summary = rawdata[item].summary;
            person.description = rawdata[item].metadata.description;
            person.userpicUrl = rawdata[item].metadata.userpicUrl;
            if (rawdata[item].type) {  // Getting person's type(s)
                for (let i in rawdata[item].type) {
                    let persontype = new BaseReferenceEntry();
                    persontype.id = rawdata[item].type[i].id;
                    persontype.code = rawdata[item].type[i].code;
                    persontype.name = rawdata[item].type[i].name;
                    person.type.push(persontype);
                }
            }
            if (rawdata[item].metadata.location.cities) {
                for (let i in rawdata[item].metadata.location.cities) {
                    let city = new City();
                    city.id = rawdata[item].metadata.location.cities[i].id;
                    city.code = rawdata[item].metadata.location.cities[i].code;
                    city.name = rawdata[item].metadata.location.cities[i].name;
                    person.cities.push(city);
                }
            }
            if (rawdata[item].metadata.contacts) {
                for (let i in rawdata[item].metadata.contacts) {
                    let contact = new Contact();
                    contact.name = rawdata[item].metadata.contacts[i].name;
                    contact.value = rawdata[item].metadata.contacts[i].value;
                    person.contacts.push(contact);
                }
            }

            collection.add(person);
        }

        return collection;
    }

    /**
     * Get shapers
     * @returns {Collection} collection of shapers
     */
    shapers() {
        let collection = this.select();
        collection.filter((item) => {
            return item.active;
        }).filter((item) => {
            for (let i in item.type) {
                if (item.type[i].code == "shaper") {
                    return true;
                }
            }
        }).filter((item) => {  // Take only people for current city
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }).each((item) => {
            item.activeType = "Шейпер";
        });

        return collection;
    }

    /**
     * Get instructors
     * @returns {Collection} collection of instructors
     */
    instructors() {
        let collection = this.select();
        collection.filter((item) => {  // Take only active
            return item.active;
        }).filter((item) => {  // Take only instructors
            for (let i in item.type) {
                if (item.type[i].code == "instructor") {
                    //item.activeType = item.type[i].name;
                    return true;
                }
            }
        }).filter((item) => {  // Take only people for current city
            for (let i in item.cities) {
                if (item.cities[i].code == app.city) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }).each((item) => {
            item.activeType = "Инструктор";
        });

        return collection;
    }

    test() {
        console.log("SHAPERS: ", this.shapers());
        console.log("INSTRUCTORS: ", this.instructors());
    }
}