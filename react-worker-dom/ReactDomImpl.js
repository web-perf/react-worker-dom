window.ReactWorkerDom = {
    init: function(worker, container) {
        var factory = new NodeFactory();
        worker.onmessage = function(e) {
            var node = factory.get(e.data.id);
            switch (e.data.method) {
                case 'constructor':
                    factory.create.apply(factory, e.data.args.concat(e.data.id));
                    break;
                case 'render':
                    var rootNode = factory.get(e.data.id);
                    container.appendChild(rootNode.ref);
                    break;
                case 'append':
                    var node2 = factory.get(e.data.args[0].id);
                    node.append(node2);
                    break;
                default:
                    if (typeof node[e.data.method] === 'function') {
                        node[e.data.method].apply(node, e.data.args);
                    } else {
                        console.log('Cannot run %s on Node with id %s', e.data.method, e.data.id);
                    }
            }
        };
    }
};

class NodeFactory {
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
