import WorkerDomNodeImpl from './WorkerDomNodeImpl';

var nodeList = {};

window.ReactWorkerDom = {
    init: function(worker, container) {
        worker.onmessage = function(e) {
            e.data.forEach(function(data) {
                switch (data.method) {
                    case 'constructor':
                        nodeList[data.id] = new WorkerDomNodeImpl(data.args[0], data.args[1], data.id);;
                        break;
                    case 'render':
                        container.appendChild(nodeList[data.id].ref);
                        break;
                    case 'append':
                        var node = nodeList[data.id],
                            childNode = nodeList[data.args[0].id];
                        node.append(childNode);
                        break;
                    default:
                        var node = nodeList[data.id];
                        if (typeof node[data.method] === 'function') {
                            node[data.method].apply(node, data.args);
                        } else {
                            console.log('Cannot run %s on Node with id %s', data.method, data.id);
                        }
                }
            });
        };
    }
};
