import TreeNode from './TreeNode';
import {OPS as _} from './../../common/constants';
import {DOCUMENT_FRAGMENT_NODE} from './../../common/nodeType'

export default class Fragment extends TreeNode {
    constructor() {
        super();
        this.nodeType = DOCUMENT_FRAGMENT_NODE;
        this._bridge.send(_.createFragment, this._guid, []);
    }
}