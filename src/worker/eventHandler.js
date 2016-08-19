import {OPS as _} from './../common/constants';
import Bridge from './bridge';

let eventHandlerGuid = 0;

class EventHandler {
    constructor() {
        this.eventHandlers = {};
    }

    add(node, type, handler, useCapture) {
        this.eventHandlers[eventHandlerGuid++] = { type, node, handler, useCapture };
        Bridge.send(_.addEventHandler, node._guid || node, [type, eventHandlerGuid, useCapture]);
    }

    remove(node, type, handler) {
        // TODO - Implement this
    }

    onEventHandler(node, type, e) {
        if (Array.isArray(this.eventHandlers[node][type])) {
            this.eventHandlers[node][type].forEach(({handler, useCapture}) => {
                if (typeof handler === 'function') {
                    handler(e);
                }
            });
        }
    }
}

export default new EventHandler();