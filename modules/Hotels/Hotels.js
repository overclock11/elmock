"use strict";

const RestController = require("./controllers/RestController");

class Hotels {

    constructor(){
        this._restController = new RestController();
    }

    setup(){
        return this._restController.createServices();
    }
}
module.exports = Hotels;