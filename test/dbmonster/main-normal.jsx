import React from 'react';
import {render} from 'react-dom';

import App from './components/app.jsx';
//import App from './components/testApp.jsx';

for (var i = 0; i < ENV.count; i++) {
	render(<App rows={ENV.rows} timeout={ENV.timeout}/>, document.getElementById('topLevelContainer-' + i));
}