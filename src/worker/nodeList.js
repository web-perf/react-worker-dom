class NodeList {
    constructor() {
        this.nodes = {};
    }
    set(guid, node) {
        this.nodes[guid] = node;
    }
    get(guid) {
        return this.nodes[guid];
    }
}

export default new NodeList();