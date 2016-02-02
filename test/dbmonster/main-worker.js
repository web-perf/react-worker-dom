// import React from 'react'; <-- Don't need this. Component is defined in worker-impl.js
import {render} from 'react-worker-dom';

// import DBMon from './components/app.jsx'; <-- Don't need this. Defined in worker-impl.js

for (var i = 0; i < ENV.count; i++) {
	render(new Worker('/react-worker-dom/dist/dbmonster/worker-impl.js#rows=' + ENV.rows + '&timeout=' + ENV.timeout), document.getElementById('topLevelContainer-' + i));
}
