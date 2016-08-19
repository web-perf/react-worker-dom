import createDOMElement from './DomElement';
import Fragment from './Fragment';
import TextNode from './TextNode';
import Comment from './Comment';

import EventHandler from './../eventHandler';

class Document {
    constructor() {
        this.nodeType = 9;
        this.nodeName = 'div'
    }
    createElement(tag) {
        return createDOMElement(tag);
    }
    createComment(comment) {
        return new Comment(comment);
    }
    createDocumentFragment() {
        return new Fragment();
    }
    createTextNode(val) {
        return new TextNode(val);
    }

    addEventListener(eventType, callback, useCapture){
        EventHandler.add('document', eventType, callback, useCapture);
    }
}

self.document = new Document();
export default document;
