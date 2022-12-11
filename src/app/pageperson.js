/*
 * pageperson.js 
 */


class PersonPage extends Page {

    constructor() {
        super();

        this.data = new new DataProvider().persons();
    }

    _getCurrentPerson() {
        // Current person
    }
    
    title() {
        // Page title
    }

    breadcrumbs() {
        // Page breadcrumbs
    }

    name() {
        // Persons' name
    }

    summary() {
        // Persons' summary
    }

    contacts() {
        // Persons' contacts
    }
}