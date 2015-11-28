import WorkerDomNodeImpl from './WorkerDomNodeImpl';

var nodeList = {};

window.ReactWorkerDom = {
    init: function(worker, container, i) {
        worker.onmessage = function(e) {
            e.data.forEach(function(data) {
                switch (data.method) {
                    case 'constructor':
                        nodeList[data.id] = new WorkerDomNodeImpl(data.args[0], data.args[1], data.id);;
                        break;
                    case 'render': // Should only be called once per worker
                        container.appendChild(nodeList[data.id].ref);
                        break;
                    case 'appendChild':
                        var node = nodeList[data.id],
                            childNode = nodeList[data.args[0].id];
                        node.appendChild(childNode);
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
