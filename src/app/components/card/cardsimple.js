/*
 * cardsimple.js
 * UICardSimple
 * 
 * Attributes
 * 
 * <ui-card--simple 
 *     primary-text="Primary text"
 *     secondary-text="Secondary text"
 *     overline="Overline"
 *     open-url="https://www.example.com"
 * ></ui-card--simple>
 */


class UICardSimple extends UICard {
    
    constructor() {
        super();

        this._overline = "";
        this._openURL = "";
        this._openNewPage = false;

    }

    getAttributes() {
        this.primaryText = this.hasAttribute("primary-text") ? this.getAttribute("primary-text"): "";
        this.secondaryText = this.hasAttribute("secondary-text") ? this.getAttribute("secondary-text"): "";
        this.overline = this.hasAttribute("overline") ? this.getAttribute("overline"): "";
        this.openURL = this.hasAttribute("open-url") ? this.getAttribute("open-url"): "";
        this.openNewPage = this.hasAttribute("open-url-newpage") ? this.getAttribute("open-url-newpage"): false;
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
            <div class="uix-layout--vbox-compact ui-card--simple--data bottom">
                <span class="caption typography-uppercase">${this.overline}</span>
                <span class="caption-accent">${this.primaryText}</span>
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

    }

    connectedCallback() {
        this.getAttributes();
        this.render();
    }
}

customElements.define("ui-card--simple", UICardSimple);