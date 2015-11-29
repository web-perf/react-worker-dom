import WorkerDomNodeImpl from './WorkerDomNodeImpl';

var nodeList = {};

window.ReactWorkerDom = {
    init: function(worker, container, i) {
        worker.onmessage = function(e) {
            e.data.forEach(function(data) {
                switch (data.method) {
                    case 'constructor':
                        nodeList[data.id] = new WorkerDomNodeImpl(data.id, ...data.args);
                        break;
                    case 'render': // Should only be called once per worker
                        container.appendChild(nodeList[data.id].ref);
                        break;
                    case 'appendChild':
                        var node = nodeList[data.id];
                        node.appendChild(nodeList[data.args[0]]);
                        break;
                    default:
                        var node = nodeList[data.id];
                        if (typeof node[data.method] === 'function') {
                            node[data.method](...data.args);
                        } else {
                            console.log('Cannot run %s on Node with id %s', data.method, data.id);
                        }
                }
            });
        };
    }
};
