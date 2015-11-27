import ReactMultiChild from 'react/lib/ReactMultiChild';

import WorkerDomNodeStub from './WorkerDomNodeStub';
import ReactWWIDOperations from './ReactWWIDOperations';
import update from './update';
import solveClass from './solveClass';
import {
    extend, groupBy, startCase
}
from 'lodash';

/**
 * Renders the given react element with webworkers.
 *
 * @constructor ReactWWComponent
 * @extends ReactMultiChild
 */
export default class ReactWWComponent {
    constructor(tag) {
        this._tag = tag.toLowerCase();
        this._renderedChildren = null;
        this._previousStyle = null;
        this._previousStyleCopy = null;
        this._rootNodeID = null;
        this._wrapperState = null;
        this._topLevelWrapper = null;
        this._nodeWithLegacyProperties = null;
    }

    construct(element) {

        // Setting some properties
        this._currentElement = element;
        this._eventListener = (type, ...args) => {
            const handler = this._currentElement.props['on' + startCase(type)];

            if (typeof handler === 'function')
                handler.apply(null, args);
        };
    }

    /**
     * Mounting the root component.
     *
     * @internal
     * @param  {string} rootID - The root ID for this node.
     * @param  {ReactReconcileTransaction} transaction
     * @param  {object} context
     */
    mountComponent(rootID, transaction, context) {
        this._rootNodeID = rootID;

        const node = this.mountNode(ReactWWIDOperations.getParent(rootID), this._currentElement);

        ReactWWIDOperations.add(rootID, node);

        // Mounting children
        let childrenToUse = this._currentElement.props.children;
        childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);

        if (childrenToUse.length) {
            this.mountChildren(childrenToUse, transaction, context);
        }

        // Rendering the rootNode
        ReactWWIDOperations.rootNode.render();
        return this;
    }

    /**
     * Mounting the node itself.
     *
     * @param   {Node}          parent  - The parent node.
     * @param   {ReactElement}  element - The element to mount.
     * @return  {Node}                  - The mounted node.
     */
    mountNode(parent, element) {
        const {
            props, type
        } = element, {
            children, ...options
        } = props;

        const node = new WorkerDomNodeStub(type, solveClass(options), this._rootNodeID);

        node.on('event', this._eventListener);
        parent.appendChild(node);

        return node;
    }

    /**
     * Receive a component update.
     *
     * @param {ReactElement}              nextElement
     * @param {ReactReconcileTransaction} transaction
     * @param {object}                    context
     * @internal
     * @overridable
     */
    receiveComponent(nextElement, transaction, context) {
        const {
            props: {
                children, ...options
            }
        } = nextElement,
        node = ReactWWIDOperations.get(this._rootNodeID);

        var attrs = solveClass(options);
        for (var key in attrs){
            node.setAttribute(key, attrs[key])
        }

        this.updateChildren(children, transaction, context);
        ReactWWIDOperations.rootNode.render();
        return this;
    }

    /**
     * Dropping the component.
     */
    unmountComponent() {
        this.unmountChildren();

        const node = ReactWWIDOperations.get(this._rootNodeID);

        node.off('event', this._eventListener);
        node.destroy();

        ReactWWIDOperations.drop(this._rootNodeID);

        this._rootNodeID = null;

        ReactWWIDOperations.rootNode.render();
    }

    /**
     * Getting a public instance of the component for refs.
     *
     * @return {Node} - The instance's node.
     */
    getPublicInstance() {
        return ReactWWIDOperations.get(this._rootNodeID);
    }
}

/**
 * Extending the component with the MultiChild mixin.
 */
extend(
    ReactWWComponent.prototype,
    ReactMultiChild.Mixin
);
