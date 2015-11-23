import ReactDomStub from './ReactDomStub';
import ReactMultiChild from 'react/lib/ReactMultiChild';
import ReactIDOperations from './ReactIDOperations';
import invariant from 'invariant';
import update from './update';
import solveClass from './solveClass';
import {
    extend, groupBy, startCase
}
from 'lodash';

/**
 * Variable types that must be solved as content rather than real children.
 */
const CONTENT_TYPES = {
    string: true,
    number: true
};

/**
 * Renders the given react element with webworkers.
 *
 * @constructor ReactComponent
 * @extends ReactMultiChild
 */
export default class ReactComponent {
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

        const node = this.mountNode(
            ReactIDOperations.getParent(rootID),
            this._currentElement
        );

        ReactIDOperations.add(rootID, node);

        // Mounting children
        let childrenToUse = this._currentElement.props.children;
        childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);

        if (childrenToUse.length) {

            // Discriminating content components from real children
            const {
                content = null, realChildren = []
            } = groupBy(childrenToUse, (c) => {
                return CONTENT_TYPES[typeof c] ? 'content' : 'realChildren';
            });

            // Setting textual content
            if (content)
                node.setContent('' + content.join(''));

            // Mounting real children
            this.mountChildren(
                realChildren,
                transaction,
                context
            );
        }

        // Rendering the rootNode
        ReactIDOperations.rootNode.debouncedRender();
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

        const node = ReactDomStub.createElement(type, (solveClass(options)));

        node.on('event', this._eventListener);
        parent.append(node);

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
        node = ReactIDOperations.get(this._rootNodeID);

        update(node, solveClass(options));

        // Updating children
        const childrenToUse = children === null ? [] : [].concat(children);

        // Discriminating content components from real children
        const {
            content = null, realChildren = []
        } = groupBy(childrenToUse, (c) => {
            return CONTENT_TYPES[typeof c] ? 'content' : 'realChildren';
        });

        // Setting textual content
        if (content)
            node.setContent('' + content.join(''));

        this.updateChildren(realChildren, transaction, context);

        ReactIDOperations.rootNode.debouncedRender();
    }

    /**
     * Dropping the component.
     */
    unmountComponent() {
        this.unmountChildren();

        const node = ReactIDOperations.get(this._rootNodeID);

        node.off('event', this._eventListener);
        node.destroy();

        ReactIDOperations.drop(this._rootNodeID);

        this._rootNodeID = null;

        ReactIDOperations.rootNode.debouncedRender();
    }

    /**
     * Getting a public instance of the component for refs.
     *
     * @return {Node} - The instance's node.
     */
    getPublicInstance() {
        return ReactIDOperations.get(this._rootNodeID);
    }
}

/**
 * Extending the component with the MultiChild mixin.
 */
extend(
    ReactComponent.prototype,
    ReactMultiChild.Mixin
);
