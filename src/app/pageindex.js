/*
 * index.js
 * Index PageObject 
 */


class IndexPage extends Page {
    constructor() {
        super();

        this.uicontainerstores = document.getElementById("collection-stores");    // Stores
        this.uicontainerorgs = document.getElementById("collection-orgs");        // Orgs
        this.uicontainerspots = document.getElementById("collection-spots");      // Spots
        this.uicontainerpopularspots = document.getElementById("spots-popular");  // Popular spots
        
        if (app.city) {
            this.data = new DataProvider().fromCity(app.city);
        }
        else {
            app.city = "spb";
            this.data = new DataProvider().fromCity(app.city);
        }

        if(app.country) {
            // !TODO
        }

        //this.collection = new Collection();
        
    }

    /* 
     * Group surf spots
     */
    _groupSpotsByWater(){

        let waterTypes = data.water_types;
        // let spots = data.spots;
        let spots = this.data.spots2();
        let groups = [];
    
        // For every water type
        for(let water in waterTypes) {
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
                        //currentSpot.link = spots[spot].page_link;
                        currentSpot.link = spots[spot].code;
                        if (spots[spot].metadata.location.water.water_type_id == 2) {
                            currentSpot.description = spots[spot].metadata.location.water.description;
                        }
                        spotGroup.spots.push(currentSpot);
                    }
                }
            }
            if (spotGroup.spots.length > 0) {
                groups.push(spotGroup);
            }
            else {
                // do nothing
            }
        }
        return groups;
    }

    _groupSpotsByLocation() {
        
    }

    /* 
     * Get and display stores, shops
     */
    stores() {
        let collection = new ShopsProvider().new(new ShopsProviderScript()).shops();
        let uicontainer = document.getElementById("collection-stores");
        collection.each((item) => {
            let uicard = new UICardSimple();
            uicard.primaryText = item.name;
            uicard.secondaryText = item.summary;
            uicard.overline = item.type;
            uicard.openURL = item.homepage;
            uicard.openNewPage = true;
            uicontainer.appendChild(uicard);
        });
    }

    /* 
     * Get and display Schools, Rents and Instructors
     */
    orgs() {
        let collection = this.data.orgs();
        let uicontainer = document.getElementById("collection-orgs");

        for (let item in collection) {
            let uicard = new UICardSimple();
    
            uicard.overline = collection[item].metadata.type;
            uicard.primaryText = collection[item].name;
            uicard.secondaryText = collection[item].metadata.summary;
            uicard.openURL = collection[item].metadata.homepage;

            uicontainer.appendChild(uicard);
        }

        this.persons();
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
                uicard.openURL = "spot.html#" + collection[item].spots[spot].link;
                container.appendChild(uicard);
            }
        uicontainer.appendChild(container);
        }
    }

    popularSpots() {
        let collection = this.data.spots();
        let uicontainer = document.getElementById("spots-popular");
    
        for (let item in collection) {
            if (collection[item].is_popular == true) {
    
                let uicard = new UICardSimple();
                
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.location.water.name;
                //uicard.openURL = collection[item].page_link;
                uicard.openURL = "spot.html#" + collection[item].code;
    
                uicontainer.appendChild(uicard);
            }
        }
    }

    cityForecast() {
        let forecast = new SpotForecast();
        forecast.getWorkingSpots();
    }


    workshops() {
        let collection = this.data.workshops();
        let uicontainer = document.getElementById("collection-workshops");

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

    cityList() {

        // Useful info: https://alvarotrigo.com/blog/javascript-select-option/

        let self = this; // Must have for setting custom function in the callback
        this.uicontainercitylist = document.getElementById("list-cities");
        if (app.city) {
            this.uicontainercitylist.value = app.city;
        }
        else {
            // do nothing
        }
        this.uicontainercitylist.addEventListener("change", function() {
            self.onCitySelected();
        });
    }

    onCitySelected() {
        app.city = this.uicontainercitylist.value;
        window.location.reload();
    }

    сommunications() {
        let collection = new CommunicationProvider(new CommunicationProviderScript()).communications();
        let uicontainer = document.getElementById("collection-communication");
        collection.each((item) => {
            let uicard = new UICardCommunication().new(item);
            uicontainer.appendChild(uicard);
        });
    }

    openTab(evt, tabID) {
        // Declare all variables
        var i, tabcontent, tablinks;
    
        let tabMenu = document.getElementById("toolbar-topnav-menu");
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("uix-tabview--tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("uix-tabview--tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabID).style.display = "flex";
        evt.currentTarget.className += " active";
        
        // Close menu
        tabMenu.style.display = "none";
    }

    persons() {
        let collection = this.data.persons();
        let uicontainer = document.getElementById("collection-orgs");
    
        for (let item in collection) {
            if (collection[item].is_active == true) {
    
                let uicard = new UICardSimple();
                
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.summary;
                uicard.overline = collection[item].metadata.type;
                if (collection[item].has_link == true) {
                    uicard.openURL = "person.html#" + collection[item].code;
                }
                else {
                    // do nothing
                }
    
                uicontainer.appendChild(uicard);
            }
            else {
                // do nothing
            }
        }
    }

    /* DEVELOPMENT PURPOSE ONLY */
    persons2() {  // Шейперы и мастерские
        let collection = new Collection();
        let persons = new PersonProvider(new PersonProviderScript());
        let workshops = new OrganisationsProvider(new OrganisationsProviderScript());
        collection = persons.shapers().union(workshops.workshops());
        
        let uicontainer = document.getElementById("collection-workshops");
        for (let item in collection.items) {
            let uicard = new UICardSimple();
                
            uicard.primaryText = collection.items[item].name;
            uicard.secondaryText = collection.items[item].summary;
            uicard.overline = collection.items[item].activeType;
            if (collection.items[item].hasLink == true) {
                console.log("person.html#", collection.items[item].code);
                uicard.openURL = "person.html#" + collection.items[item].code;
            }
            else {
                // do nothing
            }

            uicontainer.appendChild(uicard);
        }
    }

    organisations() {  // Прокаты, школы, инструкторы
        let collection = new Collection();
        let organisations = new OrganisationsProvider(new OrganisationsProviderScript());
        let persons = new PersonProvider(new PersonProviderScript());
        collection = organisations.rents().union(organisations.schools()).union(persons.instructors());
        
        let uicontainer = document.getElementById("collection-orgs");
        for (let item in collection.items) {
            let uicard = new UICardSimple();
    
            uicard.overline = collection.items[item].activeType;
            uicard.primaryText = collection.items[item].name;
            uicard.secondaryText = collection.items[item].summary;
            //uicard.openURL = collection[item].metadata.homepage;

            uicontainer.appendChild(uicard);

        }
    }

    stores2() {
        let collection = new Collection();
        let organisations = new OrganisationsProvider(new OrganisationsProviderScript());
        collection = organisations.shops();

        let uicontainer = document.getElementById("collection-stores");
        collection.each((item) => {
            let uicard = new UICardSimple();
            uicard.primaryText = item.name;
            uicard.secondaryText = item.summary;
            uicard.overline = item.activeType;
            uicard.openURL = item.externalUrl;
            uicard.openNewPage = true;
            uicontainer.appendChild(uicard);
        });
    }
}