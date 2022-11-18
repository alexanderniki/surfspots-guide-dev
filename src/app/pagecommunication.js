/**
 * pagecommunication.js
 */


class CommunicationPage extends Page {

    constructor() {
        super();

        if (app.city) {
            this.data = new DataProvider().fromCity(app.city);
        }
        else {
            app.city = "spb";
            this.data = new DataProvider().fromCity(app.city);
        }
    }

    сommunications() {
        //let collection = data.communications;
        let collection = this.data.communications();
        console.log("PageCommunication.communications :: data", this.data);
        console.log("PageCommunication.communications :: collection", collection);
        let uicontainer = document.getElementById("collection-communication");
    
        for (let item in collection) {
            if (collection[item].is_active == true) {
    
                let uicard = new UICardCommunication();
    
                uicard.type = collection[item].metadata.type;
                uicard.channelType = collection[item].metadata.channel_type;
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.summary;
                uicard.link = collection[item].metadata.link;
                uicard.linkText = collection[item].metadata.link_text;
    
                uicontainer.appendChild(uicard);
            }
        }
    }

    breadcrumbs() {
        let uicontainer = document.getElementById("place-breadcrumbs");

        let city = this.data._getCityByCode(app.city).name;
        console.log("COMMUNICATION BREADCRUMBS: ", city);

        let strBreadcrumbs = `<a class="uix-link--header" href="index.html">${city}</a>`;
        uicontainer.innerHTML = strBreadcrumbs;

    }
}