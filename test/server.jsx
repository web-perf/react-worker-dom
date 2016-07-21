/**
 * Created by avim on 6/27/16.
 */

import {render} from 'react-worker-dom';
function renderServer(targetId) {
    var ws = new WebSocket('ws://localhost:1234', 'react-server');
    ws.addEventListener("open", () => {

        render({
            addEventListener: (handler) => {
                ws.addEventListener("message", (e) => {
                    handler(JSON.parse(e.data));
                });
            },
            postMessage: (data) => {
                ws.send(JSON.stringify(data));
            }
        }, document.getElementById(targetId));

    });

}

renderServer('content');
