const http = require('http');
const path = require('path');
const fs = require('fs');
const ReactOverTheWire = require('../dist/ReactOverTheWire');

const demos = ['dbmonster', 'drag','masonry','recursion', 'todo'];

var anotherDirToCheck = path.resolve(__dirname, '../dist/');
console.log(anotherDirToCheck);

require('babel-core/register')({
    presets: ['es2015', 'react', 'stage-2'],
    resolveModuleSource: require('babel-resolver')(__dirname, anotherDirToCheck)
});

const demoApps = demos.reduce((acc, demo) => {
    acc[demo] = require(`./${demo}/app.jsx`);
    return acc;
}, {});

var server = http.createServer(function(request, response) {});
server.listen(1234, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(r){
    console.log(r.requestedProtocols);
    const chosenApp = demoApps[r.requestedProtocols[0]] || demoApps.todo;
    const connection = r.accept(r.requestedProtocols[0], r.origin);
    connection.app = ReactOverTheWire.render(ReactOverTheWire.createElement(chosenApp, {}), {
        postMessage: (e) => {
            connection.send(JSON.stringify(e));
        },
        addEventListener: (handler) => {
            connection.on('message', (e) => {
                handler(JSON.parse(e.utf8Data));
            });
        }
    });
});

