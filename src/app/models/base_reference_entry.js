/**
 * base_reference_entry.js
 */

/**
 * Base reference entry
 * @extends {BaseModel}
 */
class BaseReferenceEntry extends BaseModel {

    constructor() {
        super();

        /** @type {Number} — Internal ID */
        this.id = 0;
        /** @type {Number} — Parent ID. For hierarchy */
        this.parentId = 0;
        /** @type {String} — Internal code */
        this.code = "";
        /** @type {String} — Entry's name */
        this.name = "";
        /** @type {Any} — Entry's value */
        this.value = null;
    }
}