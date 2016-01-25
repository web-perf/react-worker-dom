import Bridge from './WorkerBridge';
import {CONSTRUCTOR, APPEND_CHILD, SET_CONTENT, SET_ATTRIBUTES, ADD_EVENT_HANDLERS, RENDER} from './../common/constants';

export default class WorkerDomNodeStub {
    constructor(id, el, options) {
        this.el = el;
        this.options = options;
        this.eventHandlers = {};
        this.id = id;
        this.impl(CONSTRUCTOR, [this.el, this.options]);
    }
    appendChild(node) {
        this.impl(APPEND_CHILD, [node.id]);
    }
    setContent(content) {
        this.impl(SET_CONTENT, [content]);
    }
    setAttributes(options) {
        this.impl(SET_ATTRIBUTES, [options]);
    }
    addEventHandlers(handlers) {
        let canSend = false;
        for (let key in handlers) {
            canSend = true;
            this.eventHandlers[key] = handlers[key];
        }
        if (canSend) {
            this.impl(ADD_EVENT_HANDLERS, Object.keys(handlers));
        }
    }
    on(eventName, e) {
        var fn = this.eventHandlers[eventName];
        if (typeof fn === 'function') {
            fn.call(this, e);
        }
    }
    render() {
        this.impl(RENDER);
    }
    impl(method, args = []) { // Sends a messages to the Implementation
        Bridge.postMessage({
            method,
            args,
            id: this.id
        });
    }
}
