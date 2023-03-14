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
                    <li>Telegram-канал: <a href="https://t.me/surflguide">@surflguide</a></li>
                    <li>Telegram-бот: <a href="https://t.me/surflbot">@surflbot</a></li>
                    <li><a href="mailto:surflguide@gmail.com">surflguide@gmail.com</a></li>
                </ul>
            </span>
            <span>
                Информация:
                <ul>
                    <li><a href="about.html">О проекте</a></li>
                    <li><a href="contribute.html">Помочь проекту</a></li>
                </ul>
            </span>
        </div>
        <div class="uix-layout--vbox" id="footer--container--main--label">
            <center><span>Made with ❤ in Russia</span><br>
            <span>Est. 2020</span></center>
        </div>
        `;
    }
}

customElements.define("component-footer", Footer);