class Collection {

    constructor() {
        this.data = new DataProvider();
        this.collection = []

        return this;
    }

    select(collection) {

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
}

/*
Collection.select("data")
    .union(
        .select("persons")
        .where("id", 2)
    )
    .where("is_active", true);
*/