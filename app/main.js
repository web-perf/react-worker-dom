var isWorker = typeof window === 'undefined' || typeof window.document === 'undefined';

import React from 'react';
import DBMon from './app.jsx'

// If this is a regular ReactJS app, just load the react-dom for rendering, else if it is in a worker, use react-worker-dom
var reactDom = require(isWorker ? './../react-worker-dom' : 'react-dom');

onmessage = ((e) => reactDom.render(<DBMon/>, e.data));
