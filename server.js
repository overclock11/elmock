const express = require('express');
const path = require('path');
const http = require('http');
const config = require('./config');
const Modules =  require('./modules');
const WriteModule = require('./cli/addModule');

class Server {

    configServer () {
        this.app = express();
        this.port = config.port;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    runServer () {
        // levantar servidor express
        this.app.set('port', this.port);
        let server = http.createServer(this.app);
        server.listen(this.port);
        server.on('error', onError);
        server.on('listening', onListening);

        function onError(error) {
            console.log(error);
        }
        function onListening() {
            console.log('Escuchando en el puerto' + config.port);
        }
    }

    async upServices () {
        Modules.registerBase(this.app);
        let writeModule = new WriteModule();
        let modules = JSON.parse(await WriteModule.readModules());
        await writeModule.registerServices(modules.services, this.app);
    }

    getApp () {
        return this.app;
    }
}

module.exports = Server;