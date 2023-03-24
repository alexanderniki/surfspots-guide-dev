/**
 * Communications DAO
 */

class CommunicationsDAO {

    /**
     * Constructor
     * @param {DataSource} datasource
     */
    constructor(datasource) {
        this.datasource = datasource;
    }

    /**
     * 
     * @param {DataSource} datasource 
     * @returns {CommunicationsDAO} New CommunicationsDAO
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
}
