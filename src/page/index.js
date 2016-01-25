import WorkerDomNodeImpl from './WorkerDomNodeImpl';
import Channel from './../common/channel';
import {RENDER_QUEUE, CONSTRUCTOR, APPEND_CHILD, RENDER, SET_ATTRIBUTES, SET_CONTENT} from './../common/constants';

class ReactWorkerDom {
    constructor(worker, container) {
        this.nodeList = {};
        this.container = container;

        this.channel = new Channel(worker);
        this.channel.onMessage(this.handleMessage.bind(this));
    }

    handleMessage(data) {
        switch (data.type){
            case RENDER_QUEUE:
                data.args.forEach(msg => this.handleRenderQueueMessage(msg));
                break;
            default: 
                console.log('Cannot handle message %s', data.type, data.args);
        }
    }

    handleRenderQueueMessage(data) {
        var nodeList = this.nodeList;
        switch (data.method) {
            case CONSTRUCTOR:
                nodeList[data.id] = new WorkerDomNodeImpl(data.id, ...data.args);
                break;
            case RENDER: // Should only be called once per worker
                this.container.appendChild(nodeList[data.id].ref);
                break;
            case APPEND_CHILD:
                var node = nodeList[data.id];
                node.appendChild(nodeList[data.args[0]]);
                break;
            case SET_ATTRIBUTES:
            case SET_CONTENT:
                nodeList[data.id][data.method](...data.args);
                break;
            default:
                console.log('Cannot run %s on Node with id %s', data.method, data.id);
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
