"use strict";
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const Modules =  require('../modules');

class WriteNewModule {
    constructor () {
    }

    /**
     * Lee el archivo de configuración donde se encuentran los nombres de los módulos que va levantar
     * @returns {Promise<void>}
     */
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


    static async createFiles (moduleName) {
        const folders = ["controllers","repository","resources","services"];
        let modulePath = path.join(__dirname, '../modules/'+moduleName);
        if (fs.existsSync(modulePath)) {
            fsExtra.removeSync(modulePath);
        }
        fs.mkdirSync(modulePath);
        for (let i = 0 ; i < 4; i++) {
            fs.mkdirSync(path.join(__dirname, '../modules/'+moduleName+"/"+folders[i]));
        }
    }
}

module.exports = WriteNewModule;