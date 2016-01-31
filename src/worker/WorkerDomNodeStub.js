import Bridge from './WorkerBridge';
import {CONSTRUCTOR, ADD_CHILD, REMOVE_CHILD, SET_CONTENT, REMOVE_EVENT_HANDLERS, SET_ATTRIBUTES, ADD_EVENT_HANDLERS, RENDER} from './../common/constants';

var guid = 0;

export default class WorkerDomNodeStub {
    constructor(reactId, el, options) {
        this.el = el;
        this.options = options;
        this.eventHandlers = {};
        this.reactId = reactId;
        this.guid = guid++;
        this.impl(CONSTRUCTOR, [this.el, this.options]);
    }
    addChild(node) {
        this.impl(ADD_CHILD, [node.guid]);
    }
    removeChild(node){
        this.impl(REMOVE_CHILD, [node.guid]);
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
    removeEventHandlers(handlers){
        this.impl(REMOVE_EVENT_HANDLERS);
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
            reactId: this.reactId,
            guid: this.guid
        });
    }
}
