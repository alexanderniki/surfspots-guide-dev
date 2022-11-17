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


    _getDataFromConfig() {
        this.version = this.CONFIG.app_ver;
        this.revision = this.CONFIG.app_revision;
        this.dataRevision = this.CONFIG.data_revision;
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