const Server = require('./server');
let server = new Server();
server.configServer();
server.runServer();
server.upServices();