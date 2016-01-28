/* This file is added from a Web Worker - look at page-worker.js for the main file in the page */

// Helper functions to parse additional params passed to this worker
// Will not be needed unless your app needs to pass params to the web worker
var ENV = parseArgs(self.location.hash.substring(1));
function parseArgs(uri) {
  var q = {};
  uri.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
      q[$1] = $3;
  });
  return {
      timeout: parseInt('0' + q.timeout, 10),
      rows: parseInt('0' + q.rows, 10),
  }
}

// -------------------------------------------------------------
// Start of actual code that an application will need

import React from 'react';
import ReactWorkerDOM from 'react-worker-dom-worker';

import App from './components/app.jsx';

ReactWorkerDOM.render(<App rows={ENV.rows} timeout={ENV.timeout}/>);


