import Bridge from './WorkerBridge';

export default class WorkerDomNodeStub {
    constructor(id, el, options) {
        this.el = el;
        this.options = options;
        this.eventHandlers = {};
        this.id = id;
        this.impl('constructor', [this.el, this.options]);
    }
    appendChild(node) {
        this.impl('appendChild', [node]);
    }
    setContent(content) {
        this.impl('setContent', [content]);
    }
    setAttributes(options) {
        this.impl('setAttributes', [options]);
    }
    addEventHandlers(handlers) {
        for (let key in handlers) {
            this.eventHandlers[key] = handlers[key];
        }
        this.impl('addEventHandlers', Object.keys(handlers));
    }
    on(eventName, e) {
        var fn = this.eventHandlers[eventName];
        if (typeof fn === 'function') {
            fn.call(this, e);
        }
    }
    render() {
        this.impl('render');
    }
    impl(method, args = []) { // Sends a messages to the Implementation
        Bridge.postMessage({
            method,
            args,
            id: this.id
        });
    }
}
