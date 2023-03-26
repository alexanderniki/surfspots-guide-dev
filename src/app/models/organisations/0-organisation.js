/**
 * organisation.js
 */

/**
 * Organisation
 * @extends {BaseModel}
 */
class Organisation extends BaseModel {

    constructor() {
        super();

        this.id = 0;
        this.active = false;
        this.popular = false;

        /** @type {BaseReferenceEntry[]} */
        this.type = [];

        this.code = "";
        this.name = "";
        this.summary = "",
        this.description = ``,  // Multiline string
        this.link = "";

        /** @type {City[]} */
        this.cities = [];
        /** @type {Country[]} */
        this.countries = [];
        /** @type {Contact[]} */
        this.contacts = [];

    }
}