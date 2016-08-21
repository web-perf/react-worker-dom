import guid from './../../common/guid';
import {OPS as _} from './../../common/constants';
import Bridge from './../bridge';
import nodeList from './../nodeList';
import {DOCUMENT_FRAGMENT_NODE} from './../../common/nodeType';

export default class TreeNode {
    constructor() {
        this.parentNode = null;
        this._guid = guid();
        this.children = [];
        this._bridge = Bridge;
        nodeList.set(this._guid, this);
    }

    appendChild(node) {
        this.insertBefore(node, null);
    }

    insertBefore(node, ref) {
        let insertIndex = this.children.indexOf(ref);
        let nodesToInsert = [node];

        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
            nodesToInsert = node.children;
            node.children = [];
        }

        this.children.splice(insertIndex < 0 ? this.children.length : insertIndex - 1, 0, ...nodesToInsert);
        nodesToInsert.forEach(node => { node.parentNode = this; });
        this._bridge.send(_.insertBefore, this._guid, [node, ref]);
    }

    removeChild(node) {
        let childIndex = this.children.indexOf(node);
        if (childIndex > 0) {
            this.children.splice(childIndex, 1);
            this._bridge.send(_.removeChild, this._guid, [node]);
        }
    }

    replaceChild(node, newNode) {
        console.log('Trying ot replace child')
    }

    get firstChild() {
        return this.children[0];
    }

    get lastChild() {
        return this.children[this.children.length - 1];
    }

    get nextSibling() {
        if (!this.parentNode) {
            throw 'No parent node, so cannot have siblings';
        }
        const children = this.parentNode.children;
        return children[children.indexOf(this) + 1];
    }

    set innerHTML(val) {
        console.log("Trying to set Inner HTML")
    }
}