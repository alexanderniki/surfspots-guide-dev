/**
 * CommunicationWay.js
 */


/**
 * Communication way model.
 * @extends BaseModel
 */
class CommunicationWay extends BaseModel {

    id = 0;
    name = "";
    type = "";
    platform = "";
    link = "";
    description = "";

    constructor() {
        super();
    }

    /**
     * Create new communication way
     * @return {CommunicationWay} New communication way
     */
    new() {
        return this;
    }

    /**
     * Get name
     * @return {string} Name
     */
    get name() {
        return this.name;
    }

    /**
     * Set name
     * @param {string} value - new name
     */
    set name(value) {
        if (value) {
            this.name = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get type
     * @returns {string} Type
     */
    get type() {
        return this.type
    }

    /**
     * Set type
     * @param {string} value - new type
     */
    set type(value) {
        if (value) {
            this.name = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get platform
     * @returns {string} Platform
     */
    get platform() {
        return this.platform;
    }

    /**
     * Set platform
     * @param {string} value - New value
     */
    set platform(value) {
        if (value) {
            this.name = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get link
     * @returns {string} Link
     */
    get link() {
        return this.link;
    }

    /**
     * Set link
     * @param {string} value - New value
     */
    set link(value) {
        if (value) {
            this.name = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get description
     * @returns {string} Description
     */
    get description() {
        return this.description;
    }

    /**
     * Set description
     * @param {string} value - New value
     */
    set description(value) {
        if (value) {
            this.name = value;
        }
        else {
            // do nothing
        }
    }
}