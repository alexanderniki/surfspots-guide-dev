/*
 * communicationcard.js
 * UICardCommunication
 */


class UICardCommunication extends UICard {

    constructor() {
        super();

        this._type = "";
        this._channelType = "";
        this._link = "";
        this._linkText = "";
    }

    get type() {
        return this._type;
    }

    get channelType() {
        return this._channelType;
    }

    get link() {
        return this._link;
    }

    get linkText() {
        return this._linkText;
    }

    set type(str) {
        if (str) {
            this._type = str;
        }
        else {
            //do nothing
        }
    }

    set channelType(str) {
        if (str) {
            this._channelType = str;
        }
        else {
            // do nothing
        }
    }

    set link(str) {
        if (str) {
            this._link = str;
        }
        else {
            //do nothing
        }
    }

    set linkText(str) {
        if (str) {
            this._linkText = str;
        }
        else {
            this.linkText = "Ссылка";
        }
    }

    render() {
        this.innerHTML = `
            <div class="uix-card--communication">
                <span class="caption typography-uppercase">${this.type} • ${this.channelType}</span>
                <span class="headline-6">${this.primaryText}</span>
                <span class="body-1"><a href="${this.link}">${this.linkText}</a></span>
                <span class="body-1">${this.secondaryText}</span>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }
}


customElements.define("ui-card--communication", UICardCommunication);