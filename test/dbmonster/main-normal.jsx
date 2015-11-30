import ENV from './ENV'

import React from 'react';
import reactDOM from 'react-dom';

import DBMon from './components/app.jsx';
//import DBMon from './testApp.jsx'

var content = document.getElementById('content');
for (var i = 0; i < ENV.count; i++) {
	var container = document.createElement('div');
	container.style.width = 100 / ENV.count + '%';
	content.appendChild(container);

	reactDOM.render(<DBMon rows={ENV.rows} timeout={ENV.timeout}/>, container);
}