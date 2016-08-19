import Document from './Document';
import TreeNode from './TreeNode';
import Style from './Style';
import {OPS as _} from './../../common/constants';
import {ELEMENT_NODE} from './../../common/nodeType'

import EventHandler from './../eventHandler';

class DomElement extends TreeNode {
    constructor(type) {
        super();
        this.ownerDocument = Document;
        this.nodeType = ELEMENT_NODE;
        this.nodeName = type;
        this.attributes = {};
        this._bridge.send(_.createDOMElement, this._guid, [type]);

        this.style = Style((key, val) => this._bridge.send(_.setStyle, this._guid, [key, val]));

        inputAttributes.forEach(prop => {
            Object
        });
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
        this._bridge.send(_.setAttribute, this._guid, [key, value]);
    }

    addEventListener(eventType, callback, useCapture) {
        EventHandler.add(this, eventType, callback, useCapture);
    }

    set textContent(val) {
        this._textContent = val;
        this._bridge.send(_.setTextContent, this._guid, [val]);
    }

    get textContent() {
        return this._textContent;
    }
}

const inputAttributes = ["accept", "align", "alt", "autocomplete ", "autofocus ", "checked", "disabled", "form", "formaction ", "formenctype", "formmethod ", "formnovalidate ", "formtarget ", "height ", "list ", "max ", "maxlength", "min ", "multiple ", "name", "pattern ", "placeholder", "readonly", "required ", "size", "src", "step", "type", "value", "width"];

export default (tag) => {
    let element = new DomElement(tag);
    let props = {};
    inputAttributes.forEach((prop) => (props[prop] = {
        set(val) {
            this.setAttribute(prop, val);
        },
        get() {
            return this.attributes[prop];
        }
    }));
    Object.defineProperties(element, props);
    return element;
}