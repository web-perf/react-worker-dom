import ReactWWIDOperations from './ReactWWIDOperations';
import Node from './WorkerDomNodeStub';

export default class ReactWWTextComponent {
    constructor(props) {}

    construct(text) {
        this._currentElement = text;
        this._rootNodeID = null;
    }

    mountComponent(rootID, transaction, context) {
        this._rootNodeID = rootID;
        const parent = ReactWWIDOperations.getParent(this._rootNodeID);
        const node = new Node(this._rootNodeID, '#text', {
            value: this._currentElement
        });
        parent.appendChild(node);
        ReactWWIDOperations.add(this._rootNodeID, node);
        return node;
    }

    receiveComponent(nextText, transaction) {
        if (this._currentElement !== nextText) {
            this._currentElement = nextText;
            const node = ReactWWIDOperations.get(this._rootNodeID);
            node.setContent(this._currentElement);
        }
        return this;
    }

    unmountComponent() {
        // Nothing really to do, since this just sets the content
    }

    getPublicInstance() {
        return this._currentElement;
    }
}
