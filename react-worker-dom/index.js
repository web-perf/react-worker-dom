import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactElement from 'react/lib/ReactElement';
import ReactUpdates from 'react/lib/ReactUpdates';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import invariant from 'invariant';

import ReactDomStub from './ReactDomStub';
import inject from './ReactInjection';
import ReactIDOperations from './ReactIDOperations';

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
function render(element) {
    // Is the given element valid?
    invariant(
        ReactElement.isValidElement(element),
        'render(): You must pass a valid ReactElement.'
    );

    // Creating a root id & creating the screen
    const id = ReactInstanceHandles.createReactRootID();

    // Mounting the app
    const component = instantiateReactComponent(element);

    // Injecting the rootNode
    ReactIDOperations.setRoot(ReactDomStub.createElement('div'));

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.
    ReactUpdates.batchedUpdates(() => {
        // Batched mount component
        const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
        transaction.perform(() => {
            component.mountComponent(id, transaction, {});
        });
        ReactUpdates.ReactReconcileTransaction.release(transaction);
    });

    // Returning the screen so the user can attach listeners etc.
    return component._instance;
}

export {
    render
};
