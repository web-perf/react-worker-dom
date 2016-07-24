import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactElement from 'react/lib/ReactElement';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactIsomorphic from 'react/lib/ReactIsomorphic'
import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import invariant from 'invariant';

import inject from './ReactWWInjection';
import ReactWWIDOperations from './ReactWWIDOperations';
import WorkerDomNodeStub from './WorkerDomNodeStub';
import WorkerBridge from './WorkerBridge';

/**
 * Injecting dependencies.
 */
inject();

/**
 * Renders the given react element using a web worker.
 *
 * @param  {ReactElement}   element   - Node to update.
 * @return {ReactComponent}           - The rendered component instance.
 */
function render(element, channel) {
    // Is the given element valid?
    invariant(
        ReactElement.isValidElement(element),
        'render(): You must pass a valid ReactElement.'
    );

    const id = ReactInstanceHandles.createReactRootID(); // Creating a root id & creating the screen
    const component = instantiateReactComponent(element); // Mounting the app
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    const bridge = new WorkerBridge(channel);

    ReactWWIDOperations.setRoot(new WorkerDomNodeStub('0', 'div', {}, bridge));

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.
    ReactUpdates.batchedUpdates(() => {
        transaction.perform(() => {
            component.mountComponent(id, transaction, {});
        });
        ReactUpdates.ReactReconcileTransaction.release(transaction);
    });

    return component._instance;
}

var ReactOverTheWire = Object.assign({}, ReactIsomorphic);
ReactOverTheWire.render = render;


module.exports = ReactOverTheWire;
