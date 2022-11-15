/*
 * spotcard.js
 * UICardSpot
 */


class UICardSpot extends UICard {
    
    constructor() {
        super();

        this._openURL = "";
    }

    get openURL() {
        return this._openURL;
    }

    set openURL(str) {
        if (str) {
            this._openURL = str;
        }
        else {
            // do nothing
        }
    }

    render() {
        this.innerHTML = `
            <a href="${this.openURL}">
                <div class="uix-card--spot--minimal uix-card--link--overall">
                    <div class="uix-layout--vbox-compact">
                        <span class="headline-6 typography-bold">${this.primaryText}</span>
                        <span class="uix-card--secondary-text">${this.secondaryText}</span>
                    </div>
                    <span class="headline-5 uix-card--secondary-text" id="uix-card-minimal--align-right">→</span>
                </div>
            </a>
        `;
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("ui-card--spot", UICardSpot);