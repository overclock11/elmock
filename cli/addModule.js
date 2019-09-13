"use strict";
const fs = require('fs');

class WriteNewModule {
    static async readModules (){
        return fs.readFileSync('C:\\Users\\Julian\\Documents\\Proyectos\\mocki\\modules.js','utf8', (error, data)=>{
            if (error){
                return error;
            }
            return data;
        })
    }
}

module.exports = WriteNewModule;