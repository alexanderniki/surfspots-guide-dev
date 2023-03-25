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
            //person.type = rawdata[item].

            collection.add(person);
        }

        return collection;
    }

    shapers() {
        let collection = this.select();
        collection.filter((item) => {
            return item.active;
        });
        return collection;
    }

    test() {
        console.log("PERSONS: ", this.shapers());
    }
}