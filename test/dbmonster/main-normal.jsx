import React from 'react';
import reactDOM from 'react-dom';

import DBMon from './components/app.jsx';

for (var i = 0; i < ENV.count; i++) {
	reactDOM.render(<DBMon rows={ENV.rows} timeout={ENV.timeout}/>, document.getElementById('topLevelContainer-' + i));
}