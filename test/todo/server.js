const React = require('react');
const reactDOM = require('../../dist/ReactWW-worker');
const http = require('http');
require('node-jsx-babel').install();
const App = require('./components/app.jsx');


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
    connection.app = reactDOM.render(React.createElement(App,{}), {
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

