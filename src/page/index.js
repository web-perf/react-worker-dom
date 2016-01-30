import WorkerDomNodeImpl from './WorkerDomNodeImpl';
import Channel from './../common/channel';
import {EVENT, RENDER_TIME, ADD_EVENT_HANDLERS, REMOVE_CHILD, REMOVE_EVENT_HANDLERS, RENDER_QUEUE, CONSTRUCTOR, ADD_CHILD, RENDER, SET_ATTRIBUTES, SET_CONTENT} from './../common/constants';
import ReactMount from 'react/lib/ReactMount';

import inject from './inject';

class ReactWorkerDom {
    constructor(worker, container) {
        inject();

        this.nodeList = {};
        this.container = container;

        this.channel = new Channel(worker);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.channel.send(RENDER_TIME, {
            time: 1,
            count: 0
        });
    }

    handleMessage(data) {
        switch (data.type){
            case RENDER_QUEUE:
                var start = performance.now();
                data.args.forEach(msg => this.handleRenderQueueMessage(msg));
                this.channel.send(RENDER_TIME,{
                    time: performance.now() - start,
                    count: data.args.length
                });
                break;
            default: 
                console.log('Cannot handle message %s', data.type, data.args);
        }
    }

    handleRenderQueueMessage(data) {
        var nodeList = this.nodeList;
        switch (data.method) {
            case CONSTRUCTOR:
                nodeList[data.guid] = new WorkerDomNodeImpl(data.guid, data.reactId, ...data.args);
                break;
            case RENDER: // Should only be called once per worker
                this.container.appendChild(nodeList[data.guid].ref);
                ReactMount.registerContainer(nodeList[data.guid].ref);
                break;
            case ADD_CHILD:
                var node = nodeList[data.guid];
                node.addChild(nodeList[data.args[0]]);
                break;
            case REMOVE_CHILD:
                var node = nodeList[data.guid];
                node.removeChild(nodeList[data.args[0]]);
                break;
            case SET_ATTRIBUTES:
                nodeList[data.guid].setAttributes(...data.args);
                break;
            case SET_CONTENT:
                nodeList[data.guid].setContent(...data.args);
                break;
            case ADD_EVENT_HANDLERS:
                nodeList[data.guid].addEventHandlers(this.container, this.onEvent.bind(this), ...data.args);
                break;
            case REMOVE_EVENT_HANDLERS:
                nodeList[data.guid].removeEventHandlers();
                break;
            default:
                console.log('Cannot run %s on Node with id %s', data.method, data.id);
        }
    }

    onEvent(handler, syntheticEvent, reactId, e){
        this.channel.send(EVENT, {
            reactId,
            eventType: handler,
            event: Channel.serializeEvent(syntheticEvent)
        })
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
