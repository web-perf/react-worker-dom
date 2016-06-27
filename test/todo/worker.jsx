
import {render} from 'react-worker-dom';

var worker = new Worker('/react-worker-dom/dist/todo/worker-impl.js')

render({
    postMessage: (e)=> {worker.postMessage(JSON.stringify(e))},
    addEventListener: (handler) => {
        worker.addEventListener('message', (e) => {
            handler(JSON.parse(e.data));
        });
    }
}, document.getElementById('content'));
