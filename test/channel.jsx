/**
 * Created by avim on 6/27/16.
 */

import React from 'ReactOverTheWire';
import {render} from 'ReactOverTheWireDOM';
import App from './masonry/components/app.jsx';

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
        {
            masonry: (el, cols)=> {
                let colsHeights = Array(cols).fill(0);
                const children = Array.from(el.children);
                const columnWidth = el.offsetWidth / cols;
                const childrenHeights = children.map((child) => child.offsetHeight);

                children.forEach((child, index) => {
                    if (childrenHeights[index] === 0) {
                        return;
                    }
                    const currentMinHeight = Math.min.apply(null, colsHeights);
                    const nextColumn = colsHeights.findIndex((h) => h === currentMinHeight);
                    child.style.top = currentMinHeight + 'px';
                    child.style.left = (nextColumn * columnWidth) + 'px';
                    colsHeights[nextColumn] += childrenHeights[index] + 20;
                });
                el.style.height = (Math.max.apply(null, colsHeights) + 20) + 'px';
            }
        });
}

renderLocal('content');
