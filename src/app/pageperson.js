/*
 * pageperson.js 
 */


class PersonPage extends Page {

    constructor() {
        super();

        this.personcode = "";
        this.currentPerson = {};

        if (app.city) {
            this.data = new DataProvider().fromCity(app.city);
        }
        else {
            app.city = "spb";
            this.data = new DataProvider().fromCity(app.city);
        }

        console.log("data collection: ", this.data);
        this._parseurl();
        console.log("personcode: ", this.personcode);
        this.currentPerson = this._getCurrentPerson();
        console.log("current person: ", this.currentPerson);

        return this;
    }

    _getCurrentPerson() {
        // Current person
        let result = {};

        let collection = this.data.persons();
        for (let item in collection) {
            if (collection[item].code == this.personcode) {
                result = collection[item];
            }
            else {
                // do nothing
            }
        }

        //this.currentPerson = result;
        return result;
    }

    _parseurl() {
        let currentURL = window.location.href;
        let suffix = currentURL.split("#");
        if (suffix.length == 1) {  // If there is no #code in URL
            window.location.href = "index.html";  // Go to index page
        }
        else {
            let personcode = suffix[suffix.length - 1];  // Take code
            instanceState.personcode = personcode;
            this.personcode = personcode;
        }
        
    }

    fromcode(code) {
        let result = {};
        this.personcode = code;

        if (code) {
            let collection = this.data;
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

        return this;
    }
    
    title() {
        // Page title
        let uicontainer = document.getElementById("place-title");
        uicontainer.innerHTML = this.currentPerson.name;
    }

    breadcrumbs() {
        // Page breadcrumbs
        let uicontainer = document.getElementById("place-breadcrumbs");
        let strBreadcrumbs = `<a class="uix-link--header" href="index.html">SURFL</a>&nbsp; › &nbsp;Инструкторы, шейперы`;
        uicontainer.innerHTML = strBreadcrumbs;
    }

    name() {
        // Persons' name
    }

    summary() {
        // Persons' summary
    }

    description() {
        // Persons' description
        let uicontainer = document.getElementById("collection-description");

        let collection = this.currentPerson.metadata.description;
        for (let item in collection) {
            let uiitem = document.createElement("p");
            uiitem.innerText = collection[item];
            uicontainer.appendChild(uiitem);
        }
    }

    contacts() {
        // Persons' contacts

        let uicontainer = document.getElementById("collection-contacts");

        let collection = this.currentPerson.metadata.contacts;
        for (let item in collection) {
            let uilistitem = new UIListItem();
            uilistitem.primaryText = collection[item].value;
            uilistitem.overline = collection[item].name;

            uicontainer.appendChild(uilistitem);
        }
    }

    cities() {
        // Persons' location
        let uicontainer = document.getElementById("collection-cities");

        let collection = this.currentPerson.metadata.city_ids;
        let cities = data.cities;

        let result = [];

        for (let item in collection) {
            let currentItem = collection[item];  // City ID
            console.log("current city id: ", currentItem);
            for (let city in cities) {
                if (cities[city].id == currentItem) {
                    result.push(cities[city].name);
                    break;
                }
                else {
                    // do nothing
                }
            }
        }
        console.log("persons' cities: ", result);
        let uilistcontainer = document.createElement("ul");
        for (let i in result) {
            let uiitem = document.createElement("li");
            uiitem.innerText = result[i];
            uilistcontainer.appendChild(uiitem);
        }
        
        uicontainer.appendChild(uilistcontainer);
    }

    jobs() {
        // Persons's jobs: schools, rentals, etc.
        let uicontainer = document.getElementById("collection-jobs");

        let collection = this.currentPerson.metadata.job_ids;
        let orgs = data.orgs;

        let result = [];

        for (let item in collection) {
            let currentItem = collection[item];  // City ID
            console.log("current city id: ", currentItem);
            for (let org in orgs) {
                if (orgs[org].id == currentItem) {
                    result.push(orgs[org]);
                    break;
                }
                else {
                    // do nothing
                }
            }
        }
        console.log("persons' cities: ", result);
        let uilistcontainer = document.createElement("ul");
        for (let i in result) {

            let uilistitem = new UIListItem();
            uilistitem.primaryText = result[i].name;
            uilistitem.overline = result[i].metadata.type;

            uicontainer.appendChild(uilistitem);
        }
        
        uicontainer.appendChild(uilistcontainer);
    }
}