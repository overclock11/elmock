"use strict";
const fs = require('fs');
const path = require('path');

//const data = require('../resources/data');

class ActionsService {
    constructor (_pathToData = '../resources/data') {
        this.pathToData =_pathToData;
    }

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
                let data = require(this.pathToData);
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
        });
    }

    updateData(field, id, body) {
        return new Promise ((resolve,reject)=>{
            try{
                let data = require(this.pathToData);
                let position = 0;
                let absolutePath = '';
                for(let i = 0 ; i < data.length; i++) {
                    if (data[i][field] === id) {
                        position = i;
                        data[i] = body;
                        break;
                    }
                }
                if (!path.isAbsolute(this.pathToData)){
                    absolutePath = path.resolve(__dirname+'\\'+this.pathToData);
                    fs.writeFile(absolutePath+'.json', JSON.stringify(data), 'utf8', (result)=>{
                        if(result){
                            reject(result);
                        }
                        resolve(data[position]);
                    });
                } else {
                    fs.writeFile(this.pathToData+'.json', JSON.stringify(data), 'utf8', (result)=>{
                        if(result){
                            reject(result);
                        }
                        resolve(data[position]);
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }

}

module.exports = ActionsService;