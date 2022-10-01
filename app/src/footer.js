/* 
 * footer.js 
 */

class Footer extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="uix-layout--hbox--wrapped"  id="footer--container--main">
                <span>
                    Контакты:
                    <ul>
                        <li>Telegram/WhatsApp: @alexanderniki</li>
                        <li>Instagram: @alexanderniki</li>
                        <li>inbox@alexanderniki.name</li>
                    </ul>
                </span>
                <span>
                    Информация:
                    <ul>
                        <li><a href="about.html">О проекте</a></li>
                        <li><a href="contribute.html">Помочь проекту</a></li>
                        <li><a href="https://t.me/surflbot">Телеграм-бот @surflbot</a></li>
                    </ul>
                </span>
            </div>
            <span>Made with ❤ in Russia</span>
        `;
    }
}

customElements.define("component-footer", Footer);