"use strict";
const data = require('../resources/data');

class ActionsService {


    /**
     * Consulta los datos paginandolos y filtrandolos
     * @param pageNumber {number}
     * @param pageSize {number}
     * @param filterBy {string}
     * @param filterText {string}
     */
    getData(pageNumber, pageSize, filterBy, filterText){
        return new Promise((resolve,reject) =>{
            resolve(data);
        })
    }

}

module.exports = ActionsService;