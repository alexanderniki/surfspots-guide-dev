/**
 * shops_provider_script.js
 */


/**
 * Shops - provided by in-app javascript file
 * @extends ShopsProvider
 */
class ShopsProviderScript extends ShopsProvider {

    constructor() {
        super();
        this.data = data;  // Connecting to JS file
        //this.test();  // Debugging purpose
    }

    select() {
        let rawdata = this.data.stores;
        let collection = new Collection();

        for (let item in rawdata) {
            let shop = new Shop();
            shop.id = rawdata[item].id;
            shop.active = rawdata[item].is_active;
            shop.popular = rawdata[item].is_popular;
            shop.type = rawdata[item].metadata.type;
            shop.name = rawdata[item].name;
            shop.summary = rawdata[item].metadata.summary;
            shop.homepage = rawdata[item].metadata.homepage;
            if (rawdata[item].metadata.location.city) {
                shop.city.code = rawdata[item].metadata.location.city.code;
            }
            if (rawdata[item].metadata.location.country) {
                shop.country.code = rawdata[item].metadata.location.country.code;
            }
            
            collection.add(shop);
        }

        return collection;
    }

    shops() {
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
        console.log("ShopsProviderScript.select() -> Collection: ", this.select());
        console.log("ShopsProviderScript.shops() -> Collection: ", this.shops());
    }


}