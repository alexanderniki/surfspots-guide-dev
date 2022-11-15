/*
 * listitem.js
 * UIListItem
 */


class UIListItem extends HTMLElement {
    
    constructor() {
        super();

        this._primaryText = "";
        this._secondaryText = "";
        this._overline = ""
    }

    _getAttributes() {
        this.primaryText = this.hasAttribute("primary-text") ? this.getAttribute("primary-text"): "";
        this.secondaryText = this.hasAttribute("secondary-text") ? this.getAttribute("secondary-text"): "";
        this.overline = this.hasAttribute("overline") ? this.getAttribute("overline"): "";
    }

    get primaryText() {
        return this._primaryText;
    }

    get secondaryText() {
        return this._secondaryText;
    }

    get overline() {
        return this._overline;
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

    set overline(str) {
        if (str) {
            this._overline = str;
        }
        else {
            // do nothing
        }
    }

    render() {
        this.innerHTML = `
            <li class="ui-list--item">
                <div class="ui-list--item--overline caption">${this.overline}</div>
                <div class="ui-list--item--primary-text">${this.primaryText}</div>
            </li>
        `;
    }

    connectedCallback() {
        this._getAttributes();
        console.log("UIListItem connected");
        this.render();
    }
}

customElements.define("ui-list--item", UIListItem);