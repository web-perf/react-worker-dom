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
            for (var key in options) {
                this.setAttribute(key, options[key]);
            }
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
    setAttribute(key, value) {
        if (key === 'className') {
            this.ref.className = value;
        } else {
            this.ref.setAttribute(key, value);
        }
    }
    on(event) {}
}
