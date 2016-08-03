import TreeNode from './TreeNode';
import {OPS as _} from './../../common/constants';
import {TEXT_NODE} from './../../common/nodeType';

export default class TextNode extends TreeNode {
    constructor(val) {
        super();
        this.nodeType = TEXT_NODE;
        this._bridge.send(_.createTextNode, this._guid, [val]);
        this._textContent = val;
    }

    set textContent(val) {
        this._textContent = val;
        this._bridge.send(_.setTextContent, this._guid, [val]);
    }

    get textContent() {
        return this._textContent;
    }
}