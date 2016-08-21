import {DOCUMENT_NODE} from './../common/nodeType'
import {OPS as _} from './../common/constants';
import Bridge from './bridge';

import createDOMElement from './dom/DomElement';
import Fragment from './dom/Fragment';
import TextNode from './dom/TextNode';
import Comment from './dom/Comment';

import EventHandler from './eventHandler';

let nodes = {};

const Document = {
    nodeType: DOCUMENT_NODE,
    _guid: 'document',
    nodeName: '#document',
    createElement(tag) {
        let el = createDOMElement(tag);
        el.ownerDocument = document;
        return el;
    },
    createComment(comment) {
        return new Comment(comment);
    },
    createDocumentFragment() {
        return new Fragment();
    },
    createTextNode(val) {
        return new TextNode(val);
    },
    addEventListener(eventType, callback, useCapture) {
        EventHandler.add(this, eventType, callback, useCapture);
    },
    createEvent() {
        // TODO - Implement this
        console.log('Create event called', arguments);
        return {};
    }
};

const Window = {
    addEventListener(eventType, callback, useCapture) {
        //EventHandler.add(this, eventType, callback, useCapture);
    }
}

self.window = Window;
self.document = Document;
self.topElement = self.document.createElement('div');
self.topElement.__TOP = true;

Bridge.send(_.attachRoot, null, [self.topElement._guid, self.topElement]);

export default self.topElement;
