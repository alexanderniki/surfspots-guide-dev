/**
 * person_provider.js
 */

/**
 * Person provider
 */
class PersonProvider {  // !TODO: extends DataProvider
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

    shapers() {
        return this.datasource.shapers();
    }

    instructors() {
        return this.datasource.instructors();
    }

}