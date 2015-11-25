/**
 * Injecting the renderer's needed dependencies into React's internals.
 */
import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';

import ReactWWReconcileTransaction from './ReactWWReconcileTransaction';
import ReactWWComponent from './ReactWWComponent';

export default function inject() {

  ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactWWComponent
  );

  ReactInjection.Updates.injectReconcileTransaction(
    ReactWWReconcileTransaction
  );

  ReactInjection.EmptyComponent.injectEmptyComponent('element');

  // NOTE: we're monkeypatching ReactComponentEnvironment because
  // ReactInjection.Component.injectEnvironment() currently throws,
  // as it's already injected by ReactDOM for backward compat in 0.14 betas.
  ReactComponentEnvironment.processChildrenUpdates = function () {};
  ReactComponentEnvironment.replaceNodeWithMarkupByID = function () {};
}
