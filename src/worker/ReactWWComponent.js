import ReactMultiChild from 'react/lib/ReactMultiChild';

import WorkerDomNodeStub from './WorkerDomNodeStub';
import ReactWWIDOperations from './ReactWWIDOperations';

import ReactBrowserEventEmitter from 'react/lib/ReactBrowserEventEmitter';


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
        if (ReactBrowserEventEmitter.registrationNameModules.hasOwnProperty(key)) {
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

        const node = this.mountNode(ReactWWIDOperations.getParent(rootID), this._currentElement, transaction);

        ReactWWIDOperations.add(rootID, node);

        // Mounting children
        let childrenToUse = this._currentElement.props.children;
        childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);

        if (childrenToUse.length) {
            this.mountChildren(childrenToUse, transaction, context);
        }

        // Rendering the rootNode
        ReactWWIDOperations.getRoot(rootID).render();
        return this;
    }

    /**
     * Mounting the node itself.
     *
     * @param   {Node}          parent  - The parent node.
     * @param   {ReactElement}  element - The element to mount.
     * @return  {Node}                  - The mounted node.
     */
    mountNode(parent, element, transaction) {
        const {
            props, type
        } = element, {
            children, ...restProps
        } = props;

        let {
            eventHandlers, options
        } = extractEventHandlers(restProps);
        const node = new WorkerDomNodeStub(this._rootNodeID, type, options, parent.bridge);
        parent.addChild(node);

        transaction.getReactMountReady().enqueue(function(){
            this.node.addEventHandlers(this.eventHandlers);
        }, {
            node, eventHandlers
        });

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

        node.setAttributes(options);
        //node.addEventHandlers(eventHandlers);

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
        node.removeEventHandlers();

        // Unmounting should not remove Child
        // THey will be removed when they are replaced in markup
        // Or when REMOVE_NODE in Child openrations is called
        //var parent = ReactWWIDOperations.getParent(node.reactId);
        //parent.removeChild(node);

        const root = ReactWWIDOperations.getRoot(this._rootNodeID);


        ReactWWIDOperations.drop(this._rootNodeID);

        this._rootNodeID = null;

        root.render();
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
