/**
 * shop.js
 */

/**
 * Shop model
 * @extends BaseModel
 */
class Shop extends BaseModel {
    constructor() {
        super();

        this.id = 0;
        this.popular = false;
        this.active = true;
        this.type = "";
        this.name = "";
        this.summary = "";
        this.homepage = "";
        this.city = new City();
        this.country = new Country();
    }

    new() {
        return this;
    }

}