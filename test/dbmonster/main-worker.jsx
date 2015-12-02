import React from 'react';
import {render} from './../../src/worker/index';

import DBMon from './components/app.jsx';
//import DBMon from './testApp.jsx'

function onMessage(e){
	if (typeof e.data.rows !== 'undefined'){
		self.removeEventListener('message', onMessage);
		var ENV = e.data;
		render(<DBMon rows={ENV.rows} timeout={ENV.timeout}/>);
	}
}

self.addEventListener('message', onMessage);

/* This file is added from a Web Worker - look at page-worker.js for the main file in the page */