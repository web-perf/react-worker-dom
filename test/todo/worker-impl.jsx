import React from 'react';
import {render} from 'react-worker-dom-worker';

import App from './components/app.jsx';

render(<App/>, {
    postMessage: (e) => {
        //console.log('capture post',e);
        self.postMessage(JSON.stringify(e));
    },
    addEventListener: (handler) => {
        self.addEventListener('message', (e) => {
            //console.log('capture listener', e)
            handler(JSON.parse(e.data));
        });
    }
});
