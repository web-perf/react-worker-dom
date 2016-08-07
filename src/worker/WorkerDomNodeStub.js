import Bridge from './WorkerBridge';
import {CONSTRUCTOR, ADD_CHILD, ADD_CHILD_INDEX, REMOVE_CHILD, REMOVE_CHILD_INDEX, REPLACE_AT ,SET_CONTENT, REMOVE_EVENT_HANDLERS, SET_ATTRIBUTES, ADD_EVENT_HANDLERS, RENDER, INVOKE} from './../common/constants';

var guid = 0;

export default class WorkerDomNodeStub {
    constructor(reactId, el, options, bridge) {
        this.el = el;
        this.options = options;
        this.bridge = bridge;
        this.eventHandlers = {};
        this.reactId = reactId;
        this.guid = guid++;
        this.impl(CONSTRUCTOR, [this.el, this.options]);
    }
    addChild(node) {
        this.impl(ADD_CHILD, [node.guid]);
    }
    addChildAtIndex(node, index) {
        this.impl(ADD_CHILD_INDEX, [node.guid, index]);
    }
    removeChild(node) {
        this.impl(REMOVE_CHILD, [node.guid]);
    }
    removeChildFromIndex(index){
        this.impl(REMOVE_CHILD_INDEX, index);
    }
    replaceAt(reactId){
        this.impl(REPLACE_AT, [reactId]);
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
    invoke(method, args) {
        this.impl(INVOKE, [method].concat(args));
    }
    impl(method, args = []) { // Sends a messages to the Implementation
        this.bridge.postMessage({
            method,
            args,
            reactId: this.reactId,
            guid: this.guid
        });
    }
}
