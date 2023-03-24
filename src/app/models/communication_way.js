/**
 * CommunicationWay.js
 */


/**
 * Communication way model.
 * @extends BaseModel
 */
class CommunicationWay extends BaseModel {

    constructor() {
        super();

        this._id = 0;
        this._active = false;
        this._popular = false;
        this._name = "";
        this._type = "";
        this._platform = "";
        this._link = "";
        this._linktext = "";
        this._summary = "";
        this.country = new Country();
        this.city = new City();
    }

    /**
     * Create new communication way
     * @return {CommunicationWay} New communication way
     */
    new() {
        return this;
    }

    /**
     * Get id
     * @return {Number} Name
     */
    get id() {
        return this._id;
    }

    /**
     * Set id
     * @param {Number} value - New value
     */
    set id(value) {
        if (value) {  // !TODO: check id type - MUST be integer
            this._id = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get name
     * @return {string} Name
     */
    get name() {
        return this._name;
    }

    /**
     * Set name
     * @param {string} value - new name
     */
    set name(value) {
        if (value) {
            this._name = value;
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
        return this._type
    }

    /**
     * Set type
     * @param {string} value - new type
     */
    set type(value) {
        if (value) {
            this._type = value;
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
        return this._platform;
    }

    /**
     * Set platform
     * @param {string} value - New value
     */
    set platform(value) {
        if (value) {
            this._platform = value;
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
        return this._link;
    }

    /**
     * Set link
     * @param {string} value - New value
     */
    set link(value) {
        if (value) {
            this._link = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get link text
     * @returns {string} Link
     */
    get link() {
        return this._linktext;
    }

    /**
     * Set link text
     * @param {string} value - New value
     */
    set link(value) {
        if (value) {
            this._linktext = value;
        }
        else {
            // do nothing
        }
    }

    /**
     * Get summary
     * @returns {string} Summary
     */
    get summary() {
        return this._summary;
    }

    /**
     * Set summary
     * @param {string} value - New value
     */
    set summary(value) {
        if (value) {
            this._summary = value;
        }
        else {
            // do nothing
        }
    }
}