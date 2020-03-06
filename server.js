const http = require('http');
const port = process.env.PORT || 4000;
const app = require('./app');
const server = http.createServer(app);
console.log('server is running on port: ' + port)
server.listen(port);