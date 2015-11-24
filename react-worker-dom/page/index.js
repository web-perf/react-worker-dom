import ReactDom from './ReactDomImpl';

window.ReactWorkerDom = {
    init: function(worker, container) {
        worker.onmessage = function(e) {
            var node = ReactDom.get(e.data.id);
            switch (e.data.method) {
                case 'constructor':
                    ReactDom.create.apply(ReactDom, e.data.args.concat(e.data.id));
                    break;
                case 'render':
                    var rootNode = ReactDom.get(e.data.id);
                    container.appendChild(rootNode.ref);
                    break;
                case 'append':
                    var node2 = ReactDom.get(e.data.args[0].id);
                    node.append(node2);
                    break;
                default:
                    if (typeof node[e.data.method] === 'function') {
                        node[e.data.method].apply(node, e.data.args);
                    } else {
                        console.log('Cannot run %s on Node with id %s', e.data.method, e.data.id);
                    }
            }
        };
    }
};
