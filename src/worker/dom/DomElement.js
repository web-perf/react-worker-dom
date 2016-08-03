import Document from './Document';
import TreeNode from './TreeNode';
import {OPS as _} from './../../common/constants';
import {ELEMENT_NODE} from './../../common/nodeType'

export default class DomElement extends TreeNode {
    constructor(type) {
        super();
        this.ownerDocument = Document;
        this.nodeType = ELEMENT_NODE;
        this.nodeName = type;
        this.attributes = {};
        this.style = {};
        this._bridge.send(_.createDOMElement, this._guid, [type]);
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
        this._bridge.send(_.setAttribute, this._guid, [key, value]);
    }

    set textContent(val) {
        this._textContent = val;
        this._bridge.send(_.setTextContent, this._guid, [val]);
    }

    get textContent() {
        return this._textContent;
    }

    addEventListener(eventType, callback, useCapture){
        console.log('Node event listener', arguments);
    }
}
