"use strict";
const HotelsService = require('../services/HotelsService');
class HotelsController {
    constructor(){
        this._hotelsService = new HotelsService();
    }

    /**
     * Retorna todos los hoteles
     * @returns {Promise<any>}
     */
    allHotels(){
        return new Promise((resolve,reject)=>{
            this._hotelsService.getAll().then((result)=>{
                resolve(result);
            }, (err)=>{
                console.log(err);
                reject(err);
            })
        });
    }

    /**
     * Funcion que recibe el nombre del usuario y lo busca en el json para retornar el hotel
     * @param {String} name
     */
    searchByName(name){
        return new Promise((resolve,reject)=>{
            this._hotelsService.searchByName(name).then((hotel)=>{
                resolve(hotel);
            }, (err)=>{
                console.log(err);
                reject(err);
            });
        })
    }

    /**
     * Busca un hotel por su numero de estrellas
     * @param {string} stars
     * @returns {Promise<any>}
     */
    searchByStars(stars){
        return new Promise((resolve,reject)=>{
            this._hotelsService.searchByStars(stars).then((hotel)=>{
                resolve(hotel);
            }, (err)=>{
                console.log(err);
                reject(err);
            });
        })
    }
}
module.exports = HotelsController;