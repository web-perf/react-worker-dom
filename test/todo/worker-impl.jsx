import WorkerDom from 'reactworker-onWorker';

import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app.jsx';

ReactDom.render(<App/>, WorkerDom);
