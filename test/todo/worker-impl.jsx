import React from 'react';
import {render} from 'react-worker-dom-worker';

import App from './components/app.jsx';

render(<App/>, {
    postMessage: (e) => {
        //console.log('capture post',e);
        self.postMessage(e);

    },
    addEventListener: (evtName, handler) => {
        self.addEventListener(evtName, (e) => {
            //console.log('capture listener', e)
            handler(e);
        });
    }
});
