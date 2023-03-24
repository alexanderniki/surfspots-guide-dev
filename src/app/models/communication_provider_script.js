/**
 * communication_provider_script.js
 */


/**
 * Communications - provided by in-app javascript file
 * @extends CommunicationProvider
 */
class CommunicationProviderScript extends CommunicationProvider {

    constructor() {
        super();
        this.data = data;  // Connecting to JS file
        //this.test();  // Debugging purpose
    }

    select() {
        let rawData = this.data.communications;
        let collection = new Collection();

        for (let item in rawData) {
            let way = new CommunicationWay();
            way.id = rawData[item].id;
            way.active = rawData[item].is_active;
            way.popular = rawData[item].is_popular;
            way.name = rawData[item].name;
            way.type = rawData[item].metadata.type;
            way.platform = rawData[item].metadata.channel_type;
            way.link = rawData[item].metadata.link;
            way.summary = rawData[item].metadata.summary;
            if (rawData[item].metadata.location.country) {
                way.country.code = rawData[item].metadata.location.country.code;
            }
            if (rawData[item].metadata.location.city) {
                way.city.code = rawData[item].metadata.location.city.code;
            }
            collection.add(way);
        }

        return collection;
    }

    communications() {
        let collection = this.select();

        collection.filter((item) => {
            if (item.city) {
                if (item.city.code == app.city) {
                    return true;
                }
            }
            if (item.country.code) {  // !TODO == app.country
                return true
            }
            else {
                return false;
            };
        }).filter((item) => {
            return item.active == true;
        });

        return collection;
    }

    test() {
        console.log("select() -> Collection: ", this.select());
        console.log("communications() -> Collection: ", this.communications());
    }


}