/**
 * React worker-DOM ID Operations
 * ============================
 *
 * Cache register for nodes stored by ID.
 */
import {debounce} from 'lodash';

/**
 * The nodes internal index;
 */
const nodes = {};

/**
 * Backend for ID operations.
 *
 * @constructor ReactIDOperations
 */
class ReactIDOperations {
  constructor() {
    this.rootNode = null;
  }

  /**
   * Set the root Node.
   *
   * @param  {Node} node     - The root node to attach.
   * @return {ReactBlessedIDOperations} - Returns itself.
   */
  setRoot(rootNode) {
    this.rootNode = rootNode;

    // Creating a debounced version of the render method so we won't render
    // multiple time per frame, in vain.
    //rootNode.debouncedRender = rootNode.render;
    rootNode.debouncedRender = debounce(() => rootNode.render(), 0);

    return this;
  }

  /**
   * Add a new node to the index.
   *
   * @param  {string}      ID           - The node's id.
   * @param  {Node} node         - The node itself.
   * @return {ReactIDOperations} - Returns itself.
   */
  add(ID, node) {
    nodes[ID] = node;
    return this;
  }

  /**
   * Get a node from the index.
   *
   * @param  {string}      ID - The node's id.
   * @return {Node}    - The node.
   */
  get(ID) {
    return nodes[ID];
  }

  /**
   * Get the parent of a node from the index.
   *
   * @param  {string}                    ID - The node's id.
   * @return {Node}    - The node.
   */
  getParent(ID) {

    // If the node is root, we return the rootNode itself
    if (ID.match(/\./g).length === 1)
      return this.rootNode;

    const parentID = ID.split('.').slice(0, -1).join('.');
    return this.get(parentID);
  }

  /**
   * Drop a node from the index.
   *
   * @param  {string}                   ID - The node's id.
   * @return {ReactIDOperations}    - Returns itself.
   */
  drop(ID) {
    delete nodes[ID];
    return this;
  }
}

export default new ReactIDOperations();
