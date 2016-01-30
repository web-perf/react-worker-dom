import ReactBrowserEventEmitter from 'react/lib/ReactBrowserEventEmitter';
import EventConstants from 'react/lib/EventConstants';

export default class WorkerDomNodeImpl {
    constructor(guid, reactId, el, options) {
        this.el = el;
        this.guid = guid;
        this.options = options;
        this.reactId = reactId;
        if (el === '#text') {
            this.ref = document.createTextNode(options.value);
            this.type = 'TEXT_NODE';
        } else {
            this.ref = document.createElement(el);
            this.ref.setAttribute('data-reactid', this.reactId);
            this.ref.setAttribute('data-reactWWid', this.guid);
            this.setAttributes(this.options);
        }
    }
    addChild(node, afterNode) {
        this.ref.appendChild(node.ref);
    }
    removeChild(node) {
        this.ref.removeChild(node.ref);
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
            } else if (key === 'style') {
                for (var prop in value) {
                    this.ref.style[prop] = value[prop];
                }
            } else {
                this.ref.setAttribute(key, value);
            }
        }
    }
    addEventHandlers(container, onEvent, ...handlers) {
        handlers.forEach((handler) => {
            switch (this.el) {
                case 'form':
                    this._listeners = [
                        ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', this.ref),
                        ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', this.ref)
                    ];
                    // TODO - Add more cases of events that do not bubble
                    // Look at trapBubbledEventsLocal in REactDomComponent in react-dom
            }
            ReactBrowserEventEmitter.listenTo(handler, container);
            ReactBrowserEventEmitter.putListener(this.reactId, handler, (syntheticEvent, reactId, e) => {
                onEvent(handler, syntheticEvent, reactId, e);
            });
        });
    }

    removeEventHandlers() {
        ReactBrowserEventEmitter.deleteAllListeners(this.reactId);
    }
}
