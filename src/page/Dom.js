import {OPS as _, WORKER_MESSAGES} from './../common/constants';
import Channel from './../common/channel';
import {DOCUMENT_NODE} from './../common/nodeType';

import TouchList from '../common/api/TouchList';

var body, channel, container, head, nodes = {}, eventHandlers = {};

export default (ctr, messageChannel) => {
    body = document.body;
    channel = messageChannel;
    container = ctr;
    head = document.head;
    return ({operation, guid, args, guidPos = []}) => {
        guidPos.forEach(pos => args[pos] = nodes[args[pos]]);
        DomOperations[operation](guid, ...args);
    }
}

export function eventHandlerCalled({ guid, defaultPrevented, propagationStoped }) {
    const [event, resolve] = eventHandlers[guid];
    if (defaultPrevented) {
        event.preventDefault();
    }
    if (propagationStoped) {
        event.stopPropagation();
    }
    resolve();
    Reflect.deleteProperty(eventHandlers, guid);
}

const DomOperations = {
    [_.attachRoot](none, id, node) {
        nodes[id] = container;
    },
    [_.attachHead](none, id, node) {
        nodes[id] = head;
    },
    [_.attachBody](none, id, node) {
        nodes[id] = body;
    },
    /// Creating new nodes
    [_.createDOMElement](id, type) {
        nodes[id] = document.createElement(type);
        nodes[id]['__reactNode'] = id;
    },
    [_.createComment](id, val) {
        nodes[id] = document.createComment(val);
        nodes[id]['__reactNode'] = id;
    },
    [_.createFragment](id) {
        nodes[id] = document.createDocumentFragment();
        nodes[id]['__reactNode'] = id;
    },
    [_.createTextNode](id, val) {
        nodes[id] = document.createTextNode(val);
        nodes[id]['__reactNode'] = id;
    },

    /// Operations on Nodes
    [_.setAttribute](id, key, val) {
        setAttribute(nodes[id], key, val);
    },
    [_.setTextContent](id, val) {
        nodes[id].textContent = val;
    },
    [_.setStyle](id, key, val) {
        nodes[id].style[key] = val;
    },
    [_.innerHTML](id, val) {
        nodes[id].innerHTML = val;
    },

    // DOM Tree manipulation ops
    [_.appendChild](id, node) {
        nodes[id].appendChild(node);
    },
    [_.removeChild](id, node) {
        nodes[id].removeChild(node);
    },
    [_.insertBefore](id, newNode, refNode) {
        nodes[id].insertBefore(newNode, refNode);
    },
    [_.replaceChild](id, newNode, node) {
        nodes[id].replaceChild(newNode, node);
    },

    // Remove node
    [_.removeAttribute](id, key) {
      nodes[id].removeAttribute(key);
    },

    // Events
    [_.addEventHandler](id, type, handler, useCapture) {
        var node = typeof id === 'string' ? window[id] : nodes[id];
        node.addEventListener(type, asyncify((e) => {
            let resolver = null;
            const promise = new Promise(resolve => resolver = resolve);
            channel.send(WORKER_MESSAGES.event, { handler, event: Channel.serializeEvent(e) });
            console.log(e.type);
            eventHandlers[Channel.lastSerializedEventGuid()] = [e, resolver];
            return promise;
        }), useCapture);
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
            node.checked = !!value;
            break;
        case 'className':
            node.className = value;
        default:
            node.setAttribute(key, value);

    }
}

// https://jsbin.com/yiwufaz/edit?js,output

const exceptions = [
    'keydown',
    'mousedown',
    'mouseup',
    'mousemove',
    'click'
];

function asyncify(cb) {
    return (event) => {
        if (!event.__CLONED__) {
            if (!exceptions.includes(event.type)) {
                event.preventDefault();
            }
            event.stopPropagation();
            const clonedEvent = cloneEvent(event);
            cb(clonedEvent).then(() => {
                const { type, target, defaultPrevented } = clonedEvent;
                target.dispatchEvent(clonedEvent);
                if (type == 'submit' && !defaultPrevented) {
                    target.submit();
                }
            });
        }
    };
}

function cloneEvent(event) {
    const clonedEvent = new event.constructor(event.type, event);
    Object.defineProperties(clonedEvent, {
        __CLONED__: {
            value: true,
            enumerable: true
        },
        target: {
            value: event.target,
            enumerable: true
        },
        currentTarget: {
            value: event.currentTarget,
            enumerable: true
        }
    });
    return clonedEvent;
}
