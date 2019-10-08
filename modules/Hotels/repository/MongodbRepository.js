"use strict";
const MongoClient = require('mongodb').MongoClient;
const config = require('../resources/config');
const json = require('../resources/data');
class MongodbRepository {
    constructor(){
    }
    connect(){
        return  new Promise((resolve,reject)=>{
            console.log('mongodb://'+config.mongo.server+':'+config.mongo.port+'/'+config.mongo.dbName);
            MongoClient.connect('mongodb://'+config.mongo.server+':'+config.mongo.port+'/'+config.mongo.dbName,(err, client) => {
                if(err){
                    reject(err)
                }
                else {
                    resolve(client);
                }
            });
        });
    }



    /**
     * Inserta los valores en una coleccion
     * @param collection
     * @param data
     * @returns {Promise<any>}
     */
    insertValues(collection,data){
        return new Promise((resolve,reject)=>{
            try{
                this.connect().then((client)=>{
                    let db = client.db(config.mongo.dbName);
                    let selectedCollection = db.collection(config.mongo.collection);
                    selectedCollection.insertMany(data,(err,result)=>{
                        if(err){
                            client.close();
                            reject(err);
                        }else{
                            client.close();
                            resolve(result);
                        }
                    });
                },(err)=>{
                    reject(err);
                })
            }
            catch(err){
                reject(err);
            }
        });
    }

    /**
     * Elimina todos los documentos de una coleccion
     * @param collection nombre de la coleccion
     */
    cleanCollection(collection){
        return new Promise((resolve,reject)=>{
            try{
                this.connect().then((client)=>{
                    let db = client.db(config.mongo.dbName);
                    let selectedCollection = db.collection(collection);
                    selectedCollection.remove({},(err,result)=>{
                        if(err){
                            client.close();
                            reject(err);
                        }
                        else{
                            client.close();
                            resolve(result)
                        }
                    })
                },(err)=>{
                    reject(err);
                })
            }
            catch(err){
                reject(err);
            }
        });
    }


    /**
     * Busca y retorna los valores segun el parametro pasado
     * @param collection nombre de la coleccion donde buscara los valores
     * @param pattern ej= {"key":"llave"}
     */
    findValues(collection,pattern){
        return new Promise((resolve,reject)=>{
            try{
                this.connect().then((client)=>{
                    let db = client.db(config.mongo.dbName);
                    let selectedCollection = db.collection(config.mongo.collection);
                    selectedCollection.find(pattern).toArray((err,result)=>{
                        if(err){
                            client.close();
                            reject(err);
                        }
                        else{
                            client.close();
                            resolve(result);
                        }
                    })
                },(err)=>{
                    reject(err);
                })
            }
            catch(err){
                reject(err);
            }
        });
    }

}
module.exports = MongodbRepository;