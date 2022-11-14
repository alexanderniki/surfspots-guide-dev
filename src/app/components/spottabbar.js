/* 
 * spottabbar.js
 */


class UISpotTabbar extends HTMLElement{
    
    constructor() {
        super();
    }

    render() {
        this.innerHTML = `
            <nav class="uix-tabview--tabbar" id="spot-tabbar">
                <button class="uix-tabview--tablink active" id="uix-tabview--default" onclick="openTab(event, 'tab-spot-overview')">Обзор</button>
                <button class="uix-tabview--tablink" onclick="openTab(event, 'tab-spot-location')">Транспорт</button>
                <button class="uix-tabview--tablink" onclick="openTab(event, 'tab-spot-other')">Другое</button>
                <button class="uix-tabview--tablink" onclick="openTab(event, 'tab-spot-here')">Здесь есть</button>
            </nav>
        `;
    }

    connectedCallback() {
        this.render();
    }
    
}

customElements.define("ui-tabbar-spot", UISpotTabbar);