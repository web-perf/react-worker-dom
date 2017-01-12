import TreeNode from './TreeNode';
import Style from './Style';
import ClassList from './ClassList';
import {OPS as _} from './../../common/constants';
import {ELEMENT_NODE} from './../../common/nodeType'

import EventHandler from './../eventHandler';

class DomElement extends TreeNode {
    constructor(type) {
        super();
        this.nodeType = ELEMENT_NODE;
        this.nodeName = type;
        this.attributes = {};
        this._bridge.send(_.createDOMElement, this._guid, [type]);

        this.style = Style((key, val) => this._bridge.send(_.setStyle, this._guid, [key, val]));
        this.classList = new ClassList(this);
        if (type == 'select') {
            this.options = this.children;
        }
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
        this._bridge.send(_.setAttribute, this._guid, [key, value]);
    }

    removeAttribute(key) {
        delete this.attributes[key];
        this._bridge.send(_.removeAttribute, this._guid, [key]);
    }

    addEventListener(eventType, callback, useCapture) {
        EventHandler.add(this, eventType, callback, useCapture);
    }

    removeEventListener(eventType, callback, useCapture) {
        // console.log('// TODO Remove event listener')
    }

    set textContent(val) {
        this._textContent = val;
        this._bridge.send(_.setTextContent, this._guid, [val]);
    }

    get textContent() {
        return this._textContent;
    }

    set className(value) {
        this.setAttribute('className', value);
    }

    get className() {
        return this.attributes['className'];
    }
}

const inputAttributes = ["accept", "align", "alt", "autocomplete ", "autofocus ", "checked", "disabled", "form", "formaction ", "formenctype", "formmethod ", "formnovalidate ", "formtarget ", "height ", "list ", "max ", "maxlength", "min ", "multiple ", "name", "pattern ", "placeholder", "readonly", "required ", "selected", "size", "src", "step", "type", "value", "width"];

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
