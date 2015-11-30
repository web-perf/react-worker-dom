import WorkerDomNodeImpl from './WorkerDomNodeImpl';

export class ReactWorkerDom {
    constructor(worker, container) {
        this.nodeList = {};
        this.worker = worker;
        this.container = container;
        worker.onmessage = (e => this.handleMessage(e.data));
    }

    handleMessage(data) {
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

window.ReactWorker = ReactWorkerDom;