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
            try{
                pageNumber = parseInt(pageNumber);
                pageSize = parseInt(pageSize);
                let newResult = data;
                let totalRecords = data.length;
                if (typeof filterBy !== 'undefined' || typeof filterText !== 'undefined') {
                    newResult = data.filter((item)=>{
                        if(item[filterBy].toLowerCase().indexOf(filterText)>0){
                            return true;
                        }
                    });
                    totalRecords = newResult.length;
                }
                if (newResult.length > pageSize) {
                    let end = pageNumber*pageSize-1;
                    let start = end - (pageSize-1);
                    let paginateResult = [];
                    for(let i = start; i<=end; i++) {
                        if (typeof newResult[i] !== 'undefined'){
                            paginateResult.push(newResult[i]);
                        }
                    }
                    newResult = paginateResult;
                }

                resolve({
                    'content': newResult,
                    'totalRecords': totalRecords,
                    'totalPages': Math.floor(totalRecords / pageSize) + 1,
                    'pageIndex': pageNumber,
                    'pageSize': pageSize
                });
            } catch (e) {
                reject(e)
            }
        })
    }

}

module.exports = ActionsService;