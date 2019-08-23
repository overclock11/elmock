"use strict";

const RestController = require("./controllers/RestController");

class HotelsBoot {

    constructor(){
        this._restController = new RestController();
    }

    setup(){
        return this._restController.createServices();
    }
}
module.exports = HotelsBoot;