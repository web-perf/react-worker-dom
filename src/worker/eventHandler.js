import {OPS as _, WORKER_MESSAGES} from './../common/constants';
import Bridge from './bridge';
import Channel from './../common/channel';

import nodeList from './nodeList';

let eventHandlerGuid = 0;

class EventHandler {
    constructor() {
        this.eventHandlers = {};
        Bridge.onEventHandler(this.onEventHandler.bind(this));
    }

    add(node, type, handler, useCapture) {
        this.eventHandlers[eventHandlerGuid] = handler;
        Bridge.send(_.addEventHandler, node._guid, [type, eventHandlerGuid, useCapture]);
        eventHandlerGuid++;
    }

    remove(node, type, handler) {
        // TODO - Implement this
    }

    onEventHandler({handler, event}) {
        if (typeof this.eventHandlers[handler] === 'function') {
            let e = Channel.deserializeEvent(event);
            e.currentTarget = nodeList.get(e.currentTarget);
            e.target = {... nodeList.get(e.target), ...e.targetProps };
            this.eventHandlers[handler](e);
            Bridge.eventHandlerCalled(e);
        } else {
            console.log(handler, event);
        }
    }
}

export default new EventHandler();