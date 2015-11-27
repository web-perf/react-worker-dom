import React from 'react';
import DBMon from './app.jsx'
import Com from './testApp.jsx'

// If this is a regular ReactJS app, just load the react-dom for rendering, else if it is in a worker, use react-worker-dom

onmessage = (e => {
    const reactDom = require(e.data.isWorker ? './../../' : 'react-dom');
    reactDom.render(<DBMon/>, e.data.el);
});
