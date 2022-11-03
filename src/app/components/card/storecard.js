/*
 * 
 */


class UICardStore extends UICard {
    
    constructor() {
        super();

        this._overline = "";
        this._openURL = "";
    }

    get overline() {
        return this._overline;
    }

    get openURL() {
        return this._openURL;
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

    render() {
        this.innerHTML = `
        <div class="uix-card--rent">
            <div class="uix-layout--vbox-compact bottom">
                <span class="caption typography-uppercase">${this.overline}</span>
                <span class="headline-6 typography-bold">${this.primaryText}</span>
                <span class="body-1">${this.secondaryText}</span>
            </div>
        </div>
        `;
        this.addEventListener("click", function() {
            window.open(this.openURL);
        });

        /*let container = document.createElement("span");
        container.innerHTML = this.overline + ", " + this.primaryText + ", " + this.secondaryText;
        this.appendChild(container);*/
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("ui-card--store", UICardStore);