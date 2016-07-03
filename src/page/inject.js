import ReactInjection from 'react/lib/ReactInjection';
import SimpleEventPlugin from 'react/lib/SimpleEventPlugin';
import EnterLeaveEventPlugin from 'react/lib/EnterLeaveEventPlugin';
import ChangeEventPlugin from 'react/lib/ChangeEventPlugin';
import SelectEventPlugin from 'react/lib/SelectEventPlugin';
import BeforeInputEventPlugin from 'react/lib/BeforeInputEventPlugin';
import DefaultEventPluginOrder from 'react/lib/DefaultEventPluginOrder';
import ReactEventListener from 'react/lib/ReactEventListener';
import ReactReconcileTransaction from 'react/lib/ReactReconcileTransaction';
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactMount from 'react/lib/ReactMount';

var alreadyInjected = false;


export default function inject() {
    if (alreadyInjected) {
        // TODO: This is currently true because these injections are shared between
        // the client and the server package. They should be built independently
        // and not share any injection state. Then this problem will be solved.
        return;
    }
    alreadyInjected = true;

    ReactInjection.EventEmitter.injectReactEventListener(
        ReactEventListener
    );

    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
    ReactInjection.EventPluginHub.injectMount(ReactMount);


    ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: SimpleEventPlugin,
        EnterLeaveEventPlugin: EnterLeaveEventPlugin,
        ChangeEventPlugin: ChangeEventPlugin,
        SelectEventPlugin: SelectEventPlugin,
        BeforeInputEventPlugin: BeforeInputEventPlugin,
    });

    ReactInjection.Updates.injectReconcileTransaction(
        ReactReconcileTransaction
    );
    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    );
}
