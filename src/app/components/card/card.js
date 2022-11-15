/*
 * card.js
 * Generic card component
 */


class UICard extends HTMLElement {
    
    constructor() {
        super();

        this._primaryText = "";
        this._secondaryText = "";
    }

    get primaryText() {
        return this._primaryText;
    }

    get secondaryText() {
        return this._secondaryText;
    }

    set primaryText(str) {
        if (str) {
            this._primaryText = str;
        }
        else {
            // do nothing
        }
    }

    set secondaryText(str) {
        if (str) {
            this._secondaryText = str;
        }
        else {
            // do nothing
        }
    }

    render() {
        // do nothing
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("ui-card", UICard);