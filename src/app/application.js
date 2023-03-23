/**
 * application.js
 */


class SurflApp {

    constructor() {

        this.CONFIG = data.config;

        this._vesion = "0.0.0";
        this._revision = 0;
        this._dataRevision = 0;

        this._getDataFromConfig();

        this._theme = "";
        this._country = "";
        this._city = "";  // City code

        return this;

    }

    /**
     * 
     * @returns string App version
     */
    get version() {
        return this._vesion;
    }

    /**
     * 
     * @returns number App revision
     */
    get revision() {
        return this._revision;
    }

    /**
     * 
     * @returns number Data version
     */
    get dataRevision() {
        return this._dataRevision;
    }

    get theme() {
        this._theme = sessionStorage.getItem('theme');
        return this._theme;
    }

    get country() {
        this._country = sessionStorage.getItem('country');
        return this._country;
    }

    get city() {
        this._city = sessionStorage.getItem('city');
        return this._city;
    }

    get locale() {
        // !TODO
    }

    get language() {
        // !TODO
    }

     /**
     * @param {string} ver - current version
     */
    set version(ver) {
        if (ver) {
            this._vesion = ver;
        }
        else {
            // do nothing
        }
    }

    /**
     * @param {number} rev - revision value
     */
    set revision(rev) {
        if (rev) {
            this._revision = rev;
        }
        else {
            // do nothing
        }
    }

     /**
     * @param {number} datarev - data revision value
     */
    set dataRevision(datarev) {
        if (datarev) {
            this._dataRevision = datarev;
        }
        else {
            // do nothing
        }
    }

    set theme(theme) {
        if (theme) {
            this._theme = theme;
            sessionStorage.setItem('theme', this._theme);
        }
        else {
            // do nothing
        }
    }

    set country(country) {
        if (country) {
            this._country = country;
            sessionStorage.setItem('country', this._country);
        }
        else {
            // do nothing
        }
    }

    set city(city) {
        if (city) {
            this._city = city;
            sessionStorage.setItem('city', this._city);
        }
        else {
            // do nothing
        }
    }


    _getDataFromConfig() {
        this.version = this.CONFIG.app_ver;
        this.revision = this.CONFIG.app_revision;
        this.dataRevision = this.CONFIG.data_revision;
    }

    toggleTheme() {
        // Obtains an array of all <link> elements.
        // Select your element using indexing.
        var theme = document.getElementsByTagName('link')[0];

        // Change the value of href attribute 
        // to change the css sheet.
        if (theme.getAttribute('href') == 'app/theme-light.css') {
            theme.setAttribute('href', 'app/theme-dark.css');
            sessionStorage.setItem('theme', "app/theme-dark.css");
        } else {
            theme.setAttribute('href', 'app/theme-light.css');
            sessionStorage.setItem('theme', "app/theme-light.css");
        }
    }

    setTheme(value) {
  
        // Obtain the name of stylesheet 
        // as a parameter and set it 
        // using href attribute.
        // https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/
    
        var sheets = document.getElementsByTagName('link');
        sheets[0].href = value;
    }

    getCurrentTheme() {

        // Initialize current theme
        // @TODO: rename the function
    
        var theme = sessionStorage.getItem('theme');
        if (theme != null) {
            setTheme(theme);
        }
        else {
            theme = 'app/theme-light.css';
            sessionStorage.setItem('theme', theme);
            setTheme(theme);
        }
    }

    /**
     * 
     * @param {string} uielementid - Where to put data
     * @returns this Instance of SurflApp
     */
    showAppVersion(uielementid) {
        let uicontainer = document.getElementById(uielementid);
        uicontainer.innerText = this.version;
        return this;
    }

    /**
     * 
     * @param {string} uielementid - Where to put data
     * @returns this Instance of SurflApp
     */
    showAppRevision(uielementid) {
        let uicontainer = document.getElementById(uielementid);
        uicontainer.innerText = this.revision;
        return this;
    }

    /**
     * 
     * @param {string} uielementid - Where to put data
     * @returns this Instance of SurflApp
     */
    showDataRevision(uielementid) {
        let uicontainer = document.getElementById(uielementid);
        uicontainer.innerText = this.dataRevision;
        return this;
    }

    /**
     * 
     * @param {string} uielementid - Where to put the notification
     * @returns void
     */
    showInlineNotification(uielementid) {
        let uicontainer = document.getElementById(uielementid);

        let notifications = data.notifications[0];

        let notification = new UINotification();
        notification.overline = notifications.overline;
        notification.title = notifications.title;
        notification.text = notifications.text;
        notification.link = notifications.link
        let uinotification = new InlineNotificationView(notification);

        uicontainer.appendChild(uinotification);
    }
}