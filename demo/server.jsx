/**
 * Created by avim on 6/27/16.
 */

import {render} from 'ReactOverTheWireDOM';
import nativeExtensions from './nativeExtensions';

function renderServer(targetId) {
    var ws = new WebSocket('ws://localhost:1234', window.chosenDemo);
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
        }, document.getElementById(targetId), nativeExtensions);

    });

}

renderServer('content');
