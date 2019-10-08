const Server = require('./server');
console.log(process.argv);
let server = new Server();
server.configServer();
server.runServer();
server.upServices();