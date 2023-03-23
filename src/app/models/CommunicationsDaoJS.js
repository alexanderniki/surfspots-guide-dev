/**
 * CommunicationsDAO implementation for data located in plain JS file
 */


class CommunicationsDaoJS extends CommunicationsDAO {

    constructor() {
        super();

        this.data = data;  // Connecting to JS file

        //this.test();
    }

    select() {
        let rawData = this.data.communications;
        let collection = new Collection();

        for (let item in rawData) {
            collection.add(rawData[item]);
        }

        return collection;
    }

    cselect() {
        let rawData = this.data.communications;
        let collection = new Collection();
        //let arr = [];

        /* for (let item in rawData) {
            collection.add(rawData[item]);
        } */

        for (let item in rawData) {
            console.log("ITEM: ", item);
            let way = new CommunicationWay();
            way.id = rawData[item].id;
            way.active = rawData[item].is_active;
            way.popular = rawData[item].is_popular;
            way.name = rawData[item].name;
            way.type = rawData[item].metadata.channel_type;
            way.platform = rawData[item].platform;
            way.link = rawData[item].metadata.link;
            way.summary = rawData[item].metadata.summary;
            //way.country.code = rawData[item].metadata.country.id;
            if (rawData[item].metadata.location.city) {
                way.city.code = rawData[item].metadata.location.city.code;
            }
            collection.add(way);
            //arr.push(way);
        }

        //console.log("COLLECTION ADDING", arr);
        return collection;
    }

    test() {
        console.log("select() -> Collection: ", this.select());
    }


}