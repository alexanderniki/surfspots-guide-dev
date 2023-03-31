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
        this._parseurl();
        this.currentPerson = this._getCurrentPerson();
        this.currentPerson2 = this._getCurrentPerson2();
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

    _getCurrentPerson2() {
        let collection = new PersonProvider().new(new PersonProviderScript()).select();
        let result = new Person();
        collection.filter((item) => {
            return item.active;
        }).filter((item) => {
            if (item.code == this.personcode) {
                return true;
            }
            else {
                return false;
            }
        });

        result = collection.items[0];

        return result;
    }

    _parseurl() {
        let currentURL = window.location.href;
        let suffix = currentURL.split("#");
        if (suffix.length == 1) {  // If there is no #code in URL
            window.location.href = "index.html";  // Go to index page
        }
        /* else if (suffix == "") {  // Go to index page
            window.location.href = "index.html";
        } */
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
    
    breadcrumbs() {
        // Page breadcrumbs
        let uicontainer = document.getElementById("place-breadcrumbs");
        let strBreadcrumbs = `<a class="uix-link--header" href="index.html">SURFL</a>&nbsp; › &nbsp;Инструкторы, шейперы`;
        uicontainer.innerHTML = strBreadcrumbs;
    }

    title() {
        // Page title
        let uicontainer = document.getElementById("place-title");
        uicontainer.innerHTML = this.currentPerson2.name;
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

        let uiitem = document.createElement("p");
        uiitem.innerText = this.currentPerson2.description;
        uicontainer.appendChild(uiitem);

    }

    contacts() {
        // Persons' contacts
        let uicontainer = document.getElementById("collection-contacts");

        let collection = this.currentPerson2.contacts;
        for (let item in collection) {
            let uilistitem = new UIListItem();
            uilistitem.primaryText = `<a href=${collection[item].value}>${collection[item].displayedText}</a>`;
            uilistitem.overline = collection[item].name;

            uicontainer.appendChild(uilistitem);
        }
    }

    cities() {
        // Persons' location
        let uicontainer = document.getElementById("collection-cities");

        let collection = this.currentPerson2.cities;

        for (let item in collection) {
            let uilistcontainer = document.createElement("ul");
            let uiitem = document.createElement("li");
            uiitem.innerText = collection[item].name;
            uilistcontainer.appendChild(uiitem);
            
            uicontainer.appendChild(uilistcontainer);
        }
    }

    jobs() {
        // Persons's jobs: schools, rentals, etc.
        let uicontainer = document.getElementById("collection-jobs");
        let collection = this.currentPerson2.jobs;
        let uilistcontainer = document.createElement("ul");
        for (let item in collection) {
            let uilistitem = new UIListItem();
            uilistitem.primaryText = collection[item].name;
            //uilistitem.overline = collection[item].type;  // !TODO
            uicontainer.appendChild(uilistitem);
        }
        
        uicontainer.appendChild(uilistcontainer);
    }
}