const http = require('http');
const app = require('./app');
const debug = require('debug')('amazon-clone');

const normalizePort = val => {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch (error.code) {
        case "EACCESS":
            console.error(bind + " requires elevated priviliges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.on('listening', onListening);
server.on('error', onError);

server.listen(port);