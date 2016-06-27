import WorkerDomNodeStub from './WorkerDomNodeStub';

const nodes = {};
const roots = {};
/**
 * Backend for ID operations.
 */
class ReactWWIDOperations {
    setRoot(root) {
        this.rootNode = root;
    }

    add(ID, node) {
        nodes[ID] = node;
        return this;
    }
    get(ID) {
        return nodes[ID];
    }
    drop(ID) {
        delete nodes[ID];
        return this;
    }

    getRoot(ID) {
        while (ID.match(/\./g).length > 1) {
            ID = ID.split('.').slice(0, -1).join('.');
        }
        return this.getParent(ID);
    }

    getParent(ID) {
        // If the node is root, we return the rootNode itself
        if (ID.match(/\./g).length <= 1) {
            if (this.rootNode) {
                roots[ID] = this.rootNode;
                nodes[ID] = this.rootNode;
                this.rootNode = null;
            }
            return roots[ID]
        }

        const parentID = ID.split('.').slice(0, -1).join('.');
        return this.get(parentID);
    }
}

export default new ReactWWIDOperations();
