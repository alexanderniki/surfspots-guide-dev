/*
 * spotlist.js
 */


class Spotlist extends HTMLElement {


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


    connectedCallback() {
        this.render();
    }


    buildList() {
        let spots = this.data.spots();
        let list = document.createElement("ul");

        for (let i = 0; i < spots.length; i++) {
            // create list
            if (spots[i].is_active == true) {
                let item = document.createElement("li");
                let link = document.createElement("a");
                let linkText = document.createTextNode(spots[i].name);
                let strLink = "spot.html#" + spots[i].code;
                link.setAttribute("href", "spot.html#" + spots[i].code);
                link.addEventListener("click", function() {
                    updatePage(strLink);
                });

                link.appendChild(linkText);
                item.appendChild(link);
                list.appendChild(item);
            }
        }
        console.log(list);
        return list;
    }


    render() {
        this.appendChild(this.buildList());
    }

}


customElements.define("spotlist-component", Spotlist);