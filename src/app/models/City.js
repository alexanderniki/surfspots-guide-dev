/**
 * city.js
 */

/**
 * City
 * @extends {Place}
 */
class City extends Place {
    constructor() {
        super();

        /** @type {Country} */
        this.country = new Country();
    }
}