/**
 * shops_provider.js
 */

/**
 * ShopsProvider
 */
class ShopsProvider {  // !TODO extends DataProvider

    /**
     * Constructor
     * @param {DataSource} datasource
     */
    constructor(datasource) {
        this.datasource = datasource;
    }

    /**
     * 
     * @param {ShopsProvider} datasource 
     * @returns {ShopsProvider} New ShopsProvider instance
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

    shops() {
        return this.datasource.shops();
    }

    test() {
        return this.datasource.test();
    }

}