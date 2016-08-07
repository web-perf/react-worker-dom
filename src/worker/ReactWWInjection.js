/**
 * Injecting the renderer's needed dependencies into React's internals.
 */
import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';
import ReactDOMFeatureFlags from 'react/lib/ReactDOMFeatureFlags';
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy';
import DefaultEventPluginOrder from 'react/lib/DefaultEventPluginOrder';

import ReactMount from 'react/lib/ReactMount';
import SelectEventPlugin from 'react/lib/SelectEventPlugin';
import SimpleEventPlugin from 'react/lib/SimpleEventPlugin';
import ChangeEventPlugin from 'react/lib/ChangeEventPlugin';

import ReactWWReconcileTransaction from './ReactWWReconcileTransaction';
import ReactWWComponent from './ReactWWComponent';
import ReactWWTextComponent from './ReactWWTextComponent';


import {
    processChildrenUpdates, replaceNodeWithMarkupByID
}
from './ReactWWChildOperations';

let rootIndex = 1;

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

    ReactInjection.RootIndex.injectCreateReactRootIndex(function() {
        return '' + rootIndex++;
    });

    ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);

    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginHub.injectMount(ReactMount);

    /**
     * Some important event plugins included by default (without having to require
     * them).
     */
    ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: SimpleEventPlugin,
        ChangeEventPlugin: ChangeEventPlugin,
        SelectEventPlugin: SelectEventPlugin
    });


    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    ReactComponentEnvironment.processChildrenUpdates = processChildrenUpdates;
    ReactComponentEnvironment.replaceNodeWithMarkupByID = replaceNodeWithMarkupByID
}
