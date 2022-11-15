/**
 * pagecommunication.js
 */


class CommunicationPage extends Page {

    constructor() {
        super();
    }

    сommunications() {
        let collection = data.communications;
        let uicontainer = document.getElementById("collection-communication");
    
        for (let item in collection) {
            if (collection[item].is_active == true) {
    
                let uicard = new UICardCommunication();
    
                uicard.type = collection[item].metadata.type;
                uicard.channelType = collection[item].metadata.channel_type;
                uicard.primaryText = collection[item].name;
                uicard.secondaryText = collection[item].metadata.summary;
                uicard.link = collection[item].metadata.lin;
                uicard.linkText = collection[item].metadata.link_text;
    
                uicontainer.appendChild(uicard);
            }
        }
    }
}