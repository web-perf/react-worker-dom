import ENV from './ENV'

import React from 'react';
import {render} from './../../src/worker/index';

import DBMon from './components/app.jsx';
//import DBMon from './testApp.jsx'

render(<DBMon rows={ENV.rows} timeout={ENV.timeout}/>);

/* This file is added from a Web Worker - look at page-worker.js for the main file in the page */