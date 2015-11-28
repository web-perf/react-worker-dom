var queue = [];

function send(args) {
    queue.push(args);
    //if (queue.length > 1000) {
        postMessage(queue);
        queue = [];
    //}
}

class WorkerDomNodeStub {
    constructor(id, el, options) {
        this.el = el;
        this.options = options;
        this.id = id;
        this.postMessage('constructor', [this.el, this.options]);
    }
    appendChild(node) {
        this.postMessage('appendChild', [node]);
    }
    setContent(content) {
        this.postMessage('setContent', [content]);
    }
    setAttributes(options) {
        this.postMessage('setAttributes', [options]);
    }
    addEventHandlers(handlers){
        // TODO - Send message to add event handlers
    }
    render() {
        this.postMessage('render');
    }


    on(e) {}
    off(e) {}
    postMessage(method, args = []) {
        send({
            method,
            args,
            id: this.id
        });
    }
}

export default WorkerDomNodeStub;
