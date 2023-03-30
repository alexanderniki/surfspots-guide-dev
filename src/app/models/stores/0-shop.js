/**
 * shop.js
 */

/**
 * Shop model
 * @extends Organisation
 */
class Shop extends Organisation {
    constructor() {
        super();

        /* this.id = 0;
        this.popular = false;
        this.active = true;
        this.type = "";
        this.name = "";
        this.summary = ""; */
        this.externalUrl = "";
        this.city = new City();
        this.country = new Country();
    }

    new() {
        return this;
    }

}