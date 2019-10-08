"use strict";
const fs = require('fs');
const path = require('path');
const Modules =  require('../modules');

class WriteNewModule {
    constructor () {
    }

    static async readModules (){
        return fs.readFileSync(path.resolve(__dirname+'\\../config.json'),'utf8', (error, data)=>{
            if (error){
                return error;
            }
            return data;
        })
    }

    /**
     * Toma los nobmres de las clases, completa la ruta de la ubicacion y crea un instancia
     * @param className {Array<string>}
     * @param app {Object} - app de express
     * @returns {Promise<*>}
     */
    async registerServices (className, app) {
        return new Promise(()=>{
            let path = ``;
            let newModule = null;
            let moduleInstance = null;

            for (let i = 0 ; i < className.length; i++) {
                path = `../modules/${className}/${className}.js`;
                newModule = require (path);
                moduleInstance = new newModule();
                Modules.registerModule(app, moduleInstance);
            }
        });
    }


    static createFiles () {
        console.log("creando modulos");
        setTimeout(()=>{
            console.log("modulos creados");
        }, 1000);
    }
}

module.exports = WriteNewModule;