import Element from './DomElement';
import Fragment from './Fragment';
import TextNode from './TextNode';
import Comment from './Comment';

class Document {
    constructor() {
        this.nodeType = 9;
        this.nodeName = 'div'
    }
    createElement(tag) {
        return new Element(tag);
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
        console.log('Document event listener', arguments);
    }
}

self.document = new Document()
export default document;

var handler = {
    get: function (target, name) {
        if (!name in target) {
            console.log(target, name);
        }
        return target[name];
    }
}