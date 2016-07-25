/**
 * Created by avim on 6/27/16.
 */

import React from 'ReactOverTheWire';
import {render} from 'ReactOverTheWireDOM';
import App from './masonry/components/app.jsx';
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
    , channelFacade(channel.port2, 'port2'));
    render(
        channelFacade(channel.port1, 'port1'), 
        document.getElementById(targetId),
        nativeExtensions
        );
}

renderLocal('content');
