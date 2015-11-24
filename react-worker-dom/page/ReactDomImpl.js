class Node {
    constructor(el, options, id) {
        this.el = el;
        this.options = options;
        this.id = id;
        this.ref = document.createElement(el);
        this.ref.setAttribute('data-id', id);
        for (var key in options) {
            if (key === 'className') {
                key = 'class';
                options['class'] = options['className'];
            }
            this.ref.setAttribute(key, options[key]);
        }
    }
    append(node) {
        this.ref.appendChild(node.ref);
    }
    setContent(content) {
        this.ref.innerHTML = content;
    }
    on(event) {}
}

class ReactDomImpl {
    constructor() {
        this.nodeList = {};
    }
    create(el, options, id) {
        var node = new Node(el, options, id);
        this.nodeList[id] = node;
        return node;
    }
    get(id) {
        return this.nodeList[id];
    }
}

export default new ReactDomImpl();
