"use strict";

const ActionsService = require('../services/ActionsService');
const Herencia = require('../services/Herencia');


class ActionsController {
    constructor(){
        this.actionsService = new ActionsService();
        this.herencia = new Herencia();
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
                reject(error);
            });
        });
    }

    /**
     * Actualiza el contenido del json
     * @param field {string}
     * @param id {string}
     * @param body {object}
     * @returns {Promise<Object>}
     */
    updateContent(field, id, body){
        return new Promise((resolve,reject)=>{
            this.actionsService.updateData(field,id,body).then((data)=>{
                resolve(data);
            }, (error)=>{
                reject(error);
            });
        });
    }

    /**
     * Elimina un registro del json usando el campo indicado y el id
     * @param field {string}
     * @param id {string|number}
     * @returns {Promise<any>}
     */
    deleteContent (field, id){
        return new Promise((resolve, reject)=>{
            this.actionsService.deleteData(field, id).then((data)=>{
                resolve(data);
            }, (error)=>{
                reject(error);
            });
        })
    }


    addContent (body){
        return new Promise ((resolve, reject)=>{
            try{
                this.actionsService.addItem(body).then((data)=>{
                    resolve(data);
                }, (error)=>{
                    reject(error);
                });
            } catch (e) {
                reject(e);
            }
        })
    }
}
module.exports = ActionsController;