const express = require('express');
const path = require('path');
const http = require('http');
const config = require('./config');
const Modules =  require('./modules');


let app = express();
let port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('/almundo', function (req, res, next) {
    res.sendFile(path.resolve('public/almundo/index.html'));
});

// levantar servidor express
app.set('port', port);
let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log(error);
}
function onListening() {
    console.log('Escuchando en el puerto' + config.port);
}

Modules.registerRoutes(app);

module.exports = app;
