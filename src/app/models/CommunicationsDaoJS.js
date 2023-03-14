/**
 * CommunicationsDAO implementation for data located in plain JS file
 */


class CommunicationsDaoJS extends CommunicationsDAO {

    constructor() {
        super();

        this.data = data;  // Connecting to JS file

        this.test();
    }

    select() {
        let rawData = this.data.communications;
        let collection = new Collection();

        for (let item in rawData) {
            collection.add(rawData[item]);
        }

        return collection;
    }

    test() {
        console.log("select() -> Collection: ", this.select());
    }


}