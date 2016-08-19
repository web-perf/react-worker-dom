import {OPS as _} from './../common/constants';

var nodes = {};

export default class DomOperation {
    constructor(container) {
        this.dom = new DomOperations(container);
    }
    handleOp({operation, guid, args, guidPos = []}) {
        guidPos.forEach(pos => args[pos] = nodes[args[pos]]);
        this.dom[operation](guid, ...args);
    }
}

class DomOperations {
    constructor(container) {
        this.container = container;
    }
    [_.attachRoot](noId, node) {
        this.container.appendChild(node);
    }
    /// Creating new nodes
    [_.createDOMElement](id, type) {
        nodes[id] = document.createElement(type);
        nodes[id].setAttribute('reactId', id);
    }
    [_.createComment](id, val) {
        nodes[id] = document.createComment(val);
    }
    [_.createFragment](id) {
        nodes[id] = document.createDocumentFragment();
    }
    [_.createTextNode](id, val) {
        nodes[id] = document.createTextNode(val);
    }

    /// Operations on Nodes
    [_.setAttribute](id, key, val) {
        setAttribute(nodes[id], key, val);
    }
    [_.setTextContent](id, val) {
        nodes[id].textContent = val;
    }
    [_.setStyle](id, key, val) {
        nodes[id].style[key] = val;
    }

    // DOM Tree manipulation ops
    [_.appendChild](id, node) {
        nodes[id].appendChild(node);
    }
    [_.removeChild](id, node) {
        nodes[id].removeChild(node);
    }
    [_.insertBefore](id, newNode, refNode) {
        nodes[id].insertBefore(newNode, refNode);
    }
}

function setAttribute(node, key, value) {
    switch (key) {
        case 'style':
            for (var prop in value) {
                node.style[prop] = value[prop];
            }
            break;
        case 'checked':
            if (value) {
                node.checked = true;
            } else {
                node.checked = false;
            }
            break;
        case 'className':
            node.className = value;
        default:
            node.setAttribute(key, value);

    }
}