/*
 * index.js
 * Index PageObject 
 */


class IndexPage extends Page {
    constructor() {
        super();

        this.uicontainerstores = document.getElementById("collection-stores");  // Stores
        this.uicontainerorgs = document.getElementById("collection-orgs");  // Orgs
        this.uicontainerspots = document.getElementById("collection-spots");  // Spots
        this.uicontainerpopularspots = document.getElementById("spots-popular");  // Popular spots
    }

    /* 
     * Group surf spots
     */
    _groupSpotsByWater(){

        let waterTypes = data.water_types;
        let spots = data.spots;
        let groups = [];
        //console.log("WATER TYPES:", waterTypes);
    
        // For every water type
        for(let water in waterTypes) {
            console.log("water.id: ", waterTypes[water].id);
            let spotGroup = {};
            spotGroup.name = waterTypes[water].water;
            spotGroup.spots = [];
            // For every spot
            for (let spot in spots) {
                // Take only active spots
                if(spots[spot].is_active == true) {
                    // If ids are the same
                    if (waterTypes[water].id == spots[spot].metadata.location.water.water_type_id) {
                        let currentSpot = {}
                        currentSpot.water = spots[spot].metadata.location.water.name;
                        currentSpot.name = spots[spot].name;
                        currentSpot.link = spots[spot].page_link;
                        if (spots[spot].metadata.location.water.water_type_id == 2) {
                            currentSpot.description = spots[spot].metadata.location.water.description;
                        }
                        spotGroup.spots.push(currentSpot);
                    }
                }
            }
            groups.push(spotGroup);
            //console.log(groups);
        }
        return groups;
    }

    /* 
     * Get and display stores, shops
     */
    stores() {
        let collection = data.stores;
        let uicontainer = document.getElementById("collection-stores");
    
        for (let item in collection) {
            if (collection[item].is_active == true) {
    
                let uicard = new UICardSimple();
    
                uicard.overline = collection[item].metadata.type;
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.summary;
                uicard.openURL = collection[item].metadata.homepage;
                uicard.openNewPage = true;
    
                uicontainer.appendChild(uicard);
            }
        }
    }

    /* 
     * Get and display Schools, Rents and Instructors
     */
    orgs() {
        let collection = data.orgs;
        let uicontainer = document.getElementById("collection-orgs");
    
        for (let item in collection) {
            if (collection[item].is_active == true) {
    
                let uicard = new UICardSimple();
    
                uicard.overline = collection[item].metadata.type;
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.summary;
                uicard.openURL = collection[item].metadata.homepage;
    
                uicontainer.appendChild(uicard);
            }
        }
    }

    spots() {
        let collection = this._groupSpotsByWater(); //groupSpots();
        let uicontainer = document.getElementById("collection-spots");
    
        for (let item in collection) {
    
            let container = document.createElement("div");
            container.classList.add("uix-layout--grid--wrapped");
            
            let title = document.createElement("span");
            title.classList.add("title");
            title.innerText = collection[item].name;
            uicontainer.appendChild(title);
    
            for (let spot in collection[item].spots) {
                let uicard = new UICardSimple();
                uicard.primaryText = collection[item].spots[spot].name;
                if (collection[item].spots[spot].description) {
                    uicard.secondaryText = collection[item].spots[spot].description;
                }
                uicard.openURL = collection[item].spots[spot].link;
                container.appendChild(uicard);
            }
        uicontainer.appendChild(container);
        }
    }

    popularSpots() {
        let collection = data.spots;
        let uicontainer = document.getElementById("spots-popular");
    
        for (let item in collection) {
            if (collection[item].is_popular == true) {
    
                let uicard = new UICardSimple();
                
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.location.water.name;
                //uicard.openURL = collection[item].page_link;
                uicard.openURL = "spot.html#" + collection[item].code
    
                uicontainer.appendChild(uicard);
            }
        }
    }

    cityForecast() {
        let forecast = new SpotForecast();
        forecast.getWorkingSpots();
    }
}