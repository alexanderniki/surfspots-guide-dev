/**
 * organisations-provider.js
 */

/**
 * OrganisationsProvider
 */
class OrganisationsProvider {  // !TODO: extends data provider

    /**
     * Constructor
     * @param {DataSource} datasource
     */
    constructor(datasource) {
        this.datasource = datasource;
    }

    /**
     * 
     * @param {CommunicationProvider} datasource 
     * @returns {CommunicationProvider} New CommunicationProvider instance
     */
    new(datasource) {
        if (datasource) {
            this.datasource = datasource;
            return this;
        }
        else {
            // do nothing
        }
    }

    select() {
        return this.datasource.select();
    }

    rents() {
        return this.datasource.rents();
    }

    schools() {
        return this.datasource.schools();
    }

    workshops() {
        return this.datasource.workshops();
    }

    test() {
        return this.datasource.test();
    }
}