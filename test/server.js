const http = require('http');
const path = require('path');
const ReactOverTheWire = require('../dist/ReactOverTheWire');

var anotherDirToCheck = path.resolve(__dirname, '../dist/');
console.log(anotherDirToCheck);

require('babel-core/register')({
    presets: ['es2015', 'react', 'stage-2'],
    resolveModuleSource: require('babel-resolver')(__dirname, anotherDirToCheck)
});


const App = require('./todo/components/app.jsx');
//const App = require('./dbmonster/components/app.jsx');
//const App = require('./drag/components/app.jsx');


var server = http.createServer(function(request, response) {});
server.listen(1234, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(r){
    var connection = r.accept('react-server', r.origin);
    connection.app = ReactOverTheWire.render(ReactOverTheWire.createElement(App,{}), {
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

