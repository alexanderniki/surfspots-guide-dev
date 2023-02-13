/** Class representing collection of items. */
class Collection {

    /**
     * Create a collection.
     * @return {Collection} new empty Collection.
     */
    constructor() {
        /** @type {?any} */
        this.rawdata = null;
        /** @type {Array<Object>} */
        this.collection = [];
        /** @type {Array<Object>} */
        this.items = [];

        return this;
    }

    /**
     * Create a collection.
     * @param {Array} data - JS array of objects
     * @return {Collection} new Collection.
     */
    new(data) {
        // do nothing

        for (let item in data) {
            if (item) {
                this.items.push(data[item]);
            }
            else {
                // do nothing
            }
        }

        return this;
    }

    /** @static */
    static select(collection) {

        return this;
    }

    from(collection) {

        return this;
    }

    union(collection) {

        for (let item in collection) {
            this.collection.push(collection[item]);
        }
        
        return this;
    }

    where(key, value) {

        let result = [];

        for (let item in this.collection) {
            if (this.collection[item].key == value) {  // Probably doesn't work!
                result.push(this.collection[item]);
            }
            else {
                // do nothing
            }
        }
        this.collection = result;
        return this;
    }

    search(what) {}
    filter(callback){}
}

/*
Collection.select("data")
    .union(
        .select("persons")
        .where("id", 2)
    )
    .where("is_active", true);
*/