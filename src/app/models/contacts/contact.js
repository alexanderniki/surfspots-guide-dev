/**
 * person_contact.js
 */

/**
 * Person contact
 * @extends {BaseReferenceEntry}
 */
class Contact extends BaseReferenceEntry {

    constructor() {
        super();

        this.displayedText = "";
    }

    isContact() {
        return true;
    }
}