import ReactMultiChild from 'react/lib/ReactMultiChild';

import WorkerDomNodeStub from './WorkerDomNodeStub';
import ReactWWIDOperations from './ReactWWIDOperations';

/**
 * Function to separate event Handlers and regular props
 * @param  {Object} props Props passed to a React Component
 * @return {eventHandlers: {}, options: {}}       An object containing eventHandlers and options
 */
function extractEventHandlers(props) {
    let result = {
        eventHandlers: {},
        options: {}
    };
    for (let key in props) {
        if (typeof props[key] === 'function') {
            result.eventHandlers[key] = props[key];
        } else {
            result.options[key] = props[key];
        }
    }
    return result;
}

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
        this._currentElement = element;
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
            children, ...restProps
        } = props;

        let {
            eventHandlers, options
        } = extractEventHandlers(restProps);
        const node = new WorkerDomNodeStub(this._rootNodeID, type, options);
        node.addEventHandlers(eventHandlers);
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
                children, ...restProps
            }
        } = nextElement, {
            eventHandlers, options
        } = extractEventHandlers(restProps);

        let node = ReactWWIDOperations.get(this._rootNodeID);
        for (var key in options) {
            node.setAttribute(key, options[key])
        }
        node.addEventHandlers(eventHandlers);
        this.updateChildren(children, transaction, context);
        //ReactWWIDOperations.rootNode.render(); <- No real need to update the parent also
        return this;
    }

    /**
     * Dropping the component.
     */
    unmountComponent() {
        this.unmountChildren();

        const node = ReactWWIDOperations.get(this._rootNodeID);
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
Object.assign(
    ReactWWComponent.prototype,
    ReactMultiChild.Mixin
);
