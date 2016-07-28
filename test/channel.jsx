/**
 * Created by avim on 6/27/16.
 */

import React from 'ReactOverTheWire';
import ReactOverTheWireDOM from 'ReactOverTheWireDOM';
import App from './recursion/components/app.jsx';
import nativeExtensions from './nativeExtensions';

function channelFacade(port, title) {
    return {
        postMessage: function (msg) {
            port.postMessage(JSON.stringify(msg));
        },
        addEventListener: function (handler) {
            port.onmessage = function(e) {
                var msg = JSON.parse(e.data);
                handler(msg);
            };
        },
        title: title
    }
}

function renderLocal(targetId) {
    var channel = new MessageChannel();

    React.render(
        React.createElement(App, {})
    , channelFacade(channel.port2, 'worker-side'));

    ReactOverTheWireDOM.render(
        channelFacade(channel.port1, 'native-side'),

        // registering native extensions
        document.getElementById(targetId),
        nativeExtensions
    );
}

renderLocal('content');
