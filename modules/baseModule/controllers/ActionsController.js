"use strict";

const ActionsService = require('../services/ActionsService');


class ActionsController {
    constructor(){
        this.actionsService = new ActionsService();
    }

    /**
     * Consulta los datos paginandolos y filtrandolos
     * @param pageNumber {number}
     * @param pageSize {number}
     * @param filterBy {string}
     * @param filterText {string}
     */
    getContent (pageNumber, pageSize, filterBy, filterText){
        return new Promise((resolve,reject)=>{
            this.actionsService.getData(pageNumber, pageSize, filterBy, filterText).then((data)=>{
                resolve(data);
            }, (error)=>{

            });
        });
    }
}
module.exports = ActionsController;