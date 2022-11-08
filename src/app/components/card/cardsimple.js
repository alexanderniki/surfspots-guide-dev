/*
 * cardsimple.js
 * UICardSimple
 */


class UICardSimple extends UICard {
    
    constructor() {
        super();

        this._overline = "";
        this._openURL = "";
        this._openNewPage = false;
    }

    get overline() {
        return this._overline;
    }

    get openURL() {
        return this._openURL;
    }

    get openNewPage() {
        return this._openNewPage;
    }

    set overline(str) {
        if (str) {
            this._overline = str;
        }
        else {
            // do nothing
        }
    }

    set openURL(str) {
        if (str) {
            this._openURL = str;
        }
        else {
            // do nothing
        }
    }

    set openNewPage(value) {
        if (value) {
            this._openNewPage = value;
        }
        else {
            // do nothing
        }
    }

    render() {
        this.innerHTML = `
        <div class="ui-card--simple">
            <div class="uix-layout--vbox-compact bottom">
                <span class="caption typography-uppercase">${this.overline}</span>
                <span class="headline-6 typography-bold">${this.primaryText}</span>
                <span class="body-1">${this.secondaryText}</span>
            </div>
        </div>
        `;
        if (this.openURL && this.openURL != "") {
            this.addEventListener("click", function() {
                if (this.openNewPage == true) {
                    window.open(this.openURL);
                }
                else if (this.openNewPage == false){
                    window.location.href = this.openURL;
                }
                else {
                    // do nothing
                }
            });
            this.style.cursor = "pointer";
    
        }
        /*let container = document.createElement("span");
        container.innerHTML = this.overline + ", " + this.primaryText + ", " + this.secondaryText;
        this.appendChild(container);*/
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("ui-card--store", UICardSimple);