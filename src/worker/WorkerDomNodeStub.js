var queue = [];

function send(args) {
    queue.push(args);
    //if (queue.length > 1000) {
    postMessage(queue);
    queue = [];
    //}
}

class WorkerDomNodeStub {
    constructor(el, options, id) {
        this.el = el;
        this.options = options;
        this.id = id;
        this.postMessage('constructor', [this.el, this.options]);
    }
    append(node) {
        this.postMessage('append', [node]);
    }
    setContent(content) {
        this.postMessage('setContent', [content]);
    }
    setAttribute(key, value) {
        this.postMessage('setAttribute', [key, value]);
    }
    render() {
        this.postMessage('render');
    }
    postMessage(method, args = []) {
        send({
            method,
            args,
            id: this.id
        });
    }
    destroy() {}
    on(e) {}
    off(e) {}
}

export default WorkerDomNodeStub;
