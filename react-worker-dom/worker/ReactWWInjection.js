/**
 * Injecting the renderer's needed dependencies into React's internals.
 */
import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';

import ReactWWReconcileTransaction from './ReactWWReconcileTransaction';
import ReactWWComponent from './ReactWWComponent';
import ReactWWTextComponent from './ReactWWTextComponent';

import {
    processChildrenUpdates, replaceNodeWithMarkupByID
}
from './ReactWWChildOperations';

export default function inject() {

    ReactInjection.NativeComponent.injectGenericComponentClass(
        ReactWWComponent
    );

    ReactInjection.Updates.injectReconcileTransaction(
        ReactWWReconcileTransaction
    );

    ReactInjection.NativeComponent.injectTextComponentClass(
        ReactWWTextComponent
    );

    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    ReactComponentEnvironment.processChildrenUpdates = processChildrenUpdates;
    ReactComponentEnvironment.replaceNodeWithMarkupByID = replaceNodeWithMarkupByID;
}
