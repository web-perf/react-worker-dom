import WorkerDomNodeImpl from './WorkerDomNodeImpl';
import Channel from './../common/channel';
import { EVENT, RENDER_TIME, ADD_EVENT_HANDLERS, ADD_CHILD_INDEX, REMOVE_CHILD_INDEX, REMOVE_CHILD, REPLACE_AT, REMOVE_EVENT_HANDLERS, RENDER_QUEUE, CONSTRUCTOR, ADD_CHILD, RENDER, SET_ATTRIBUTES, SET_CONTENT } from './../common/constants';
import ReactMount from 'react/lib/ReactMount';

import inject from './inject';
import NodeIDOps from './NodeIDOperations';

class ReactWorkerDom {
    constructor(worker, container) {
        inject();

        this.container = container;

        this.channel = new Channel(worker);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.channel.send(RENDER_TIME, {
            time: 1,
            count: 0
        });
    }

    handleMessage(data) {
        switch (data.type) {
            case RENDER_QUEUE:
                var start = performance.now();
                data.args.forEach(msg => this.handleRenderQueueMessage(msg));
                this.channel.send(RENDER_TIME, {
                    time: performance.now() - start,
                    count: data.args.length
                });
                break;
            default:
                console.log('Cannot handle message %s', data.type, data.args);
        }
    }

    handleRenderQueueMessage(data) {
        var node;
        if (data.method !== CONSTRUCTOR) {
            node = NodeIDOps.get(data.guid);
            //console.log('%s(%s:%s).%s', node.el, node.guid, node.reactId, data.method, ...data.args);
        }
        switch (data.method) {
            case CONSTRUCTOR:
                node = new WorkerDomNodeImpl(data.guid, data.reactId, ...data.args);
                NodeIDOps.add(node);
                break;
            case RENDER: // Should only be called once per worker
                this.container.appendChild(node.ref);
                ReactMount.registerContainer(node.ref);
                break;
            case ADD_CHILD:
                node.addChild(NodeIDOps.get(data.args[0]));
                break;
            case ADD_CHILD_INDEX:
                node.addChildAtIndex(NodeIDOps.get(data.args[0]), data.args[1]);
                break;
            case REMOVE_CHILD:
                node.removeChild(NodeIDOps.get(data.args[0]));
                break;
            case REMOVE_CHILD_INDEX:
                var removedNodeGuid = node.removeChildAtIndex(data.args);
                removedNodeGuid && NodeIDOps.remove(removedNodeGuid);
                break;
            case REPLACE_AT:
                let oldNode = NodeIDOps.getByReactId(data.args[0]);
                node.replace(oldNode);
                NodeIDOps.remove(oldNode.guid);
                break;
            case SET_ATTRIBUTES:
                node.setAttributes(...data.args);
                break;
            case SET_CONTENT:
                node.setContent(...data.args);
                break;
            case ADD_EVENT_HANDLERS:
                node.addEventHandlers(this.container, this.onEvent.bind(this), ...data.args);
                break;
            case REMOVE_EVENT_HANDLERS:
                node.removeEventHandlers();
                break;
            default:
                console.log('Cannot run %s on Node with id %s', data.method, data.id);
        }
    }

    onEvent(handler, syntheticEvent, reactId, e) {
        this.channel.send(EVENT, {
            reactId,
            eventType: handler,
                event: Channel.serializeEvent(syntheticEvent)
        });
        syntheticEvent.preventDefault();
        // FIXME - Prevent default first, but if this event does not prevent default
        // In the thread, raise this event again
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
