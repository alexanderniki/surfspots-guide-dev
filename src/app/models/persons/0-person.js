/**
 * person.js
 */

/**
 * class Person
 * @extends BaseModel
 */
class Person extends BaseModel {

    constructor() {
        super();

        this.id = 0;
        this.active = false;
        this.popular = false;
        this.hasLink = false;
        
        /** @type {BaseReferenceEntry[]} */
        this.type = [];
        this.activeType = "";

        this.code = "";
        this.name = "";

        this.summary = "";
        this.description = ``;
        this.userpicUrl = "";
        /** @type {City[]} */
        this.cities = [];
        /** @type {Country[]} */
        this.countries = [];
        /** @type {Contact[]} */
        this.contacts = [];
    }

    isPerson() {
        return true;
    }
}
