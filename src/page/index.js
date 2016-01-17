import WorkerDomNodeImpl from './WorkerDomNodeImpl';

class ReactWorkerDom {
    constructor(worker, container) {
        this.nodeList = {};
        this.worker = worker;
        this.container = container;
        this.worker.onmessage = (e => this.handleMessage(e.data));
    }

    handleMessage(msg) {
        var data = JSON.parse(msg);
        if (data.type === 'renderQueue') {
            data.args.forEach(msg => this.handleRenderQueueMessage(msg));
        }
    }

    handleRenderQueueMessage(data) {
        var nodeList = this.nodeList;
        switch (data.method) {
            case 'constructor':
                nodeList[data.id] = new WorkerDomNodeImpl(data.id, ...data.args);
                break;
            case 'render': // Should only be called once per worker
                this.container.appendChild(nodeList[data.id].ref);
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

    }
}

// Doing this so that it can be use both as 
// import {render} from 'react-worker-dom'; render();
// import ReactDom from 'react-worker-dom'; ReactDom.render();
module.exports = {
    render: function(worker, container) {
        return new ReactWorkerDom(worker, container);
    }
};
