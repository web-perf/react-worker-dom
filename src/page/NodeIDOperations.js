function invariant(condition, msg, ...args) {
    if (!condition){
        console.error(msg, ...args);
    } 
}

class NodeList {
    constructor(tag = '') {
        this.tag = tag;
        this.nodeList = {};
    }
    exists(id) {
        return typeof this.nodeList[id] !== 'undefined';
    }
    add(node) {
        invariant(!this.exists(node.guid), 'Node already exists', node.guid, node, this.nodeList[node.guid]);
        this.nodeList[node.guid] = node;
    }
    get(id) {
        invariant(this.exists(id), 'Id does not exist to get', id);
        return this.nodeList[id];
    }
    getByReactId(reactId) {
        for (let id in this.nodeList) {
            if (this.nodeList[id].reactId === reactId) {
                return this.nodeList[id];
            }
        }
    }
    remove(id) {
        invariant(this.exists(id), 'Id does not exist to remove', id);
        delete this.nodeList[id];
    }
}

export default new NodeList();
