"use strict";
const json = require('../resources/data');
const MongoDbRepository = require('../repository/MongodbRepository');
class HotelsService {
    constructor(){
        this._mongoRepository = new MongoDbRepository();
    }

    /**
     * Retorna todos los hoteles
     * @returns {Promise<any>}
     */
    getAll(){
        return new Promise((resolve,reject)=>{
            this._mongoRepository.cleanCollection('almundoCollection').then(()=>{
                this._mongoRepository.insertValues('almundoCollection',json).then(()=>{
                    this._mongoRepository.findValues('almundoCollection',{}).then((result)=>{
                        try{
                            resolve(result);
                        } catch (e) {
                            console.log(e);
                            reject(e);
                        }
                    });
                }, (err)=>{
                    console.log(err);
                    reject(err);
                });
            }, (err)=>{
                console.log(err);
                reject(err);
            });
        });
    }

    /**
     * Funcion que recibe el nombre del usuario y lo busca en el json para retornar el hotel
     * @param {String} name
     */
    searchByName(name){
        return new Promise((resolve,reject)=>{
            let query={};
            if(name===''){
                query = {}
            }
            else {
                query = {'name':{'$regex' :name, '$options' : 'i'}};
            }
            this._mongoRepository.findValues('almundoCollection',query).then((result)=>{
                try{
                    resolve(result);
                } catch (e) {
                    console.log(e);
                    reject(e);
                }
            });
        })
    }

    /**
     * Busca un hotel segun su numero de estrellas
     * @param {string} stars
     * @returns {Promise<any>}
     */
    searchByStars(stars){
        return new Promise((resolve,reject)=>{
            this._mongoRepository.findValues('almundoCollection',{'stars':parseInt(stars)}).then((result)=>{
                try{
                    resolve(result);
                } catch (e) {
                    console.log(e);
                    reject(e);
                }
            });
        })
    }
}
module.exports = HotelsService;