"use strict";
const fs = require('fs');
const path = require('path');

//const data = require('../resources/data');

class ActionsService {
    constructor (_pathToData = '../resources/data') {
        this.pathToData =_pathToData;
    }

    requireUncached(module){
        delete require.cache[require.resolve(module)];
        return require(module)
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
                let data = this.requireUncached(this.pathToData);
                pageNumber = parseInt(pageNumber);
                pageSize = parseInt(pageSize);
                let newResult = data;
                let totalRecords = data.length;
                if (typeof filterBy !== 'undefined' || typeof filterText !== 'undefined') {
                    filterText = filterText.toLowerCase();
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

    /**
     * Actualiza un registro basando en el campo a tomar como id
     * @param field {string}
     * @param id {number|string}
     * @param body {object}
     * @returns {Promise<body>}
     */
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


    /**
     * Elimina un registro basado en el id recibido y el campo de referencia
     * @param field {string}
     * @param id {string|number}
     * @returns {Promise<any>}
     */
    deleteData(field, id) {
        return new Promise((resolve,reject)=>{
            try{
                let data = require(this.pathToData);
                let position = -1;
                let absolutePath = '';
                let deletedItem={};
                for(let i = 0 ; i < data.length; i++) {
                    if (data[i][field] === id) {
                        position = i;
                        break;
                    }
                }
                if (position>=0) {
                    deletedItem = data.splice(position,1);
                } else {
                    reject(204);
                }
                if (!path.isAbsolute(this.pathToData)){
                    absolutePath = path.resolve(__dirname+'\\'+this.pathToData);
                    fs.writeFile(absolutePath+'.json', JSON.stringify(data), 'utf8', (result)=>{
                        if(result){
                            reject(result);
                        }
                        resolve(deletedItem);
                    });
                } else {
                    fs.writeFile(this.pathToData+'.json', JSON.stringify(data), 'utf8', (result)=>{
                        if(result){
                            reject(result);
                        }
                        resolve(deletedItem);
                    });
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    addItem(body){
        return new Promise((resolve, reject)=>{
          try{
              let data = require(this.pathToData);
              let absolutePath = '';
              if (typeof body.length === 'undefined') {
                  data.push(body)
              } else {
                  data = data.concat(body);
              }
              if (!path.isAbsolute(this.pathToData)){
                  absolutePath = path.resolve(__dirname+'\\'+this.pathToData);
                  fs.writeFile(absolutePath+'.json', JSON.stringify(data), 'utf8', (result)=>{
                      if(result){
                          reject(result);
                      }
                      resolve(body);
                  });
              } else {
                  fs.writeFile(this.pathToData+'.json', JSON.stringify(data), 'utf8', (result)=>{
                      if(result){
                          reject(result);
                      }
                      resolve(body);
                  });
              }
          } catch (e) {
              reject(e);
          }
        })
    }

}

module.exports = ActionsService;