/**
 * Collection.js
 */

class Collection {

    /** @type Array<Object> */
    items = [];

    constructor() { this.test(); }

    /**
     * Check if this is a collection
     * @returns {Boolean} - This is a collection
     */
    isCollection() {
        return true;
    }

    /**
     * Get all elements of the collection
     * @returns {Array<Object>} - Array of items
     */
    all() {
        return this.items;
    }

    /**
     * Add element to the end of the collection
     * @param {Object} element - Element to be added
     */
    add(element) {
        if (element) {
            this.items.push(element);
        }
        else {
            // do nothing
        }
    }

    /**
     * Delete an element from collection
     * @param {Object} element What to delete
     * @returns {Collection} Self (Should I return new collection every time?)
     */
    delete(element) {
        if (element) {
            this.items.pop(element);
        }
        else {
            // do nothing
        }

        return this;
    }

    /**
     * Get FIRST item with given ID
     * @param {number} id - Item's ID
     * @returns {Object} Item with specified ID
     */
    getItemByID(id) {
        // @TODO
        for (let item in this.items) {
            if (this.items[item].id = id) {
                return this.items[item];
            }
            else {
                // do nothing
            }
        }
    }

    each(callback) {
        for (let item in this.items) {
            callback(this.items[item]);
        }
    }

    /**
     * FUTURE API
     */

    select() {}

    from(collection) {}

    search(what) {}

    group() {}

    filter(callback) {
        this.items = this.items.filter(callback);
        return this;
    }

    update() {}

    union(collection) {}

    where(key, value) {}

    test() {
        console.log("Collection.test()", this);
        console.log("Collection.all()", this.all());
    }

}