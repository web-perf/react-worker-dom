export default class WorkerDomNodeImpl {
    constructor(id, el, options) {
        this.el = el;
        this.options = options;
        this.id = id;
        if (el === '#text') {
            this.ref = document.createTextNode(options.value);
            this.type = 'TEXT_NODE';
        } else {
            this.ref = document.createElement(el);
            this.ref.setAttribute('data-reactid', id);
            this.setAttributes(this.options);
        }
    }
    appendChild(node) {
        this.ref.appendChild(node.ref);
    }
    setContent(content) {
        if (this.type === 'TEXT_NODE') {
            this.ref.nodeValue = content;
        } else {
            this.ref.innerHTML = escape(content);
        }
    }
    setAttributes(options) {
        for (let key in options) {
            let value = options[key];
            if (key === 'className') {
                this.ref.className = value;
            } else {
                this.ref.setAttribute(key, value);
            }
        }
    }
    addEventHandlers(...handlers) {
        handlers.forEach((handler) => {
            this.ref.addEventListener(handler.substring(2).toLowerCase(), (e) => {
                this.onEvent(handler, e);
                return false;
            }, false);
        });
    }

    onEvent(eventType, e) {
        // TODO Send event back to worker
        // TODO Convert event to Synthetic Event
    }
}
