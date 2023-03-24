class Place extends BaseModel {
    constructor() {
        super();

        this._id = 0;
        this.active = false;
        this.popular = false;
        this.code = "spb";
        this.name = "";
        this.lat = 0.0;
        this.long = 0.0;
        this.address = "";
    }
}