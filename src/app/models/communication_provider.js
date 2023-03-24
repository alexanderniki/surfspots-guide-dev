/**
 * communication_provider.js
 */

class CommunicationProvider {  // !TODO extends DataProvider

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

    communications() {
        return this.datasource.communications();
    }
}
